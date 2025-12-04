from django.contrib import admin
from transacciones.models import Movimientos

@admin.register(Movimientos)
class PostAdmin(admin.ModelAdmin):
    fields = ('material', 'inv_orig','inv_dest', 'cant_mov', 'user', 'tipo')
    
