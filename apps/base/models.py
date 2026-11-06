from django.db import models


class Feature(models.Model):
    icon_class = models.CharField(
        max_length=50, help_text="مثال: fa-solid fa-chart-pie", verbose_name="آیکون"
    )
    title = models.CharField(max_length=100, verbose_name="عنوان")
    description = models.TextField(verbose_name="توضیحات")
    order = models.PositiveIntegerField(
        default=0, help_text="برای تعیین ترتیب نمایش", verbose_name="ترتیب"
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "ویژگی"
        verbose_name_plural = "ویژگی‌ها"

    def __str__(self):
        return self.title


class FAQ(models.Model):
    question = models.CharField(max_length=255, verbose_name="سوال")
    answer = models.TextField(verbose_name="پاسخ")
    order = models.PositiveIntegerField(
        default=0, help_text="برای تعیین ترتیب نمایش", verbose_name="ترتیب"
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "سوال متداول"
        verbose_name_plural = "سوالات متداول"

    def __str__(self):
        return self.question


class SiteSettings(models.Model):
    email = models.EmailField(default="info@taraz.com", verbose_name="ایمیل")
    phone = models.CharField(max_length=20, default="۰۲۱-۰۰۰۰۰۰۰۰", verbose_name="تلفن")
    instagram_url = models.URLField(blank=True, verbose_name="اینستاگرام")
    telegram_url = models.URLField(blank=True, verbose_name="تلگرام")
    linkedin_url = models.URLField(blank=True, verbose_name="لینکدین")
    default_theme = models.CharField(
        max_length=10, choices=[("light", "روشن"), ("dark", "تاریک")], default="dark", verbose_name="تم"
    )

    class Meta:
        verbose_name = "تنظیمات سایت"
        verbose_name_plural = "تنظیمات سایت"

    def __str__(self):
        return "تنظیمات کلی سایت"
