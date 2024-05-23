"""
    Este módulo contém os serializadores para os modelos Route e Endpoint.
"""
from rest_framework import serializers
from routes.models import User, Place, Route, Endpoint

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'contact', 'bio', 'photo']
        extra_kwargs = {
            'name': {'required': True},
            'email': {'required': True},
            'contact': {'required': True}
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email já está em uso.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            contact=validated_data['contact'],
            bio=validated_data.get('bio', None),
            photo=validated_data.get('photo', None)
        )

        return user

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id', 'name', 'type']


class RouteSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Route
        fields = ['id', 'name', 'intentions', 'user', 'created_at', 'updated_at']


class EndpointSerializer(serializers.ModelSerializer):
    route = serializers.ReadOnlyField(source='route.name')
    place = serializers.ReadOnlyField(source='place.name')

    class Meta:
        model = Endpoint
        fields = ['id', 'arrive_time', 'type', 'route', 'place', 'created_at', 'updated_at']
