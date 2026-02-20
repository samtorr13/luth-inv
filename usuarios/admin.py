from django.contrib import admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    

    list_display = ['username', 'email', 'rol', 'is_active', 'is_staff']
    

    list_filter = ['rol', 'is_staff', 'is_active']


    fieldsets = UserAdmin.fieldsets + (
        ('Información de Lutería', {'fields': ('rol', 'nro_tlf', 'admin_of')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Información de Lutería', {'fields': ('rol', 'nro_tlf', 'admin_of')}),
    )


admin.site.register(CustomUser, CustomUserAdmin)