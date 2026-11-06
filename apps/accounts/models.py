from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


from django.contrib.auth.models import AbstractUser
from django.db import models


class Person(AbstractUser):
    name = models.CharField(max_length=127, blank=True)
    phone = models.CharField(max_length=20, blank=True)

    profile_image = models.ImageField(
        upload_to="profile_images/",
        blank=True,
        null=True,
    )
    external_id = models.CharField(max_length=127, blank=True)
