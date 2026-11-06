from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Person


# Register your models here.
@admin.register(Person)
class PersonAdmin(UserAdmin):
    list_display = (
        "name",
        "first_name",
        "last_name",
        "email",
        "phone",
        "is_staff",
        "is_active",
    )
    list_display_links = ("name",)
    list_filter = ("is_staff", "is_active")
    search_fields = (
        "name",
        "first_name",
        "last_name",
        "email",
        "phone",
    )
    ordering = ("username",)

    fieldsets = UserAdmin.fieldsets + (
        ("اطلاعات تکمیلی", {"fields": ("phone", "external_id", "profile_image")}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("اطلاعات تکمیلی", {"fields": ("phone", "external_id", "profile_image")}),
    )
