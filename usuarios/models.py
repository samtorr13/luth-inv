from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    class Rol(models.TextChoices):
        ADMIN = 'ADMIN', 'Administrador'
        ESCUELA ='ESCUELA', 'Escuela'

    rol = models.CharField(choices=Rol.choices, default=Rol.ESCUELA)
    nro_tlf = models.PositiveIntegerField(null=True)
    
    def __str__(self):
        return self.username