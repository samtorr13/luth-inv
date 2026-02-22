from django.contrib import admin
from django.urls import path
from django.contrib.auth.views import LogoutView
from .views import Login_View, home, nosotros, logout_view, dashboard

from inventario.views import (
    # APIs de materiales
    api_materiales,
    api_material_detalle,
    api_filtrar_materiales,
    api_exportar_inventario,
    api_stocks,
    api_stocks_por_escuela,
    api_tipos_material,
    api_unidades_material,
    api_stock_detalle,
    # APIs de usuarios
    api_usuarios,
    api_usuario_detalle,
    api_usuario_toggle_status,
    api_filtrar_usuarios,
    # APIs de escuelas
    api_filtrar_escuelas,
    api_alertas_escuela,
    # APIs de pedidos admin
    api_pedidos_admin,
    api_aprobar_pedido,
    api_estadisticas_pedidos,
    # APIs de reportes admin
    api_reporte_inventario_admin,
    api_reporte_consumo_admin,
    api_reporte_pedidos_admin,
    api_reporte_alertas_admin,
    api_exportar_reporte_admin_excel,
)

from transacciones.views import (
    api_movimientos_escuela,
    api_crear_solicitud,
    api_materiales_escuela,
    api_reporte_inventario,
    api_reporte_consumo,
    api_reporte_pedidos,
    api_reporte_alertas,
    api_exportar_reporte_excel,
)

urlpatterns = [
    # ============================================
    # AUTENTICACIÓN
    # ============================================
    path('login/', Login_View.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),
    # ============================================
    # ADMIN DJANGO
    # ============================================
    path('admin/', admin.site.urls),
    # ============================================
    # PÁGINAS PRINCIPALES
    # ============================================
    path('', home, name='home'),
    path('dashboard/', dashboard, name="dashboard"),
    path('nosotros/', nosotros, name="nosotros"),
    # ============================================
    # API ENDPOINTS - MATERIALES
    # ============================================
    path('api/materiales/', api_materiales, name='api_materiales'),
    path('api/materiales/<int:material_id>/', api_material_detalle, name='api_material_detalle'),
    path('api/filtrar-materiales/', api_filtrar_materiales, name='api_filtrar_materiales'),
    path('api/exportar-inventario/', api_exportar_inventario, name='api_exportar_inventario'),
    path('api/stocks/', api_stocks, name='api_stocks'),
    path('api/stocks/<int:escuela_id>/', api_stocks_por_escuela, name='api_stocks_por_escuela'),
    path('api/tipos-material/', api_tipos_material, name='api_tipos_material'),
    path('api/unidades-material/', api_unidades_material, name='api_unidades_material'),
    path('api/stocks/<int:stock_id>/', api_stock_detalle, name='api_stock_detalle'),
    # ============================================
    # API ENDPOINTS - USUARIOS
    # ============================================
    path('api/usuarios/', api_usuarios, name='api_usuarios'),
    path('api/usuarios/<int:user_id>/', api_usuario_detalle, name='api_usuario_detalle'),
    path('api/usuarios/<int:user_id>/toggle-status/', api_usuario_toggle_status, name='api_usuario_toggle_status'),
    path('api/filtrar-usuarios/', api_filtrar_usuarios, name='api_filtrar_usuarios'),
    # ============================================
    # API ENDPOINTS - ESCUELAS
    # ============================================
    path('api/filtrar-escuelas/', api_filtrar_escuelas, name='api_filtrar_escuelas'),
    path('api/alertas/', api_alertas_escuela, name='api_alertas_escuela'),
    # ============================================
    # API ENDPOINTS - PEDIDOS PARA ESCUELA
    # ============================================
    path('api/movimientos-escuela/', api_movimientos_escuela, name='api_movimientos_escuela'),
    path('api/crear-solicitud/', api_crear_solicitud, name='api_crear_solicitud'),
    path('api/materiales-escuela/', api_materiales_escuela, name='api_materiales_escuela'),
    # ============================================
    # API ENDPOINTS - PEDIDOS ADMIN
    # ============================================
    path('api/pedidos-admin/', api_pedidos_admin, name='api_pedidos_admin'),
    path('api/aprobar-pedido/<int:pedido_id>/', api_aprobar_pedido, name='api_aprobar_pedido'),
    path('api/estadisticas-pedidos/', api_estadisticas_pedidos, name='api_estadisticas_pedidos'),
    # ============================================
    # API ENDPOINTS - REPORTES (PARA ESCUELA)
    # ============================================
    path('api/reporte-inventario/', api_reporte_inventario, name='api_reporte_inventario'),
    path('api/reporte-consumo/', api_reporte_consumo, name='api_reporte_consumo'),
    path('api/reporte-pedidos/', api_reporte_pedidos, name='api_reporte_pedidos'),
    path('api/reporte-alertas/', api_reporte_alertas, name='api_reporte_alertas'),
    path('api/exportar-reporte-excel/', api_exportar_reporte_excel, name='api_exportar_reporte_excel'),
    # ============================================
    # API ENDPOINTS - REPORTES PARA ADMIN
    # ============================================
    path('api/reporte-inventario-admin/', api_reporte_inventario_admin, name='api_reporte_inventario_admin'),
    path('api/reporte-consumo-admin/', api_reporte_consumo_admin, name='api_reporte_consumo_admin'),
    path('api/reporte-pedidos-admin/', api_reporte_pedidos_admin, name='api_reporte_pedidos_admin'),
    path('api/reporte-alertas-admin/', api_reporte_alertas_admin, name='api_reporte_alertas_admin'),
    path('api/exportar-reporte-admin-excel/', api_exportar_reporte_admin_excel, name='api_exportar_reporte_admin_excel'),
]