from django.urls import path
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from routes.views.auth_views import LoggedUserView, LogoutView
from routes.views.place_views import PlaceDetailView, PlaceListCreateView
from routes.views.route_views import RouteDetailView, RouteListCreateView
from routes.views.user_views import UserDetailView, UserListCreateView


urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='login'),
    path('refresh', TokenRefreshView.as_view(), name='refresh'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('logged', LoggedUserView.as_view(), name='logged'),
    
    path('password_reset/', auth_views.PasswordResetView.as_view(), name="password_reset"),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name="password_reset_done"),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),


    path('users', UserListCreateView.as_view(), name='gen_user'),
    path('users/<int:pk>', UserDetailView.as_view(), name='spe_user'),
    path('places', PlaceListCreateView.as_view(), name='gen_place'),
    path('places/<int:pk>', PlaceDetailView.as_view(), name='spe_place'),
    path('routes', RouteListCreateView.as_view(), name='gen_route'),
    path('routes/<int:pk>', RouteDetailView.as_view(), name='spe_route'),
]
