from django.db import models, transaction
from materiales.models import material

class Inventarios(models.Model):

    name = models.TextField(max_length=50)
    ubic = models.TextField(max_length=100, null=True)
    es_depo = models.BooleanField(default=False, verbose_name='Es Depósito Central?')
    def __str__(self):
        if self.es_depo:
             return f'Deposito: {self.name}'
        return f"inventario: {self.name}"
    
    class Meta:
            db_table = ''
            managed = True
            verbose_name = 'Inventario'
            verbose_name_plural = 'Inventarios'
    
class stock_inv(models.Model):

    inv = models.ForeignKey(Inventarios, on_delete=models.CASCADE, related_name="Stock")
    mat = models.ForeignKey(material, on_delete=models.CASCADE, verbose_name='Material')

    mat_qty = models.PositiveIntegerField(default=0, verbose_name='Cantidad Disponible')
    mat_min_qty = models.PositiveIntegerField(default=5, verbose_name='Cantidad Minima')

    def __str__(self):
        
        return f'stock de {self.mat} en {self.inv}'
    
    class Meta:
            db_table = ''
            managed = True
            verbose_name = 'Stock'
            verbose_name_plural = 'Stocks'

class AlertaStock(models.Model):
    msg = models.CharField(max_length=255)
    inv = models.ForeignKey(Inventarios, on_delete=models.CASCADE)
    mat = models.ForeignKey('materiales.material', on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    resuelto = models.BooleanField(default=False)

    class Meta:
        verbose_name = ("Alerta Stock")
        verbose_name_plural = ("Alertas Stock")

    def __str__(self):
        return f'Alerta: Poco {self.mat} en {self.inv}'



    