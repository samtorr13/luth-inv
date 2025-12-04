from django.db import models, transaction
from materiales.models import material
from inventarios.models import Inventarios, stock_inv
from django.conf import settings
from django.db.models import F
from django.core.exceptions import ValidationError, ObjectDoesNotExist

class Movimientos (models.Model):
    
    class Tipo (models.TextChoices):
        IN = "Entrada"
        OUT = "Salida"
        ADJUST = "Ajuste"


    #Campos
    tipo = models.CharField(
        max_length=20, 
        choices=Tipo.choices, 
        default=Tipo.IN,
        verbose_name="Tipo de Movimiento"
    )
    cant_mov = models.FloatField(max_length=100)
    fecha_Mov = models.DateTimeField(auto_now=False, auto_now_add=True)
    user = models.ForeignKey(
                                settings.AUTH_USER_MODEL, 
                                verbose_name=("usuario"), 
                                on_delete=models.CASCADE
                                )

    #relacioneas
    material = models.ForeignKey(material, verbose_name=("Material"), on_delete=models.CASCADE) 
    inv_orig = models.ForeignKey(
                                Inventarios,
                                verbose_name=("Inventario afectado"),
                                related_name=('Movimientos'),
                                on_delete=models.CASCADE,
                                null=True
                                )
    inv_dest = models.ForeignKey(
                                            Inventarios, 
                                            on_delete=models.SET_NULL, 
                                            null=True, blank=True, 
                                            related_name='transferencias_entrantes',
                                            verbose_name="Enviar a (Opcional)"
                                            )
   
    stock_afectado = models.ForeignKey(stock_inv, on_delete=models.CASCADE, null=True, blank=True)
    

    

    def save(self, *args, **kwargs):
        es_nuevo = self.pk is None

        if es_nuevo:
            with transaction.atomic():
                

                if self.tipo == self.Tipo.IN:
                    stock_obj, created = self.inv_orig.Stock.get_or_create( # type: ignore
                        mat = self.material,
                        defaults={'mat_qty':0, 'mat_min_qty':5}
                    )
                    stock_obj.mat_qty = F('mat_qty') + self.cant_mov
                    stock_obj.save()
        
                elif self.tipo == self.Tipo.OUT:
                    try:
                        stock_obj = self.inv_orig.Stock.get(mat = self.material) # type: ignore
                    except ObjectDoesNotExist:
                        raise ValidationError(f'El material {self.material} no existe en este inventario')
                    
                    if stock_obj.mat_qty < self.cant_mov:
                        raise ValidationError(f'stock iunsuficiente para esta transacción')
                    
                    stock_obj.mat_qty = F('mat_qty') - self.cant_mov
                    stock_obj.save()
                
                elif self.tipo == self.Tipo.ADJUST:
                    stock_obj, created = self.inv_dest.Stock.get_or_create( # type: ignore
                        mat = self.material,
                        defaults={'mat_qty':0, 'mat_min_qty':5}
                    )
                    stock_obj.mat_qty = self.cant_mov
                    stock_obj.save()
        
            self.stock_afectado = stock_obj # type: ignore

            super().save(*args, **kwargs)

            if self.tipo == self.Tipo.OUT and self.inv_dest:
                Movimientos.objects.create(
                    inv_orig = self.inv_dest,
                    material = self.material,
                    cant_mov = self.cant_mov,
                    tipo = self.Tipo.IN,
                    user = self.user,
                    inv_dest = None,
                    stock_afectado = None
                )
        else:
            super().save(*args, **kwargs)

