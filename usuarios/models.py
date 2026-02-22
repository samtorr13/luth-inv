from django.db import models
from django.contrib.auth.models import AbstractUser
from inventarios.models import Inventarios

class CustomUser(AbstractUser):
    class Rol(models.TextChoices):
        ADMIN = 'ADMIN', 'Administrador'
        ESCUELA ='ESCUELA', 'Escuela'

    rol = models.CharField(choices=Rol.choices, default=Rol.ESCUELA)
    nro_tlf = models.PositiveIntegerField(null=True)

    activo = models.BooleanField(default=True)
    
    admin_of = models.ForeignKey(Inventarios, on_delete=models.SET_NULL, null=True, blank=True, related_name='Administrador')

    def __str__(self):
        return self.username