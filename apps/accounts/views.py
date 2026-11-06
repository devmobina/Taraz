from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import transaction
from .models import Person


def register_page(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        if not all([username, email, password]):
            messages.error(request, "لطفاً تمام فیلدها را پر کنید.")
            return render(request, "register.html")

        if password != confirm_password:
            messages.error(request, "رمز عبور و تکرار آن همخوانی ندارند.")
            return render(request, "register.html")

        if Person.objects.filter(username=username).exists():
            messages.error(request, "این نام کاربری قبلاً گرفته شده است.")
            return render(request, "register.html")

        try:
            user = Person.objects.create_user(
                username=username,
                email=email,
                password=password,
            )
            user.name = username
            user.save()

            messages.success(request, "ثبت‌نام با موفقیت انجام شد. حالا وارد شوید.")
            return redirect("login_url")
        except Exception as e:
            messages.error(request, f"خطایی رخ داد: {e}")
            return render(request, "register.html")

    return render(request, "register.html")


def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, "خوش آمدید!")
            return redirect("personal_dashboard")
        else:
            messages.error(request, "نام کاربری یا رمز عبور اشتباه است.")
            return render(request, "login.html")

    return render(request, "login.html")


def logout_view(request):
    logout(request)
    messages.info(request, "خارج شدید.")
    return redirect("login_url")



@login_required
def profile_view(request):
    user = request.user

    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        phone = request.POST.get("phone", "").strip()
        profile_image = request.FILES.get("profile_image")

        errors = []

        if not name or not email:
            errors.append("نام و ایمیل نمی‌توانند خالی باشند.")

        if email and Person.objects.filter(
            email__iexact=email
        ).exclude(pk=user.pk).exists():
            errors.append("این ایمیل قبلاً برای حساب دیگری ثبت شده است.")

        if profile_image:
            if profile_image.size > 2 * 1024 * 1024:
                errors.append("حجم تصویر نباید بیشتر از ۲ مگابایت باشد.")
            elif profile_image.content_type not in ("image/jpeg", "image/png", "image/webp"):
                errors.append("فرمت تصویر باید JPG، PNG یا WEBP باشد.")

        if errors:
            for err in errors:
                messages.error(request, err)

            return render(
                request,
                "accounts/profile.html",
                {
                    "profile_user": user,
                    "form_data": {"name": name, "email": email, "phone": phone},
                },
            )

        old_image = user.profile_image

        try:
            with transaction.atomic():
                user.name = name
                user.email = email
                user.phone = phone

                if profile_image:
                    user.profile_image = profile_image

                user.save(update_fields=["name", "email", "phone", "profile_image"])

                if profile_image and old_image:
                    old_image.delete(save=False)

        except Exception:
            messages.error(request, "ذخیره اطلاعات انجام نشد. دوباره تلاش کنید.")
            return render(request, "accounts/profile.html", {"profile_user": user})

        messages.success(request, "اطلاعات پروفایل با موفقیت ذخیره شد.")
        return redirect("profile")

    return render(request, "profile.html", {"profile_user": user})