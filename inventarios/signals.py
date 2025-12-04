from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import stock_inv, AlertaStock

@receiver(post_save, sender=stock_inv)
def verif_min_stock(sender, instance, created, **kwargs):

    instance.refresh_from_db()
    
    if instance.mat_qty <= instance.mat_min_qty:
        alerta_exist = AlertaStock.objects.filter(
            inv = instance.inv,
            mat = instance.mat,
            resuelto = False
        ).exists()

        if not alerta_exist:
            AlertaStock.objects.create(
                inv=instance.inv,
                mat = instance.mat,
                msg = f'El material {instance.mat} se está agotando en {instance.inv}',
            )
                