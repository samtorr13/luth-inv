// static/js/dashboardes.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("Dashboard Escuela cargado");
    
    // ============================================
    // 1. VERIFICAR DATOS DE USUARIO
    // ============================================
    if (!window.userData) {
        console.error("No hay datos de usuario - redirigiendo");
        window.location.href = '/login/';
        return;
    }
    
    console.log("Datos de usuario escuela:", window.userData);
    
    // ============================================
    // 2. MOSTRAR INFORMACIÓN DEL USUARIO
    // ============================================
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    const userAvatar = document.getElementById('userAvatar');
    const schoolBadge = document.getElementById('schoolBadge');
    const welcomeTitle = document.getElementById('welcomeTitle');
    
    if (userName) userName.textContent = window.userData.escuela_nombre || 'Escuela';
    if (userRole) userRole.textContent = window.userData.rol_display || 'Usuario Escolar';
    if (userAvatar) userAvatar.textContent = (window.userData.first_name || 'E').charAt(0).toUpperCase();
    if (schoolBadge) schoolBadge.textContent = window.userData.escuela_nombre || '';
    if (welcomeTitle) welcomeTitle.textContent = 'Bienvenido, ' + (window.userData.escuela_nombre || 'Escuela');
    
    // ============================================
    // 3. MOSTRAR FECHA ACTUAL
    // ============================================
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('es-ES', options);
    }
    
    // ============================================
    // 4. VARIABLES GLOBALES
    // ============================================
    const escuelaId = window.userData.escuela_id;
    let stocksData = [];
    let materialesDisponibles = [];
    
    // ============================================
    // 5. FUNCIÓN PARA CAMBIAR DE SECCIÓN
    // ============================================
    window.switchSection = function(sectionId) {
        document.querySelectorAll('.dashboard-section').forEach(function(section) {
            section.classList.remove('active');
        });
        
        const selectedSection = document.getElementById('section-' + sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }
        
        document.querySelectorAll('.sidebar-menu a').forEach(function(link) {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Cargar datos específicos según la sección
        if (sectionId === 'inventario') {
            cargarInventarioEscuela();
        } else if (sectionId === 'pedidos') {
            cargarMaterialesDisponibles();
            cargarPedidosEscuela();
        } else if (sectionId === 'reportes') {
            cargarEstadisticasReportes();
        }
    };
    
    // ============================================
    // 6. ASIGNAR EVENTOS A LOS MENÚS
    // ============================================
    document.querySelectorAll('.sidebar-menu a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.switchSection(this.dataset.section);
        });
    });
    
    // ============================================
    // 7. FUNCIÓN PARA CARGAR TODOS LOS STOCKS
    // ============================================
    function cargarTodosLosStocks() {
        return fetch('/api/stocks/')
            .then(function(response) {
                if (!response.ok) throw new Error('Error al cargar stocks');
                return response.json();
            })
            .then(function(data) {
                stocksData = data.data || [];
                return stocksData;
            })
            .catch(function(error) {
                console.error('Error cargando stocks:', error);
                return [];
            });
    }
    
    // ============================================
    // 8. FUNCIÓN PARA CARGAR INVENTARIO DE LA ESCUELA
    // ============================================
    function cargarInventarioEscuela() {
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px;"><i class="fas fa-spinner fa-spin"></i> Cargando inventario...</td></tr>';
        
        cargarTodosLosStocks().then(function(stocks) {
            if (!stocks || stocks.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px;">No hay productos en inventario</td></tr>';
                return;
            }
            
            var stocksEscuela = [];
            if (escuelaId) {
                for (var i = 0; i < stocks.length; i++) {
                    if (stocks[i].inventario_id == escuelaId) {
                        stocksEscuela.push(stocks[i]);
                    }
                }
            }
            
            if (stocksEscuela.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px;">No hay productos en esta escuela</td></tr>';
                return;
            }
            
            var html = '';
            var bajoStock = 0;
            var agotados = 0;
            
            for (var i = 0; i < stocksEscuela.length; i++) {
                var item = stocksEscuela[i];
                var estadoClass = '';
                var estadoText = '';
                var estadoIcon = '';
                
                if (item.cantidad === 0) {
                    estadoClass = 'status-out-of-stock';
                    estadoText = 'Agotado';
                    estadoIcon = 'fa-times-circle';
                    agotados++;
                } else if (item.cantidad < item.minimo) {
                    estadoClass = 'status-low-stock';
                    estadoText = 'Bajo Stock';
                    estadoIcon = 'fa-exclamation-triangle';
                    bajoStock++;
                } else {
                    estadoClass = 'status-in-stock';
                    estadoText = 'Normal';
                    estadoIcon = 'fa-check-circle';
                }
                
                html += `
                <tr>
                    <td><i class="fas fa-box" style="color: #6c757d; margin-right: 8px;"></i> ${item.material_nombre}</td>
                    <td><i class="fas fa-tag" style="color: #17a2b8; margin-right: 5px;"></i> General</td>
                    <td><span style="font-weight: 600; color: #007bff;">${item.cantidad}</span></td>
                    <td><i class="fas fa-map-marker-alt" style="color: #28a745; margin-right: 5px;"></i> Principal</td>
                    <td>${item.minimo}</td>
                    <td><span class="status-badge ${estadoClass}"><i class="fas ${estadoIcon}"></i> ${estadoText}</span></td>
                    <td>
                        <button class="action-btn view" data-id="${item.id}"><i class="fas fa-eye"></i></button>
                        <button class="action-btn request" data-id="${item.id}"><i class="fas fa-cart-plus"></i></button>
                    </td>
                </tr>
                `;
            }
            
            tbody.innerHTML = html;
            
            document.getElementById('lowStockProducts').textContent = bajoStock;
            document.getElementById('outOfStockProducts').textContent = agotados;
            document.getElementById('totalProducts').textContent = stocksEscuela.length;
            
            var totalStock = 0;
            for (var j = 0; j < stocksEscuela.length; j++) {
                totalStock += stocksEscuela[j].cantidad;
            }
            document.getElementById('inStockProducts').textContent = totalStock;
            
            actualizarTablaBajoStock(stocksEscuela);
            asignarEventosBotones();
        });
    }
    
    // ============================================
    // 9. FUNCIÓN PARA ACTUALIZAR TABLA DE BAJO STOCK
    // ============================================
    function actualizarTablaBajoStock(stocks) {
        var tbody = document.getElementById('lowStockTableBody');
        if (!tbody) return;
        
        var bajoStock = [];
        var agotados = [];
        
        for (var i = 0; i < stocks.length; i++) {
            var s = stocks[i];
            if (s.cantidad === 0) {
                agotados.push(s);
            } else if (s.cantidad > 0 && s.cantidad < s.minimo) {
                bajoStock.push(s);
            }
        }
        
        var todosBajoStock = bajoStock.concat(agotados);
        
        if (todosBajoStock.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px;">No hay productos con bajo stock</td></tr>';
            return;
        }
        
        var html = '';
        for (var j = 0; j < todosBajoStock.length; j++) {
            var item = todosBajoStock[j];
            var estadoClass = (item.cantidad === 0) ? 'status-out-of-stock' : 'status-low-stock';
            var estadoText = (item.cantidad === 0) ? 'Agotado' : 'Bajo Stock';
            var estadoIcon = (item.cantidad === 0) ? 'fa-times-circle' : 'fa-exclamation-triangle';
            var colorCantidad = (item.cantidad === 0) ? '#e74c3c' : '#f39c12';
            
            html += `
            <tr>
                <td><i class="fas fa-box"></i> ${item.material_nombre}</td>
                <td>General</td>
                <td><span style="font-weight: 600; color: ${colorCantidad};">${item.cantidad}</span></td>
                <td>${item.minimo}</td>
                <td><span class="status-badge ${estadoClass}"><i class="fas ${estadoIcon}"></i> ${estadoText}</span></td>
                <td><button class="action-btn request" data-id="${item.id}"><i class="fas fa-cart-plus"></i> Solicitar</button></td>
            </tr>
            `;
        }
        
        tbody.innerHTML = html;
    }
    
    // ============================================
    // 10. FUNCIÓN PARA CARGAR ALERTAS
    // ============================================
    function cargarAlertasEscuela() {
        var alertsList = document.getElementById('alertsList');
        if (!alertsList) return;
        
        alertsList.innerHTML = '<p style="text-align:center; padding:20px;"><i class="fas fa-spinner fa-spin"></i> Cargando alertas...</p>';
        
        fetch('/api/alertas/')
            .then(function(response) {
                if (!response.ok) throw new Error('Error al cargar alertas');
                return response.json();
            })
            .then(function(data) {
                if (!data.data || data.data.length === 0) {
                    alertsList.innerHTML = '<p style="text-align:center; padding:20px; color:#28a745;"><i class="fas fa-check-circle"></i> No hay alertas pendientes</p>';
                    return;
                }
                
                var html = '';
                for (var i = 0; i < data.data.length; i++) {
                    var alerta = data.data[i];
                    html += `
                    <div class="alert-item">
                        <i class="fas fa-exclamation-circle" style="color: #dc3545;"></i>
                        <div style="flex:1;">
                            <strong>${alerta.material}</strong>: ${alerta.mensaje}
                            <br><small>${new Date(alerta.fecha).toLocaleString()}</small>
                        </div>
                        <button class="action-btn request" data-id="${alerta.id}"><i class="fas fa-cart-plus"></i> Solicitar</button>
                    </div>
                    `;
                }
                alertsList.innerHTML = html;
            })
            .catch(function(error) {
                console.error('Error cargando alertas:', error);
                alertsList.innerHTML = '<p style="color:#dc3545; text-align:center;">Error al cargar alertas</p>';
            });
    }
    
    function cargarMaterialesDisponibles() {
        var select = document.getElementById('orderProduct');
        if (!select) return;
        
        select.innerHTML = '<option value="">Cargando materiales...</option>';
        console.log("Cargando materiales desde /api/materiales-escuela/");
        
        fetch('/api/materiales-escuela/')
            .then(function(response) {
                console.log("Status respuesta:", response.status);
                if (!response.ok) {
                    return response.json().then(function(err) {
                        throw new Error(err.error || 'Error ' + response.status);
                    });
                }
                return response.json();
            })
            .then(function(data) {
                console.log("Materiales recibidos:", data);
                
                if (data.error) {
                    throw new Error(data.error);
                }
                
                materialesDisponibles = data.data || [];
                
                if (materialesDisponibles.length === 0) {
                    select.innerHTML = '<option value="">No hay materiales disponibles</option>';
                    return;
                }
                
                var html = '<option value="">Seleccionar producto...</option>';
                for (var i = 0; i < materialesDisponibles.length; i++) {
                    var m = materialesDisponibles[i];
                    var stockInfo = m.stock_central > 0 ? 'Stock: ' + m.stock_central : 'Sin stock';
                    html += '<option value="' + m.id + '">' + m.name + ' (' + stockInfo + ')</option>';
                }
                select.innerHTML = html;
            })
            .catch(function(error) {
                console.error('Error detallado:', error);
                select.innerHTML = '<option value="">Error: ' + error.message + '</option>';
                
                var alertsList = document.getElementById('alertsList');
                if (alertsList) {
                    alertsList.innerHTML = '<div class="alert-item" style="background-color: #f8d7da;">' +
                        '<i class="fas fa-exclamation-triangle" style="color: #dc3545;"></i>' +
                        '<div>Error al cargar materiales: ' + error.message + '</div>' +
                        '</div>';
                }
            });
    }
    
    function cargarPedidosEscuela() {
        var tbody = document.getElementById('pendingOrdersTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px;"><i class="fas fa-spinner fa-spin"></i> Cargando pedidos...</td></tr>';
        
        fetch('/api/movimientos-escuela/')
            .then(function(response) {
                if (!response.ok) throw new Error('Error al cargar pedidos');
                return response.json();
            })
            .then(function(data) {
                var pedidos = data.data || [];
                
                if (pedidos.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px;">No hay pedidos registrados</td></tr>';
                    return;
                }
                
                var html = '';
                for (var i = 0; i < pedidos.length; i++) {
                    var p = pedidos[i];
                    var estadoClass = p.es_entrada ? 'status-in-stock' : (p.es_salida ? 'status-out-of-stock' : 'status-low-stock');
                    var estadoIcon = p.es_entrada ? 'fa-arrow-down' : (p.es_salida ? 'fa-arrow-up' : 'fa-exchange-alt');
                    
                    html += `
                    <tr>
                        <td>MOV-${p.id}</td>
                        <td>${p.material_nombre}</td>
                        <td>${p.cantidad}</td>
                        <td><span class="status-badge ${estadoClass}"><i class="fas ${estadoIcon}"></i> ${p.tipo}</span></td>
                        <td>${new Date(p.fecha).toLocaleDateString()}</td>
                        <td><span class="status-badge ${estadoClass}">${p.es_entrada ? 'Recibido' : (p.es_salida ? 'Enviado' : 'Ajuste')}</span></td>
                    </tr>
                    `;
                }
                tbody.innerHTML = html;
            })
            .catch(function(error) {
                console.error('Error:', error);
                tbody.innerHTML = '<tr><td colspan="6" style="color:#dc3545; text-align:center;">Error al cargar pedidos</td></tr>';
            });
    }
    
    // ============================================
    // 11. FUNCIÓN PARA ENVIAR PEDIDO
    // ============================================
    function enviarPedido(event) {
        event.preventDefault();
        
        var materialId = document.getElementById('orderProduct').value;
        var cantidad = document.getElementById('orderQuantity').value;
        
        if (!materialId || !cantidad || cantidad <= 0) {
            mostrarModalError('Por favor selecciona un producto y una cantidad válida');
            return;
        }
        
        var datos = {
            material_id: parseInt(materialId),
            cantidad: parseInt(cantidad)
        };
        
        console.log("Enviando pedido:", datos);
        
        fetch('/api/crear-solicitud/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken()
            },
            body: JSON.stringify(datos)
        })
        .then(function(response) {
            if (!response.ok) {
                return response.json().then(function(err) {
                    throw new Error(err.error || 'Error al crear pedido');
                });
            }
            return response.json();
        })
        .then(function(data) {
            mostrarModalExito('✅ ' + data.message);
            
            document.getElementById('orderForm').reset();
            document.getElementById('orderForm').style.display = 'none';
            document.getElementById('newOrderBtn').style.display = 'block';
            
            cargarPedidosEscuela();
            cargarInventarioEscuela();
        })
        .catch(function(error) {
            console.error('Error:', error);
            mostrarModalError('❌ ' + error.message);
        });
    }
    
    function abrirFormularioPedido() {
        document.getElementById('orderForm').style.display = 'block';
        document.getElementById('newOrderBtn').style.display = 'none';
        
        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        var tomorrowStr = tomorrow.toISOString().split('T')[0];
        document.getElementById('orderNeededBy').min = tomorrowStr;
        
        var nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        var nextWeekStr = nextWeek.toISOString().split('T')[0];
        document.getElementById('orderNeededBy').value = nextWeekStr;
    }
    
    function cerrarFormularioPedido() {
        document.getElementById('orderForm').reset();
        document.getElementById('orderForm').style.display = 'none';
        document.getElementById('newOrderBtn').style.display = 'block';
    }
    
    // ============================================
    // 12. ASIGNAR EVENTOS A BOTONES
    // ============================================
    function asignarEventosBotones() {
        document.querySelectorAll('.action-btn.view').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var stockId = this.getAttribute('data-id');
                mostrarDetallesStock(stockId);
            });
        });
        
        document.querySelectorAll('.action-btn.request').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var stockId = this.getAttribute('data-id');
                solicitarProducto(stockId);
            });
        });
    }
    
    // ============================================
    // 13. FUNCIÓN PARA MOSTRAR DETALLES DE STOCK
    // ============================================
    function mostrarDetallesStock(stockId) {
        var stock = null;
        for (var i = 0; i < stocksData.length; i++) {
            if (stocksData[i].id == stockId) {
                stock = stocksData[i];
                break;
            }
        }
        
        if (!stock) return;
        
        var modal = document.getElementById('detailModal');
        var modalTitle = document.getElementById('modalTitle');
        var modalContent = document.getElementById('modalContent');
        
        modalTitle.textContent = 'Detalles del Producto';
        modalContent.innerHTML = `
            <p><strong>Producto:</strong> ${stock.material_nombre}</p>
            <p><strong>Cantidad:</strong> ${stock.cantidad}</p>
            <p><strong>Mínimo:</strong> ${stock.minimo}</p>
            <p><strong>Ubicación:</strong> ${stock.ubicacion || 'Principal'}</p>
        `;
        
        modal.style.display = 'flex';
    }
    
    function solicitarProducto(stockId) {
        var stock = null;
        for (var i = 0; i < stocksData.length; i++) {
            if (stocksData[i].id == stockId) {
                stock = stocksData[i];
                break;
            }
        }
        
        if (stock) {
            window.switchSection('pedidos');
            
            setTimeout(function() {
                var select = document.getElementById('orderProduct');
                for (var j = 0; j < select.options.length; j++) {
                    if (select.options[j].text.includes(stock.material_nombre)) {
                        select.selectedIndex = j;
                        break;
                    }
                }
                abrirFormularioPedido();
            }, 500);
        }
    }
    
    // ============================================
    // 14. FILTRO DE BÚSQUEDA
    // ============================================
    document.getElementById('searchInventory')?.addEventListener('input', function() {
        var searchTerm = this.value.toLowerCase();
        var rows = document.querySelectorAll('#inventoryTableBody tr');
        
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var text = row.textContent.toLowerCase();
            row.style.display = text.indexOf(searchTerm) > -1 ? '' : 'none';
        }
    });
    
    // ============================================
    // 15. BOTONES DE ACCIÓN
    // ============================================
    document.getElementById('refreshInventoryBtn')?.addEventListener('click', function() {
        cargarInventarioEscuela();
    });
    
    document.getElementById('exportInventoryBtn')?.addEventListener('click', function() {
        alert('Exportando inventario...');
    });
    
    document.getElementById('requestAllBtn')?.addEventListener('click', function() {
        alert('Función: Solicitar todos los productos con bajo stock (en desarrollo)');
    });
    
    document.getElementById('newOrderBtn')?.addEventListener('click', abrirFormularioPedido);
    document.getElementById('cancelOrderBtn')?.addEventListener('click', cerrarFormularioPedido);
    document.getElementById('orderForm')?.addEventListener('submit', enviarPedido);
    
    document.getElementById('showOrderHistoryBtn')?.addEventListener('click', function() {
        cargarPedidosEscuela();
    });
    
    // ============================================
    // 16. REPORTES
    // ============================================
    function cargarEstadisticasReportes() {
        Promise.all([
            fetch('/api/reporte-inventario/').then(r => r.json()),
            fetch('/api/reporte-consumo/').then(r => r.json()),
            fetch('/api/reporte-pedidos/').then(r => r.json()),
            fetch('/api/reporte-alertas/').then(r => r.json())
        ]).then(function(responses) {
            const [inventario, consumo, pedidos, alertas] = responses;
            
            var statsCards = document.querySelectorAll('#section-reportes .stat-card h3');
            if (statsCards.length >= 4) {
                if (inventario.success) statsCards[0].textContent = inventario.estadisticas.total_materiales || 0;
                if (consumo.success) statsCards[1].textContent = consumo.estadisticas.total_movimientos || 0;
                if (pedidos.success) statsCards[2].textContent = pedidos.estadisticas.total_pedidos || 0;
                if (alertas.success) statsCards[3].textContent = alertas.estadisticas.total_alertas || 0;
            }
        }).catch(function(error) {
            console.error('Error cargando estadísticas de reportes:', error);
        });
    }
    
function generarReporte(tipo, periodo) {
    let url = '';
    let titulo = '';
    
    if (tipo === 'inventario') {
        url = '/api/reporte-inventario/';
        titulo = 'Inventario Actual';
    } else if (tipo === 'consumo') {
        url = '/api/reporte-consumo/?periodo=' + periodo;
        titulo = 'Consumo ' + (periodo === 'mes' ? 'Mensual' : 
                               periodo === 'trimestre' ? 'Trimestral' :
                               periodo === 'semestre' ? 'Semestral' : 'Anual');
    } else if (tipo === 'pedidos') {
        url = '/api/reporte-pedidos/?periodo=' + periodo;
        titulo = 'Historial de Pedidos';
    } else if (tipo === 'alertas') {
        url = '/api/reporte-alertas/';
        titulo = 'Reporte de Alertas';
    } else {
        return;
    }
    
    mostrarModalInfo('Generando reporte...');
    
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                return response.json().then(function(err) {
                    throw new Error(err.error || 'Error al generar reporte');
                });
            }
            return response.json();
        })
        .then(function(data) {
            if (!data.success) throw new Error(data.error || 'Error desconocido');
            
            var contenido = '';
            
            // Información general
            contenido += '<h4>' + titulo + '</h4>';
            contenido += '<p><strong>Fecha de generación:</strong> ' + new Date().toLocaleString() + '</p>';
            contenido += '<p><strong>Escuela:</strong> ' + (window.userData.escuela_nombre || '') + '</p>';
            
            // Estadísticas
            if (data.estadisticas) {
                contenido += '<h5>📊 Estadísticas</h5>';
                contenido += '<ul>';
                for (var key in data.estadisticas) {
                    var label = key.replace(/_/g, ' ');
                    contenido += '<li><strong>' + label + ':</strong> ' + data.estadisticas[key] + '</li>';
                }
                contenido += '</ul>';
            }
            
            // Datos detallados
            if (data.data && data.data.length > 0) {
                contenido += '<h5>📋 Detalle</h5>';
                contenido += '<div style="max-height:300px; overflow-y:auto;">';
                contenido += '<table style="width:100%; border-collapse:collapse;">';
                contenido += '<thead><tr style="background:#f8f9fa;">';
                
                if (tipo === 'inventario') {
                    contenido += '<th>Material</th><th>Tipo</th><th>Cantidad</th><th>Mínimo</th><th>Estado</th>';
                } else if (tipo === 'consumo') {
                    contenido += '<th>Material</th><th>Total Consumido</th><th>Veces</th>';
                } else if (tipo === 'pedidos') {
                    contenido += '<th>Fecha</th><th>Material</th><th>Cantidad</th><th>Origen</th>';
                } else if (tipo === 'alertas') {
                    contenido += '<th>Fecha</th><th>Material</th><th>Mensaje</th><th>Estado</th>';
                }
                
                contenido += '</tr></thead><tbody>';
                
                for (var i = 0; i < Math.min(data.data.length, 50); i++) {
                    var item = data.data[i];
                    contenido += '<tr style="border-bottom:1px solid #eaeaea;">';
                    
                    if (tipo === 'inventario') {
                        var estadoClass = item.estado === 'Agotado' ? 'status-out-of-stock' : 
                                         (item.estado === 'Bajo Stock' ? 'status-low-stock' : 'status-in-stock');
                        contenido += '<td>' + item.material + '</td>';
                        contenido += '<td>' + item.tipo + '</td>';
                        contenido += '<td>' + item.cantidad + '</td>';
                        contenido += '<td>' + item.minimo + '</td>';
                        contenido += '<td><span class="status-badge ' + estadoClass + '">' + item.estado + '</span></td>';
                    } else if (tipo === 'consumo') {
                        contenido += '<td>' + item.material + '</td>';
                        contenido += '<td>' + item.total_consumido + '</td>';
                        contenido += '<td>' + item.veces_solicitado + '</td>';
                    } else if (tipo === 'pedidos') {
                        contenido += '<td>' + new Date(item.fecha).toLocaleDateString() + '</td>';
                        contenido += '<td>' + item.material + '</td>';
                        contenido += '<td>' + item.cantidad + '</td>';
                        contenido += '<td>' + (item.origen || 'Depósito') + '</td>';
                    } else if (tipo === 'alertas') {
                        contenido += '<td>' + new Date(item.fecha).toLocaleDateString() + '</td>';
                        contenido += '<td>' + item.material + '</td>';
                        contenido += '<td>' + item.mensaje + '</td>';
                        contenido += '<td>' + (item.resuelto ? 'Resuelta' : 'Pendiente') + '</td>';
                    }
                    
                    contenido += '</tr>';
                }
                
                if (data.data.length > 50) {
                    contenido += '<tr><td colspan="5" style="text-align:center; padding:10px;">... y ' + 
                        (data.data.length - 50) + ' más</td></tr>';
                }
                
                contenido += '</tbody></table>';
                contenido += '</div>';
            } else {
                contenido += '<p>No hay datos para mostrar en este período.</p>';
            }
            
            mostrarModalReporte(titulo, contenido, tipo, periodo);
        })
        .catch(function(error) {
            console.error('Error:', error);
            mostrarModalError('❌ Error al generar reporte: ' + error.message);
        });
}
    
    document.getElementById('generateReportBtn')?.addEventListener('click', function() {
        var tipo = document.getElementById('reportType').value;
        var periodo = document.getElementById('reportPeriod').value;
        generarReporte(tipo, periodo);
    });
    
    document.getElementById('exportReportBtn')?.addEventListener('click', function() {
        mostrarModalInfo('Preparando exportación...');
        setTimeout(function() {
            mostrarModalExito('Reporte exportado correctamente');
        }, 1500);
    });
    
// Reemplaza la sección 17 (LOGOUT) con:
document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    mostrarModalConfirmacion('¿Estás seguro de que deseas cerrar sesión?', function() {
        document.getElementById('logoutForm')?.submit();
    });
});
    
    // ============================================
    // 18. CERRAR MODALES
    // ============================================
    document.querySelectorAll('.modal-close, #modalClose, #confirmModalClose').forEach(function(btn) {
        if (btn) {
            btn.addEventListener('click', function() {
                var modal = this.closest('.modal');
                if (modal) modal.style.display = 'none';
            });
        }
    });
    
    document.querySelectorAll('.modal').forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // ============================================
    // 19. FUNCIÓN AUXILIAR CSRF
    // ============================================
    window.getCsrfToken = function() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf('csrftoken=') === 0) {
                return cookie.substring('csrftoken='.length, cookie.length);
            }
        }
        return '';
    };
    
// ============================================
// 20. FUNCIONES PARA MODALES MODERNOS
// ============================================
function mostrarModalReporte(titulo, contenido, tipo, periodo) {
    const modal = document.getElementById('reporteModal');
    const titleEl = document.getElementById('reporteModalTitle');
    const contentEl = document.getElementById('reporteModalContent');
    const closeBtn = document.getElementById('closeReporteModal');
    const cerrarBtn = document.getElementById('cerrarReporteBtn');
    const exportarBtn = document.getElementById('exportarReporteBtn');
    
    titleEl.textContent = titulo;
    contentEl.innerHTML = contenido;
    modal.style.display = 'flex';
    
    const cerrarModal = function() {
        modal.style.display = 'none';
    };
    
    closeBtn.onclick = cerrarModal;
    cerrarBtn.onclick = cerrarModal;
    
    exportarBtn.onclick = function() {
        exportarReporteComoExcel(tipo, periodo);
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) cerrarModal();
    };
}
function exportarReporteComoExcel(tipo, periodo) {
    mostrarModalInfo('Generando archivo Excel...');
    
    var url = '/api/exportar-reporte-excel/?tipo=' + tipo;
    if (periodo) {
        url += '&periodo=' + periodo;
    }
    
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                return response.json().then(function(err) {
                    throw new Error(err.error || 'Error al exportar');
                });
            }
            return response.blob();
        })
        .then(function(blob) {
            // Crear URL del blob
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_' + tipo + '_' + new Date().toISOString().split('T')[0] + '.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            mostrarModalExito('✅ Reporte exportado correctamente');
        })
        .catch(function(error) {
            console.error('Error:', error);
            mostrarModalError('❌ Error al exportar: ' + error.message);
        });
}

function mostrarModalConfirmacion(mensaje, onConfirm) {
    const modal = document.getElementById('confirmModalModerno');
    const messageEl = document.getElementById('confirmModalMessage');
    const closeBtn = document.getElementById('closeConfirmModal');
    const cancelBtn = document.getElementById('cancelConfirmBtn');
    const acceptBtn = document.getElementById('acceptConfirmBtn');
    
    messageEl.textContent = mensaje;
    modal.style.display = 'flex';
    
    const cerrarModal = function() {
        modal.style.display = 'none';
    };
    
    closeBtn.onclick = cerrarModal;
    cancelBtn.onclick = cerrarModal;
    
    acceptBtn.onclick = function() {
        cerrarModal();
        if (onConfirm) onConfirm();
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) cerrarModal();
    };
}

function mostrarModalExito(mensaje) {
    const modal = document.getElementById('successModalModerno');
    const messageEl = document.getElementById('successModalMessage');
    const closeBtn = document.getElementById('closeSuccessModal');
    const acceptBtn = document.getElementById('acceptSuccessBtn');
    
    messageEl.textContent = mensaje;
    modal.style.display = 'flex';
    
    const cerrarModal = function() {
        modal.style.display = 'none';
    };
    
    closeBtn.onclick = cerrarModal;
    acceptBtn.onclick = cerrarModal;
    
    setTimeout(cerrarModal, 3000);
    
    modal.onclick = function(e) {
        if (e.target === modal) cerrarModal();
    };
}

function mostrarModalError(mensaje) {
    const modal = document.getElementById('errorModalModerno');
    const messageEl = document.getElementById('errorModalMessage');
    const closeBtn = document.getElementById('closeErrorModal');
    const acceptBtn = document.getElementById('acceptErrorBtn');
    
    messageEl.textContent = mensaje;
    modal.style.display = 'flex';
    
    const cerrarModal = function() {
        modal.style.display = 'none';
    };
    
    closeBtn.onclick = cerrarModal;
    acceptBtn.onclick = cerrarModal;
    
    modal.onclick = function(e) {
        if (e.target === modal) cerrarModal();
    };
}

function mostrarModalInfo(mensaje) {
    alert(mensaje); // Fallback simple
}
    
    // ============================================
    // 21. CARGAR DATOS INICIALES
    // ============================================
    function cargarEstadisticas() {
        cargarTodosLosStocks().then(function(stocks) {
            if (!escuelaId || !stocks) return;
            
            var stocksEscuela = [];
            for (var i = 0; i < stocks.length; i++) {
                if (stocks[i].inventario_id == escuelaId) {
                    stocksEscuela.push(stocks[i]);
                }
            }
            
            document.getElementById('totalProducts').textContent = stocksEscuela.length;
            
            var totalStock = 0;
            for (var j = 0; j < stocksEscuela.length; j++) {
                totalStock += stocksEscuela[j].cantidad;
            }
            document.getElementById('inStockProducts').textContent = totalStock;
        });
    }
    
    cargarEstadisticas();
    cargarInventarioEscuela();
    cargarAlertasEscuela();
});