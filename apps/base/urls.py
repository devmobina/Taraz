from django.urls import path
from .views import landing_page_view, setting_page_view

urlpatterns = [
    path("landing/", landing_page_view, name="landing_page"),
    path("setting/", setting_page_view, name="setting_page"),
]
