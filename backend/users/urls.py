from django.urls import path
from .views import UserCreateView, UserUpdateView

urlpatterns = [
    path('create/', UserCreateView.as_view(), name='user-create'),
    path('update/<int:pk>/', UserUpdateView.as_view(), name='user-update'),
]