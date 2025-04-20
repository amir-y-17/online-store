from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "core"
urlpatterns = [
    path("token/", TokenObtainPairView.as_view()),
    path("token/refresh/", views.RefreshTokenCookieView.as_view()),
    path(
        "password-reset/",
        views.PasswordResetRequestView.as_view(),
        name="password-reset",
    ),
    path(
        "password-reset-confirm/<uidb64>/<token>/",
        views.PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("register/", views.UserRegisterView.as_view()),
]
