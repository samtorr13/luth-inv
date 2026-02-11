
from django.contrib import admin
from django.urls import path
from django.contrib.auth.views import LogoutView
from .views import Login_View, home, nosotros

from inventarios.views import dashboard



urlpatterns = [
    path('login/', Login_View.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),


    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('dashboard/',dashboard, name="dashboard"),
    #path('dashboardes/',dashboardes, name="dashboardes"),
    path('nosotros/',nosotros, name="nosotros")]

