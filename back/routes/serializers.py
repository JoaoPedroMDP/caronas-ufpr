"""
    Este módulo contém os serializadores para os modelos Route e Endpoint.
"""
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from routes.models import Partnership, User, Place, Route


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'contact', 'bio', 'photo']
        extra_kwargs = {
            'password': {'write_only': True},
            'bio': {'required': False},
        }

    def __init__(self, *args, **kwargs):
        """
            Na atualização, quero que todos os campos sejam opcionais. Por isso precisei alterar o __init__
        """
        super().__init__(*args, **kwargs)
        # self.instance só existe na atualização
        if self.instance:
            for field in self.fields:
                self.fields[field].required = False

    def validate_email(self, value):
        if self.instance:
            # Se estamos atualizando, permitimos que o próprio usuário mantenha seu email
            if User.objects.exclude(pk=self.instance.pk).filter(email=value).exists():
                raise serializers.ValidationError("Este email já está em uso.")
        else:
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

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password:
            instance.set_password(password)
            instance.save()
        return instance

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id', 'name', 'type']


class RouteSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    from_place = PlaceSerializer()
    to_place = PlaceSerializer()

    def create(self, validated_data):
        from_place_data = validated_data.pop('from_place')
        to_place_data = validated_data.pop('to_place')
        from_place = Place.objects.get_or_create(**from_place_data)[0]
        to_place = Place.objects.get_or_create(**to_place_data)[0]
        route = Route.objects.create(from_place=from_place, to_place=to_place, **validated_data)
        return route

    class Meta:
        model = Route
        fields = ['id', 'name', 'intentions', 'user', 'arrive_time', 'from_place', 'to_place']


class PartnershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partnership
        fields = ['id', 'route', 'requestant', 'requested', 'status']
        extra_kwargs = {
            'status': {'read_only': True, 'default': 'pending'},
        }
