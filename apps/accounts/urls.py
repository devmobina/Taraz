from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views
from .views import register_page, login_view, logout_view, profile_view

urlpatterns = [
    path("register/", register_page, name="register_url"),
    path("login/", login_view, name="login_url"),
    path("logout/", logout_view, name="logout_url"),
    path("profile/", profile_view, name="profile"),
    path(
        "forgot-password/",
        auth_views.PasswordResetView.as_view(
            template_name="forget_password.html",
            email_template_name="emails/reset_email.txt",
            subject_template_name="emails/reset_subject.txt",
            success_url=reverse_lazy("password_reset_done"),
        ),
        name="forgot_password",
    ),
    path(
        "password-reset-done/",
        auth_views.PasswordResetDoneView.as_view(
            template_name="password_reset_done.html",
        ),
        name="password_reset_done",
    ),
    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            template_name="password_reset_confirm.html",
            success_url=reverse_lazy("password_reset_complete"),
        ),
        name="password_reset_confirm",
    ),
    path(
        "reset-complete/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="password_reset_complete.html",
        ),
        name="password_reset_complete",
    ),
]
