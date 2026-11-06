# apps/personall/admin.py
from django.contrib import admin
from .models import Category, Transaction, FinancialGoal, MonthlyBudget


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "user")
    list_filter = ("type",)
    search_fields = ("name", "user__username")


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "amount", "transaction_type", "category", "date")
    list_filter = ("transaction_type", "date", "category")
    search_fields = ("title", "user__username", "description")
    date_hierarchy = "date"


@admin.register(FinancialGoal)
class FinancialGoalAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "user",
        "target_amount",
        "current_amount",
        "target_date",
        "is_completed",
    )
    list_filter = ("is_completed", "target_date")
    search_fields = ("title", "user__username")


@admin.register(MonthlyBudget)
class MonthlyBudgetAdmin(admin.ModelAdmin):
    list_display = ("user", "year", "month", "amount")
    list_filter = ("year", "month")
    search_fields = ("user__username",)
