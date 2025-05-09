from .models import User
from django.urls import reverse
from rest_framework import status
from rest_framework import generics
from django.core.mail import send_mail
from rest_framework.views import APIView
from config.settings import EMAIL_HOST_USER
from rest_framework.response import Response
from django.utils.encoding import force_bytes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, UserRegisterSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode


class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            refresh_token = str(refresh)
            access_token = str(refresh.access_token)

            response = Response(
                {"message": "User registered successfully", "username": user.username},
                status=status.HTTP_201_CREATED,
            )
            tokens = {
                "refresh_token": refresh_token,
                "access_token": access_token,
            }
            for name, token in tokens.items():
                response.set_cookie(
                    key=name, value=token, httponly=True, secure=False, samesite="Lax"
                )
            return response
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RefreshTokenCookieView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            raise AuthenticationFailed("Refresh token not found in cookies")

        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
        except Exception:
            raise AuthenticationFailed("Invalid refresh token")

        response = Response({"message": "OK"})
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="Lax",
        )
        return response


class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User with this email does not exist"}, status=404
            )

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        try:
            reset_url = request.build_absolute_uri(
                reverse(
                    "core:password_reset_confirm",
                    kwargs={"uidb64": uid, "token": token},
                )
            )
        except Exception as e:
            return Response({"error": f"URL reverse error: {str(e)}"}, status=500)

        send_mail(
            subject="Password Reset",
            message=f"Click the link to reset your password: {reset_url}",
            from_email=EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )
        return Response(
            {"message": "Password reset link has been sent if email exists"}, status=200
        )


class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            return Response({"error": "Invalid link"}, status=400)

        if not PasswordResetTokenGenerator().check_token(user, token):
            return Response({"error": "Invalid or expired token"}, status=400)

        new_password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")

        if not new_password or not confirm_password:
            return Response(
                {"error": "Both password and confirm password are required"}, status=400
            )

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=400)

        user.set_password(new_password)
        user.save()
        return Response({"message": "Password has been reset successfully"}, status=200)
