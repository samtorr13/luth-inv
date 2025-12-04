from django.contrib import admin
from inventarios.models import Inventarios, stock_inv, AlertaStock

class StockInline(admin.TabularInline):
    model = stock_inv
    extra = 0  
    

@admin.register(Inventarios)
class InvAdmin(admin.ModelAdmin):
    
    inlines = [StockInline]
    search_fields = ('name',)
    list_filter = ('es_depo',)

@admin.register(AlertaStock)
class AlertAdmin(admin.ModelAdmin):
    readonly_fields = ('msg', 'inv', 'mat', 'fecha')
    search_fields = ('inv',)
    list_filter = ('resuelto',)
    ordering = ('-fecha',)

    