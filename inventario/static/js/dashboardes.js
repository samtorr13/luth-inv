document.addEventListener('DOMContentLoaded', function() {
    // Obtener información del usuario desde sessionStorage
    const userData = JSON.parse(sessionStorage.getItem('luth_user'));
    
    // SI NO HAY USUARIO LOGUEADO, redirigir al login
    if (!userData) {
        window.location.href = '/';
        return;
    }

    // SI EL USUARIO ES ADMINISTRADOR, redirigir al dashboard de admin
    if (userData.type === 'admin') {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Datos de inventario para cada escuela
    const schoolInventory = {
        'SCH001': { // Escuela Primaria Norte
            schoolName: 'Escuela Primaria Norte',
            products: [
                { id: 1, name: 'Cuerdas para Violín', category: 'Accesorios', quantity: 45, minQuantity: 100, location: 'Almacén A', status: 'low' },
                { id: 2, name: 'Flautas Dulces', category: 'Instrumentos de Viento', quantity: 120, minQuantity: 150, location: 'Almacén A', status: 'in-stock' },
                { id: 3, name: 'Cuatro Venezolano', category: 'Instrumentos de Cuerda', quantity: 15, minQuantity: 50, location: 'Almacén B', status: 'low' },
                { id: 4, name: 'Guitarras Acústicas', category: 'Instrumentos de Cuerda', quantity: 80, minQuantity: 100, location: 'Almacén A', status: 'in-stock' },
                { id: 5, name: 'Afinadores Digitales', category: 'Accesorios', quantity: 5, minQuantity: 30, location: 'Oficina', status: 'out-of-stock' },
                { id: 6, name: 'Atriles para Partituras', category: 'Accesorios', quantity: 25, minQuantity: 50, location: 'Almacén B', status: 'low' },
                { id: 7, name: 'Palillos para Batería', category: 'Percusión', quantity: 35, minQuantity: 40, location: 'Almacén A', status: 'in-stock' },
                { id: 8, name: 'Boquillas para Saxofón', category: 'Instrumentos de Viento', quantity: 12, minQuantity: 30, location: 'Almacén B', status: 'low' },
                { id: 9, name: 'Metrónomos', category: 'Accesorios', quantity: 60, minQuantity: 80, location: 'Almacén A', status: 'in-stock' },
                { id: 10, name: 'Violines', category: 'Instrumentos de Cuerda', quantity: 0, minQuantity: 15, location: 'Almacén B', status: 'out-of-stock' },
                { id: 11, name: 'Cuerdas para Guitarra', category: 'Accesorios', quantity: 85, minQuantity: 120, location: 'Almacén A', status: 'in-stock' },
                { id: 12, name: 'Tambores', category: 'Percusión', quantity: 22, minQuantity: 40, location: 'Almacén C', status: 'low' },
                { id: 13, name: 'Teclados Electrónicos', category: 'Instrumentos Electrónicos', quantity: 8, minQuantity: 20, location: 'Sala de Música', status: 'low' },
                { id: 14, name: 'Fundas para Instrumentos', category: 'Accesorios', quantity: 45, minQuantity: 60, location: 'Almacén A', status: 'in-stock' },
                { id: 15, name: 'Microfonos', category: 'Equipo de Sonido', quantity: 10, minQuantity: 25, location: 'Sala de Ensayo', status: 'low' }
            ],
            orders: [
                { id: 'ORD001', product: 'Cuerdas para Violín', quantity: 100, priority: 'alta', date: '2023-10-15', status: 'pendiente' },
                { id: 'ORD002', product: 'Afinadores Digitales', quantity: 50, priority: 'urgente', date: '2023-10-20', status: 'pendiente' },
                { id: 'ORD003', product: 'Violines', quantity: 10, priority: 'urgente', date: '2023-10-18', status: 'pendiente' }
            ],
            alerts: [
                { date: '2023-10-18', type: 'stock', product: 'Afinadores Digitales', message: 'Producto agotado', status: 'activa' },
                { date: '2023-10-17', type: 'stock', product: 'Cuerdas para Violín', message: 'Stock por debajo del mínimo', status: 'activa' },
                { date: '2023-10-15', type: 'stock', product: 'Cuatro Venezolano', message: 'Stock por debajo del mínimo', status: 'activa' },
                { date: '2023-10-14', type: 'stock', product: 'Violines', message: 'Producto agotado', status: 'activa' },
                { date: '2023-10-12', type: 'stock', product: 'Teclados Electrónicos', message: 'Stock crítico', status: 'activa' }
            ]
        },
        'SCH002': { // Escuela Secundaria Sur
            schoolName: 'Escuela Secundaria Sur',
            products: [
                { id: 1, name: 'Guitarras Acústicas', category: 'Instrumentos de Cuerda', quantity: 85, minQuantity: 150, location: 'Almacén Principal', status: 'in-stock' },
                { id: 2, name: 'Flautas Dulces', category: 'Instrumentos de Viento', quantity: 200, minQuantity: 250, location: 'Almacén Principal', status: 'in-stock' },
                { id: 3, name: 'Cuerdas para Guitarra', category: 'Accesorios', quantity: 40, minQuantity: 80, location: 'Almacén Secundario', status: 'low' },
                { id: 4, name: 'Metrónomos', category: 'Accesorios', quantity: 25, minQuantity: 50, location: 'Oficina', status: 'low' },
                { id: 5, name: 'Baterías Completas', category: 'Percusión', quantity: 6, minQuantity: 12, location: 'Sala de Percusión', status: 'low' }
            ],
            orders: [],
            alerts: []
        },
        'SCH003': { // Colegio Centro
            schoolName: 'Colegio Centro',
            products: [
                { id: 1, name: 'Violines', category: 'Instrumentos de Cuerda', quantity: 30, minQuantity: 120, location: 'Almacén A', status: 'low' },
                { id: 2, name: 'Cuatro Venezolano', category: 'Instrumentos de Cuerda', quantity: 90, minQuantity: 180, location: 'Almacén A', status: 'low' },
                { id: 3, name: 'Flautas Dulces', category: 'Instrumentos de Viento', quantity: 10, minQuantity: 40, location: 'Almacén B', status: 'low' },
                { id: 4, name: 'Atriles para Partituras', category: 'Accesorios', quantity: 15, minQuantity: 30, location: 'Oficina', status: 'low' },
                { id: 5, name: 'Amplificadores', category: 'Equipo de Sonido', quantity: 7, minQuantity: 15, location: 'Sala de Ensayo', status: 'low' }
            ],
            orders: [],
            alerts: []
        }
    };
    
    // Mostrar información del usuario
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userRole').textContent = userData.role;
    document.getElementById('schoolBadge').textContent = userData.name;
    document.getElementById('welcomeTitle').textContent = `Bienvenido, ${userData.name}`;
    
    // Crear avatar con iniciales
    const initials = userData.name.charAt(0);
    document.getElementById('userAvatar').textContent = initials;
    
    // Mostrar fecha actual
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('es-ES', options);
    
    // Cargar datos de la escuela
    const schoolData = schoolInventory[userData.schoolId];
    if (!schoolData) {
        alert('Error: No se encontraron datos para esta escuela.');
        return;
    }
    
    // ===== FUNCIONES PRINCIPALES =====
    
    // Función para calcular estadísticas
    function calculateStats() {
        const products = schoolData.products;
        const total = products.length;
        const inStock = products.filter(p => p.status === 'in-stock').length;
        const lowStock = products.filter(p => p.status === 'low').length;
        const outOfStock = products.filter(p => p.status === 'out-of-stock').length;
        
        document.getElementById('totalProducts').textContent = total;
        document.getElementById('inStockProducts').textContent = inStock;
        document.getElementById('lowStockProducts').textContent = lowStock;
        document.getElementById('outOfStockProducts').textContent = outOfStock;
    }
    
    // Función para mostrar alertas
    function displayAlerts() {
        const alertsList = document.getElementById('alertsList');
        alertsList.innerHTML = '';
        
        if (schoolData.alerts.length === 0) {
            document.getElementById('alertsContainer').style.display = 'none';
            return;
        }
        
        schoolData.alerts.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = 'alert-item';
            
            alertItem.innerHTML = `
                <div class="alert-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="alert-text">
                    <strong>${alert.product}</strong>: ${alert.message}
                </div>
                <button class="alert-action" data-product="${alert.product}">
                    Solicitar
                </button>
            `;
            
            alertsList.appendChild(alertItem);
        });
        
        // Agregar event listeners a los botones de solicitud
        document.querySelectorAll('.alert-action').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.getAttribute('data-product');
                openOrderForm(productName);
            });
        });
    }
    
    // Función para mostrar productos con bajo stock
    function displayLowStockProducts() {
        const tableBody = document.getElementById('lowStockTableBody');
        tableBody.innerHTML = '';
        
        const lowStockProducts = schoolData.products.filter(p => p.status === 'low' || p.status === 'out-of-stock');
        
        if (lowStockProducts.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6" style="text-align: center; padding: 20px; color: #7f8c8d;">No hay productos con bajo stock</td>`;
            tableBody.appendChild(row);
            return;
        }
        
        lowStockProducts.forEach(product => {
            const row = document.createElement('tr');
            
            let statusClass = 'low-stock';
            let statusText = 'Bajo Stock';
            if (product.status === 'out-of-stock') {
                statusClass = 'out-of-stock';
                statusText = 'Agotado';
            }
            
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>${product.minQuantity}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="action-btn request" data-id="${product.id}">Solicitar</button>
                    <button class="action-btn alert" data-id="${product.id}">Alertar</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.action-btn.request').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = schoolData.products.find(p => p.id === productId);
                if (product) {
                    openOrderForm(product.name);
                }
            });
        });
        
        document.querySelectorAll('.action-btn.alert').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = schoolData.products.find(p => p.id === productId);
                if (product) {
                    openAlertModal(product);
                }
            });
        });
    }
    
    // Función para mostrar todos los productos
    function displayAllProducts() {
        const tableBody = document.getElementById('inventoryTableBody');
        tableBody.innerHTML = '';
        
        schoolData.products.forEach(product => {
            const row = document.createElement('tr');
            
            let statusClass, statusText;
            switch(product.status) {
                case 'in-stock':
                    statusClass = 'in-stock';
                    statusText = 'En Stock';
                    break;
                case 'low':
                    statusClass = 'low-stock';
                    statusText = 'Bajo Stock';
                    break;
                case 'out-of-stock':
                    statusClass = 'out-of-stock';
                    statusText = 'Agotado';
                    break;
            }
            
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>${product.location}</td>
                <td>${product.minQuantity}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="action-btn request" data-id="${product.id}">Solicitar</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Agregar event listeners a los botones de solicitud
        document.querySelectorAll('#inventoryTableBody .action-btn.request').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = schoolData.products.find(p => p.id === productId);
                if (product) {
                    openOrderForm(product.name);
                }
            });
        });
    }
    
    // Función para mostrar pedidos pendientes
    function displayPendingOrders() {
        const tableBody = document.getElementById('pendingOrdersTableBody');
        tableBody.innerHTML = '';
        
        if (schoolData.orders.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6" style="text-align: center; padding: 20px; color: #7f8c8d;">No hay pedidos pendientes</td>`;
            tableBody.appendChild(row);
            return;
        }
        
        schoolData.orders.forEach(order => {
            const row = document.createElement('tr');
            
            let priorityClass = '';
            switch(order.priority) {
                case 'alta':
                    priorityClass = 'style="color: #e74c3c; font-weight: 600;"';
                    break;
                case 'urgente':
                    priorityClass = 'style="color: #c0392b; font-weight: 700;"';
                    break;
                case 'media':
                    priorityClass = 'style="color: #f39c12;"';
                    break;
            }
            
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
                <td ${priorityClass}>${order.priority.toUpperCase()}</td>
                <td>${order.date}</td>
                <td><span class="status pendiente">Pendiente</span></td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Función para abrir formulario de pedido
    function openOrderForm(productName = '') {
        // Cambiar a la sección de pedidos
        switchSection('pedidos');
        
        // Mostrar formulario
        document.getElementById('orderForm').style.display = 'block';
        document.getElementById('newOrderBtn').style.display = 'none';
        
        // Rellenar producto si se especifica
        if (productName) {
            const productSelect = document.getElementById('orderProduct');
            for (let i = 0; i < productSelect.options.length; i++) {
                if (productSelect.options[i].text === productName) {
                    productSelect.selectedIndex = i;
                    break;
                }
            }
        }
        
        // Establecer fecha mínima para "necesario para"
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        document.getElementById('orderNeededBy').min = tomorrowStr;
        
        // Establecer fecha por defecto (7 días a partir de hoy)
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        const nextWeekStr = nextWeek.toISOString().split('T')[0];
        document.getElementById('orderNeededBy').value = nextWeekStr;
    }
    
    // Función para abrir modal de alerta
    function openAlertModal(product) {
        const modal = document.getElementById('alertModal');
        const modalContent = document.getElementById('modalContent');
        
        modalContent.innerHTML = `
            <p>Crear alerta manual para: <strong>${product.name}</strong></p>
            <div class="form-group" style="margin-top: 15px;">
                <label for="alertMessage">Mensaje de la alerta</label>
                <textarea id="alertMessage" rows="3" placeholder="Describe la razón de esta alerta...">Stock crítico de ${product.name}. Cantidad actual: ${product.quantity}, Mínimo requerido: ${product.minQuantity}</textarea>
            </div>
            <div class="form-group" style="margin-top: 15px;">
                <label for="alertPriority">Prioridad</label>
                <select id="alertPriority">
                    <option value="media">Media</option>
                    <option value="alta" selected>Alta</option>
                    <option value="urgente">Urgente</option>
                </select>
            </div>
            <div class="form-buttons" style="margin-top: 20px;">
                <button type="button" class="btn-cancel" id="cancelAlertBtn">Cancelar</button>
                <button type="button" class="btn-submit" id="submitAlertBtn">Crear Alerta</button>
            </div>
        `;
        
        modal.style.display = 'flex';
        
        // Event listeners para botones del modal
        document.getElementById('cancelAlertBtn').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        document.getElementById('submitAlertBtn').addEventListener('click', () => {
            const message = document.getElementById('alertMessage').value;
            const priority = document.getElementById('alertPriority').value;
            
            // Agregar alerta
            const newAlert = {
                date: new Date().toISOString().split('T')[0],
                type: 'manual',
                product: product.name,
                message: message,
                status: 'activa'
            };
            
            schoolData.alerts.push(newAlert);
            
            // Mostrar mensaje de éxito
            showAlert('success', `Alerta creada para ${product.name}. El administrador ha sido notificado.`);
            
            // Actualizar pantalla
            displayAlerts();
            
            // Cerrar modal
            modal.style.display = 'none';
        });
    }
    
    // Función para cambiar de sección
    function switchSection(sectionId) {
        // Ocultar todas las secciones
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar sección seleccionada
        document.getElementById(`section-${sectionId}`).classList.add('active');
        
        // Actualizar menú activo
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Cargar datos específicos de la sección
        switch(sectionId) {
            case 'inventario':
                displayAllProducts();
                break;
            case 'pedidos':
                displayPendingOrders();
                populateProductSelect();
                break;
            case 'alertas':
                displayAlertsHistory();
                displayAlertThresholds();
                break;
        }
    }
    
    // Función para poblar select de productos en formulario de pedido
    function populateProductSelect() {
        const select = document.getElementById('orderProduct');
        select.innerHTML = '<option value="">Seleccionar producto...</option>';
        
        schoolData.products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            select.appendChild(option);
        });
    }
    
    // Función para mostrar historial de alertas
    function displayAlertsHistory() {
        const tableBody = document.getElementById('alertsHistoryTableBody');
        tableBody.innerHTML = '';
        
        // Combinar alertas actuales con historial (en una app real esto vendría de una BD)
        const allAlerts = [
            ...schoolData.alerts,
            { date: '2023-10-10', type: 'stock', product: 'Atriles para Partituras', message: 'Stock por debajo del mínimo', status: 'resuelta' },
            { date: '2023-10-05', type: 'stock', product: 'Boquillas para Saxofón', message: 'Stock por debajo del mínimo', status: 'resuelta' },
            { date: '2023-09-28', type: 'manual', product: 'Guitarras Acústicas', message: 'Necesidad especial para concierto', status: 'resuelta' },
            { date: '2023-09-25', type: 'stock', product: 'Cuerdas para Guitarra', message: 'Stock por debajo del mínimo', status: 'resuelta' }
        ];
        
        allAlerts.forEach(alert => {
            const row = document.createElement('tr');
            
            let statusClass = 'pendiente';
            if (alert.status === 'resuelta') {
                statusClass = 'aprobado';
            }
            
            row.innerHTML = `
                <td>${alert.date}</td>
                <td>${alert.type === 'stock' ? 'Stock' : 'Manual'}</td>
                <td>${alert.product}</td>
                <td>${alert.message}</td>
                <td><span class="status ${statusClass}">${alert.status}</span></td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Función para mostrar umbrales de alerta
    function displayAlertThresholds() {
        const list = document.getElementById('currentThresholds');
        list.innerHTML = '';
        
        // Umbrales por defecto (en una app real esto sería configurable)
        const thresholds = [
            'Instrumentos de Cuerda: 25% por encima del mínimo',
            'Instrumentos de Viento: 20% por encima del mínimo',
            'Percusión: 30% por encima del mínimo',
            'Accesorios: 15% por encima del mínimo',
            'Equipo de Sonido: 20% por encima del mínimo'
        ];
        
        thresholds.forEach(threshold => {
            const li = document.createElement('li');
            li.textContent = threshold;
            list.appendChild(li);
        });
    }
    
    // ===== FUNCIONES DE UTILIDAD =====
    
    function showAlert(type, message) {
        // Crear alerta temporal
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'}"></i>
            <div>${message}</div>
        `;
        
        // Insertar al principio del contenido
        const content = document.querySelector('.dashboard-content');
        content.insertBefore(alertDiv, content.firstChild);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
    
    function showModal(title, content) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalContent').innerHTML = content;
        document.getElementById('detailModal').style.display = 'flex';
    }
    
    function showConfirmModal(title, message, callback) {
        document.getElementById('confirmModalTitle').textContent = title;
        document.getElementById('confirmModalContent').textContent = message;
        document.getElementById('confirmModal').style.display = 'flex';
        
        // Configurar botón de confirmación
        const confirmBtn = document.getElementById('confirmActionBtn');
        confirmBtn.onclick = function() {
            document.getElementById('confirmModal').style.display = 'none';
            if (callback) callback();
        };
    }
    
    // ===== INICIALIZACIÓN =====
    
    // Inicializar datos
    calculateStats();
    displayAlerts();
    displayLowStockProducts();
    displayAllProducts();
    displayPendingOrders();
    populateProductSelect();
    displayAlertThresholds();
    
    // FUNCIÓN DE LOGOUT (igual que en dashboard)
    document.getElementById('logoutBtn').addEventListener('click', function() {
        showConfirmModal('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', () => {
            sessionStorage.removeItem('luth_user');
            window.location.href = '/';
        });
    });
    
    // Manejar clicks en el menú lateral
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    
    // Botón para solicitar todos los productos con bajo stock
    document.getElementById('requestAllBtn').addEventListener('click', function() {
        showConfirmModal('Solicitar Todos', '¿Estás seguro de que deseas solicitar todos los productos con bajo stock? Esto creará múltiples pedidos.', () => {
            showAlert('success', 'Función en desarrollo. En una aplicación completa, se crearían pedidos para todos los productos con bajo stock.');
        });
    });
    
    // Botón para nuevo pedido
    document.getElementById('newOrderBtn').addEventListener('click', function() {
        openOrderForm();
    });
    
    // Botón para cancelar pedido
    document.getElementById('cancelOrderBtn').addEventListener('click', function() {
        document.getElementById('orderForm').style.display = 'none';
        document.getElementById('newOrderBtn').style.display = 'block';
    });
    
    // Formulario de pedido
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = document.getElementById('orderProduct').value;
        const quantity = document.getElementById('orderQuantity').value;
        const priority = document.getElementById('orderPriority').value;
        const neededBy = document.getElementById('orderNeededBy').value;
        const notes = document.getElementById('orderNotes').value;
        
        const product = schoolData.products.find(p => p.id == productId);
        
        if (!product) {
            showAlert('error', 'Por favor selecciona un producto válido.');
            return;
        }
        
        // Crear nuevo pedido
        const newOrder = {
            id: 'ORD' + (schoolData.orders.length + 1).toString().padStart(3, '0'),
            product: product.name,
            quantity: parseInt(quantity),
            priority: priority,
            date: new Date().toISOString().split('T')[0],
            status: 'pendiente'
        };
        
        schoolData.orders.push(newOrder);
        
        // Mostrar mensaje de éxito
        showAlert('success', `Pedido ${newOrder.id} creado exitosamente para ${product.name}. El administrador ha sido notificado.`);
        
        // Resetear formulario
        this.reset();
        this.style.display = 'none';
        document.getElementById('newOrderBtn').style.display = 'block';
        
        // Actualizar lista de pedidos
        displayPendingOrders();
    });
    
    // Botón para exportar inventario
    document.getElementById('exportInventoryBtn').addEventListener('click', function() {
        showAlert('success', 'Función en desarrollo. En una aplicación completa, se generaría un archivo CSV/PDF con el inventario.');
    });
    
    // Botón para actualizar inventario
    document.getElementById('refreshInventoryBtn').addEventListener('click', function() {
        displayAllProducts();
        calculateStats();
        displayLowStockProducts();
        showAlert('success', 'Inventario actualizado.');
    });
    
    // Búsqueda en inventario
    document.getElementById('searchInventory').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#inventoryTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Botón para ver historial de pedidos
    document.getElementById('showOrderHistoryBtn').addEventListener('click', function() {
        showAlert('info', 'Función en desarrollo. En una aplicación completa, se mostraría el historial completo de pedidos.');
    });
    
    // Botón para configurar alertas
    document.getElementById('configureAlertsBtn').addEventListener('click', function() {
        showAlert('info', 'Función en desarrollo. En una aplicación completa, se abriría un formulario para configurar umbrales de alerta.');
    });
    
    // Botón para limpiar historial de alertas
    document.getElementById('clearAlertsBtn').addEventListener('click', function() {
        showConfirmModal('Limpiar Historial', '¿Estás seguro de que deseas limpiar el historial de alertas?', () => {
            showAlert('success', 'Función en desarrollo. En una aplicación completa, se eliminaría el historial de alertas resueltas.');
        });
    });
    
    // Botón para generar reporte
    document.getElementById('generateReportBtn').addEventListener('click', function() {
        const reportType = document.getElementById('reportType').value;
        const reportPeriod = document.getElementById('reportPeriod').value;
        
        showAlert('success', `Generando reporte de tipo "${reportType}" para el período "${reportPeriod}". En una aplicación completa, se descargaría un archivo PDF.`);
    });
    
    // Cerrar modales
    document.getElementById('modalClose').addEventListener('click', function() {
        document.getElementById('detailModal').style.display = 'none';
    });
    
    document.getElementById('confirmModalClose').addEventListener('click', function() {
        document.getElementById('confirmModal').style.display = 'none';
    });
    
    document.getElementById('confirmCancelBtn').addEventListener('click', function() {
        document.getElementById('confirmModal').style.display = 'none';
    });
    
    // Cerrar modales haciendo clic fuera
    document.getElementById('detailModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
    
    document.getElementById('confirmModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});