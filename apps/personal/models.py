from django.db import models
from django.conf import settings
from django.utils import timezone


class Category(models.Model):
    CATEGORY_TYPES = [
        ("income", "درآمد"),
        ("expense", "هزینه"),
    ]
    name = models.CharField(max_length=100, verbose_name="نام دسته‌بندی")
    type = models.CharField(
        max_length=10, choices=CATEGORY_TYPES, verbose_name="نوع دسته‌بندی"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="categories",
        null=True,
        blank=True,
        verbose_name="کاربر",
    )

    class Meta:
        verbose_name = "دسته‌بندی"
        verbose_name_plural = "دسته‌بندی‌ها"

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ("income", "درآمد"),
        ("expense", "هزینه"),
    ]
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="transactions",
        verbose_name="کاربر",
    )
    title = models.CharField(max_length=200, verbose_name="عنوان تراکنش")
    amount = models.DecimalField(
        max_digits=12, decimal_places=2, verbose_name="مبلغ (تومان)"
    )
    transaction_type = models.CharField(
        max_length=10, choices=TRANSACTION_TYPES, verbose_name="نوع تراکنش"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="transactions",
        verbose_name="دسته‌بندی",
    )
    date = models.DateField(default=timezone.now, verbose_name="تاریخ تراکنش")
    description = models.TextField(blank=True, null=True, verbose_name="توضیحات")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "تراکنش"
        verbose_name_plural = "تراکنش‌ها"
        ordering = ["-date", "-created_at"]

    def __str__(self):
        return f"{self.title} - {self.amount} ({self.get_transaction_type_display()})"


class FinancialGoal(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="financial_goals",
        verbose_name="کاربر",
    )
    title = models.CharField(max_length=200, verbose_name="عنوان هدف")
    target_amount = models.DecimalField(
        max_digits=12, decimal_places=2, verbose_name="مبلغ هدف"
    )
    current_amount = models.DecimalField(
        max_digits=12, decimal_places=0, default=0, verbose_name="مبلغ پس‌انداز شده"
    )
    target_date = models.DateField(null=True, blank=True, verbose_name="تاریخ دستیابی")
    is_completed = models.BooleanField(default=False, verbose_name="تکمیل شده")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "هدف مالی"
        verbose_name_plural = "اهداف مالی"

    def __str__(self):
        return f"{self.title} ({self.current_amount}/{self.target_amount})"


class MonthlyBudget(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="monthly_budgets",
        verbose_name="کاربر",
    )
    month = models.IntegerField(verbose_name="ماه (عدد)")
    year = models.IntegerField(verbose_name="سال")
    amount = models.DecimalField(
        max_digits=12, decimal_places=0, verbose_name="سقف بودجه ماهانه"
    )

    class Meta:
        verbose_name = "بودجه ماهانه"
        verbose_name_plural = "بودجه‌های ماهانه"
        unique_together = ("user", "month", "year")

    def __str__(self):
        return f"بودجه {self.year}/{self.month}: {self.amount}"
