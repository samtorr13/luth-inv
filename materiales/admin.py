from django.contrib import admin
from materiales.models import material

@admin.register(material)
class PostAdmin(admin.ModelAdmin):
    fields = ('name', 'desc', 'tipo', 'unidad')
