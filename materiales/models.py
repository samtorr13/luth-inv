from django.db import models

class material(models.Model):
    class Tipo(models.TextChoices):
        MADERA = 'MADERA', 'Maderas y Trozos'
        BARNIZ = 'BARNIZ', 'Barnices y Pinturas'
        HERRAJE = 'HERRAJE', 'Herrajes y Piezas'
        CUERDAS = 'CUERDAS', 'Cuerdas'
        HERRAMIENTA = 'HERRAMIENTA', 'Herramientas'
        OTRO = 'OTRO', 'Otros'
    class Unidad (models.TextChoices):
        KILOGRAMO = 'KILOS'
        LITROS = 'LITROS'
        PIEZAS = 'PIEZAS'
        TABLONES = 'TABLONES'
        LAMINAS = 'LAMINAS'

    class Estado(models.TextChoices):
         PENDIENTE = 'PENDIENTE', 'Pendiente'
         APROBADO = 'APROBADO', 'Aprobado'
         RECHAZADO = 'RECHAZADO', 'Rechazado'
         ENTREGADO = 'ENTREGADO', 'Entregado'
    name = models.TextField(max_length=40)
    desc = models.TextField(max_length=150, null=True)
    tipo = models.CharField(
        max_length=20, 
        choices=Tipo.choices, 
        default=Tipo.MADERA,
        verbose_name="Tipo de Material"
    )

    unidad = models.CharField (max_length=20, choices=Unidad.choices, 
                               default=Unidad.KILOGRAMO, verbose_name='Unidad de medida')

    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.PENDIENTE,
                            verbose_name='Estado de la entrega')
    def __str__(self):
        return f'{self.name}'
    
    class Meta:
            db_table = ''
            managed = True
            verbose_name = 'Material'
            verbose_name_plural = 'Materiales'