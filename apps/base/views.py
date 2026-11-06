from django.shortcuts import render
from .models import Feature, FAQ, SiteSettings


def landing_page_view(request):
    features = Feature.objects.all()

    faqs = FAQ.objects.all()

    settings = SiteSettings.objects.first()

    context = {
        "features": features,
        "faqs": faqs,
        "settings": settings,
    }

    return render(request, "landing.html", context)


def setting_page_view(request):
    settings = SiteSettings.objects.first()

    context = {
        "settings": settings,
        "default_theme": settings.default_theme if settings else "dark",
    }
    return render(request, "setting.html", context)
