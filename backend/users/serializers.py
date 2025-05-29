from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = get_user_model().EMAIL_FIELD 

class UserSerializer(serializers.ModelSerializer):
    """ This just serializes basic user information """
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'first_name', 'last_name']
    
class UserCreateSerializer(serializers.ModelSerializer):
    """ This serializes user creation """
    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    """ This serializes user update """
    class Meta:
        model = get_user_model()
        fields = ['email', 'first_name', 'last_name']
        extra_kwargs = {'email': {'required': False}}

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)