from django.contrib import admin
from inventarios.models import Inventarios, stock_inv

class StockInline(admin.TabularInline):
    model = stock_inv
    extra = 0  
    

@admin.register(Inventarios)
class PostAdmin(admin.ModelAdmin):
    
    inlines = [StockInline]