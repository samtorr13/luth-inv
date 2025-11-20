from django.db import models
from materiales.models import material

class Inventarios(models.Model):

    name = models.TextField(max_length=50)
    ubic = models.TextField(max_length=100, null=True)
    es_depo = models.BooleanField(default=False, verbose_name='Es Depósito Central?')

    def __str__(self):
        return f"inventario de {self.name}"
    
    class Meta:
            db_table = ''
            managed = True
            verbose_name = 'Inventario'
            verbose_name_plural = 'Inventarios'
    
class stock_inv(models.Model):

    inv = models.ForeignKey(Inventarios, on_delete=models.CASCADE)
    mat = models.ForeignKey(material, on_delete=models.CASCADE)

    mat_qty = models.PositiveIntegerField(default=0, verbose_name='Cantidad Disponible')
    mat_min_qty = models.PositiveIntegerField(default=5, verbose_name='Cantidad Minima')

    def __str__(self):
        return f'stock de {self.inv.name}'
    
    class Meta:
            db_table = ''
            managed = True
            verbose_name = 'Stock'
            verbose_name_plural = 'Stocks'