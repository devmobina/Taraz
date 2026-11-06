from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Sum, Q
from django.utils import timezone
from datetime import datetime
from django.db import models
from .models import Transaction, FinancialGoal, MonthlyBudget, Category


@login_required
def personal_dashboard_view(request):
    user = request.user
    current_date = timezone.now().date()
    current_month = current_date.month
    current_year = current_date.year

    user_transactions = Transaction.objects.filter(user=user)

    # --- محاسبات پایه ---
    total_income = (
        user_transactions.filter(transaction_type="income").aggregate(Sum("amount"))[
            "amount__sum"
        ]
        or 0
    )
    total_expense = (
        user_transactions.filter(transaction_type="expense").aggregate(Sum("amount"))[
            "amount__sum"
        ]
        or 0
    )
    balance = total_income - total_expense

    recent_transactions = user_transactions.order_by("-date", "-created_at")[:5]
    goals = FinancialGoal.objects.filter(user=user, is_completed=False)[:3]

    # --- محاسبات بودجه ماهانه ---
    monthly_budget = MonthlyBudget.objects.filter(
        user=user, month=current_month, year=current_year
    ).first()
    monthly_expense = (
        user_transactions.filter(
            transaction_type="expense",
            date__month=current_month,
            date__year=current_year,
        ).aggregate(Sum("amount"))["amount__sum"]
        or 0
    )

    # --- محاسبات نمودار دایره‌ای ---
    expense_by_category = (
        user_transactions.filter(transaction_type="expense")
        .values("category__name")
        .annotate(total=Sum("amount"))
    )
    expense_labels = [
        item["category__name"] or "بدون دسته" for item in expense_by_category
    ]
    expense_data = [float(item["total"]) for item in expense_by_category]

    # --- محاسبات نمودار خطی (Trend) ---
    months_labels = []
    income_trend_data = []
    expense_trend_data = []

    for i in range(5, -1, -1):
        target_month = current_month - i
        target_year = current_year
        while target_month <= 0:
            target_month += 12
            target_year -= 1

        month_names = [
            "",
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند",
        ]
        months_labels.append(month_names[target_month])

        m_income = (
            user_transactions.filter(
                transaction_type="income",
                date__month=target_month,
                date__year=target_year,
            ).aggregate(Sum("amount"))["amount__sum"]
            or 0
        )
        income_trend_data.append(float(m_income))

        m_expense = (
            user_transactions.filter(
                transaction_type="expense",
                date__month=target_month,
                date__year=target_year,
            ).aggregate(Sum("amount"))["amount__sum"]
            or 0
        )
        expense_trend_data.append(float(m_expense))

    # --- بخش مورد نظر شما: محاسبات برای بینش‌های تراز ---
    registered_income = float(total_income)

    top_expense_category = "---"
    if expense_by_category:
        top_category_obj = max(expense_by_category, key=lambda x: x["total"])
        top_expense_category = top_category_obj["category__name"] or "بدون دسته"

    # محاسبه درآمد ماه جاری برای نرخ پس‌انداز
    current_month_income = float(
        user_transactions.filter(
            transaction_type="income",
            date__month=current_month,
            date__year=current_year,
        ).aggregate(Sum("amount"))["amount__sum"]
        or 0
    )
    current_month_expense = float(monthly_expense)

    saving_rate = 0.0
    if current_month_income > 0:
        saving_rate = (
            (current_month_income - current_month_expense) / current_month_income
        ) * 100

    # ساخت متن ترکیبی برای نمایش در بخش Smart Insights
    insight_text = f"درآمد کل شما {registered_income:,.0f} تومان است. بیشترین هزینه شما مربوط به دسته '{top_expense_category}' بوده و نرخ پس‌انداز ماه جاری شما {saving_rate:.1f}% است."

    context = {
        "balance": balance,
        "total_income": total_income,
        "total_expense": total_expense,
        "recent_transactions": recent_transactions,
        "goals": goals,
        "monthly_budget": monthly_budget,
        "monthly_expense": monthly_expense,
        "current_month": current_month,
        "current_year": current_year,
        "expense_labels": expense_labels,
        "expense_data": expense_data,
        "months_labels": months_labels,
        "income_trend_data": income_trend_data,
        "expense_trend_data": expense_trend_data,
        "registered_income": registered_income,
        "top_expense_category": top_expense_category,
        "saving_rate": round(saving_rate, 1),
        "insight_text": insight_text,  # حتماً این را اضافه کنید
    }

    return render(request, "dashboard_personal.html", context)


@login_required
def personal_transactions_view(request):
    user = request.user

    if request.method == "POST":
        title = request.POST.get("title")
        category_name = request.POST.get("category")
        amount = request.POST.get("amount")
        transaction_type = request.POST.get("type")
        date = request.POST.get("date")

        category, _ = Category.objects.get_or_create(
            name=category_name, user=user, defaults={"type": transaction_type}
        )

        if title and amount and date:
            Transaction.objects.create(
                user=user,
                title=title,
                category=category,
                amount=amount,
                transaction_type=transaction_type,
                date=date,
            )
        return redirect("personal_transactions")

    tx_type = request.GET.get("type", "all")
    search_query = request.GET.get("q", "").strip()

    transactions = Transaction.objects.filter(user=user)

    if tx_type == "income":
        transactions = transactions.filter(transaction_type="income")
    elif tx_type == "expense":
        transactions = transactions.filter(transaction_type="expense")

    if search_query:
        transactions = transactions.filter(
            Q(title__icontains=search_query) | Q(category__name__icontains=search_query)
        )

    transactions = transactions.order_by("-date", "-created_at")
    categories = Category.objects.filter(user=user)

    context = {
        "transactions": transactions,
        "categories": categories,
        "current_type": tx_type,
        "search_query": search_query,
    }
    return render(request, "personal_transactions.html", context)


@login_required
def delete_transaction_view(request, pk):
    transaction = get_object_or_404(Transaction, pk=pk, user=request.user)
    transaction.delete()
    return redirect("personal_transactions")


@login_required
def personal_goals_view(request):
    user = request.user

    if request.method == "POST":
        title = request.POST.get("name")
        target_amount = request.POST.get("target")
        current_amount = request.POST.get("saved", 0)

        if title and target_amount:
            FinancialGoal.objects.create(
                user=user,
                title=title,
                target_amount=float(target_amount),
                current_amount=float(current_amount) if current_amount else 0.0,
                is_completed=False,
            )
        return redirect("personal_goals")

    goals = FinancialGoal.objects.filter(user=user).order_by("-created_at")

    for goal in goals:
        if goal.target_amount > 0:
            percent = (goal.current_amount / goal.target_amount) * 100
            goal.progress_percent = min(round(percent, 1), 100)
        else:
            goal.progress_percent = 0
    context = {"goals": goals}

    return render(request, "personal_goals.html", context)


@login_required(login_url="accounts:login")
def personal_budget_view(request):
    user = request.user
    now = timezone.now()
    current_year = now.year
    current_month = now.month

    total_income = (
        Transaction.objects.filter(
            user=user,
            transaction_type="income",
            date__year=current_year,
            date__month=current_month,
        ).aggregate(Sum("amount"))["amount__sum"]
        or 0
    )

    total_budget = total_income

    expenses = Transaction.objects.filter(
        user=user,
        transaction_type="expense",
        date__year=current_year,
        date__month=current_month,
    )
    spent_total = expenses.aggregate(total=Sum("amount"))["total"] or 0

    remaining_budget = total_budget - spent_total
    if total_budget > 0:
        spent_percent = int((spent_total / total_budget) * 100)
    else:
        spent_percent = 0

    categories_data = []
    expense_categories = Category.objects.filter(type="expense").filter(
        models.Q(user=user) | models.Q(user__isnull=True)
    )
    for cat in expense_categories:
        cat_spent = (
            expenses.filter(category=cat).aggregate(total=Sum("amount"))["total"] or 0
        )
        if cat_spent > 0:
            cat_limit = total_budget / 4 if total_budget > 0 else 1
            cat_percent = int((cat_spent / cat_limit) * 100) if cat_limit > 0 else 0

            categories_data.append(
                {
                    "name": cat.name,
                    "spent": cat_spent,
                    "limit": cat_limit,
                    "precent": min(cat_percent, 100),
                }
            )

    if spent_percent > 85:
        advice_text = "هشدار: شما بیش از ۸۵ درصد سقف بودجه ماهانه خود را مصرف کرده‌اید! پیشنهاد می‌شود هزینه‌های غیرضروری را متوقف کنید."
        advice_badge = "warning"
    elif spent_percent > 60:
        advice_text = "روند مصرف شما متعادل است، اما برای روزهای باقی‌مانده ماه احتیاط بیشتری به خرج دهید."
        advice_badge = "info"
    else:
        advice_text = (
            "عالی است! سرعت مصرف بودجه شما تحت کنترل است و پس‌انداز مناسبی خواهید داشت."
        )
        advice_badge = "positive"

    remaining_budget = max(0, total_budget - spent_total)
    percent = int((spent_total / total_budget) * 100) if total_budget > 0 else 0
    remaining_percent = max(0, 100 - percent)

    context = {
        "user": user,
        "total_budget": total_budget,
        "spent_total": spent_total,
        "remaining_budget": remaining_budget,
        "spent_percent": spent_percent,
        "categories_data": categories_data,
        "advice_text": advice_text,
        "advice_badge": advice_badge,
        "current_year": current_year,
        "current_month": current_month,
        "percent": percent,
        "remaining_percent": remaining_percent,
    }
    return render(request, "personal_budget.html", context)


@login_required
def personal_reports_view(request):
    user = request.user

    now = datetime.now()
    selected_year = int(request.GET.get("year", now.year))
    selected_month = int(request.GET.get("month", now.month))

    all_user_transactions = Transaction.objects.filter(user=user)
    print(
        "ALL TRANSACTIONS FOR USER:",
        list(
            all_user_transactions.values("title", "amount", "date", "transaction_type")
        ),
    )

    transactions = all_user_transactions.filter(
        date__year=selected_year, date__month=selected_month
    )
    print(
        f"FILTERED FOR MONTH {selected_month}, YEAR {selected_year}:",
        list(transactions.values("title", "amount", "date")),
    )

    transaction = Transaction.objects.filter(
        user=user, date__year=selected_year, date__month=selected_month
    )

    total_income = (
        transaction.filter(transaction_type="income").aggregate(sum=Sum("amount"))[
            "sum"
        ]
        or 0
    )
    total_expense = (
        transaction.filter(transaction_type="expense").aggregate(sum=Sum("amount"))[
            "sum"
        ]
        or 0
    )
    net_result = total_income - total_expense

    months = [
        {"id": 1, "name": "ژانویه (January)"},
        {"id": 2, "name": "فوریه (February)"},
        {"id": 3, "name": "مارس (March)"},
        {"id": 4, "name": "آپریل (April)"},
        {"id": 5, "name": "می (May)"},
        {"id": 6, "name": "ژوئن (June)"},
        {"id": 7, "name": "جولای (July)"},
        {"id": 8, "name": "آگوست (August)"},
        {"id": 9, "name": "سپتامبر (September)"},
        {"id": 10, "name": "اکتبر (October)"},
        {"id": 11, "name": "نوامبر (November)"},
        {"id": 12, "name": "دسامبر (December)"},
    ]
    context = {
        "total_income": total_income,
        "total_expense": total_expense,
        "net_result": net_result,
        "selected_month": selected_month,
        "selected_year": selected_year,
        "months": months,
    }
    return render(request, "personal_reports.html", context)
