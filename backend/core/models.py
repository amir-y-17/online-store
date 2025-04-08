from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    address = models.TextField()
    profile_picture = models.ImageField(upload_to="profile_pictures/")

    def __str__(self):
        return self.username
