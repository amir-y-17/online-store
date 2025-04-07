from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    address = models.TextField()
    profile_picture = models.ImageField(upload_to="profile_pictures/")

    def __str__(self):
        return self.username


class PasswordReset(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
