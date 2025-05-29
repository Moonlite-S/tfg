from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, UserCreateSerializer, UserUpdateSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model

# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserCreateSerializer

class UserUpdateView(generics.UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserUpdateSerializer