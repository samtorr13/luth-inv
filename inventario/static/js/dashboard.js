document.addEventListener('DOMContentLoaded', function() {
   
    


    
    const systemData = {
        schools: [
            {
                id: 'SCH001',
                name: 'Escuela Primaria Norte',
                address: 'Calle Principal 123, Ciudad Norte',
                phone: '+1 234 567 8901',
                contactName: 'María González',
                contactEmail: 'maria.gonzalez@escuelanorte.edu',
                users: 4,
                products: 325,
                status: 'activa'
            },
            {
                id: 'SCH002',
                name: 'Escuela Secundaria Sur',
                address: 'Avenida Central 456, Ciudad Sur',
                phone: '+1 234 567 8902',
                contactName: 'Carlos Rodríguez',
                contactEmail: 'carlos.rodriguez@escuelasur.edu',
                users: 5,
                products: 412,
                status: 'activa'
            },
            {
                id: 'SCH003',
                name: 'Colegio Centro',
                address: 'Plaza Mayor 789, Centro Ciudad',
                phone: '+1 234 567 8903',
                contactName: 'Ana Martínez',
                contactEmail: 'ana.martinez@colegiocentro.edu',
                users: 3,
                products: 289,
                status: 'activa'
            }
        ],
        inventory: [
            { id: 1, name: 'Cuerdas para Violín', category: 'Accesorios', schoolId: 'SCH001', quantity: 45, minQuantity: 100, location: 'Almacén A', status: 'low' },
            { id: 2, name: 'Flautas Dulces', category: 'Instrumentos de Viento', schoolId: 'SCH001', quantity: 120, minQuantity: 150, location: 'Almacén A', status: 'in-stock' },
            { id: 3, name: 'Cuatro Venezolano', category: 'Instrumentos de Cuerda', schoolId: 'SCH001', quantity: 15, minQuantity: 50, location: 'Almacén B', status: 'low' },
            { id: 4, name: 'Guitarras Acústicas', category: 'Instrumentos de Cuerda', schoolId: 'SCH001', quantity: 80, minQuantity: 100, location: 'Almacén A', status: 'in-stock' },
            { id: 5, name: 'Afinadores Digitales', category: 'Accesorios', schoolId: 'SCH001', quantity: 5, minQuantity: 30, location: 'Oficina', status: 'out-of-stock' },
            { id: 6, name: 'Violines', category: 'Instrumentos de Cuerda', schoolId: 'SCH002', quantity: 25, minQuantity: 30, location: 'Sala de Música', status: 'in-stock' },
            { id: 7, name: 'Teclados Electrónicos', category: 'Instrumentos Electrónicos', schoolId: 'SCH002', quantity: 8, minQuantity: 10, location: 'Almacén A', status: 'low' },
            { id: 8, name: 'Tambores', category: 'Percusión', schoolId: 'SCH002', quantity: 150, minQuantity: 200, location: 'Almacén Principal', status: 'in-stock' },
            { id: 9, name: 'Atriles para Partituras', category: 'Accesorios', schoolId: 'SCH003', quantity: 45, minQuantity: 60, location: 'Almacén B', status: 'low' },
            { id: 10, name: 'Boquillas para Saxofón', category: 'Instrumentos de Viento', schoolId: 'SCH003', quantity: 12, minQuantity: 15, location: 'Almacén A', status: 'in-stock' },
            { id: 11, name: 'Palillos para Batería', category: 'Percusión', schoolId: 'SCH001', quantity: 35, minQuantity: 40, location: 'Almacén A', status: 'in-stock' },
            { id: 12, name: 'Metrónomos', category: 'Accesorios', schoolId: 'SCH002', quantity: 60, minQuantity: 80, location: 'Almacén A', status: 'in-stock' },
            { id: 13, name: 'Cuerdas para Guitarra', category: 'Accesorios', schoolId: 'SCH003', quantity: 85, minQuantity: 120, location: 'Almacén A', status: 'in-stock' },
            { id: 14, name: 'Fundas para Instrumentos', category: 'Accesorios', schoolId: 'SCH001', quantity: 45, minQuantity: 60, location: 'Almacén A', status: 'in-stock' },
            { id: 15, name: 'Micrófonos', category: 'Equipo de Sonido', schoolId: 'SCH002', quantity: 10, minQuantity: 25, location: 'Sala de Ensayo', status: 'low' },
            { id: 16, name: 'Amplificadores', category: 'Equipo de Sonido', schoolId: 'SCH003', quantity: 7, minQuantity: 15, location: 'Sala de Ensayo', status: 'low' },
            { id: 17, name: 'Baterías Completas', category: 'Percusión', schoolId: 'SCH002', quantity: 6, minQuantity: 12, location: 'Sala de Percusión', status: 'low' },
            { id: 18, name: 'Saxofones', category: 'Instrumentos de Viento', schoolId: 'SCH003', quantity: 9, minQuantity: 20, location: 'Almacén A', status: 'low' },
            { id: 19, name: 'Trompetas', category: 'Instrumentos de Viento', schoolId: 'SCH001', quantity: 14, minQuantity: 25, location: 'Almacén B', status: 'in-stock' },
            { id: 20, name: 'Xilófonos', category: 'Percusión', schoolId: 'SCH002', quantity: 22, minQuantity: 35, location: 'Sala de Música', status: 'in-stock' }
        ],
        categories: [
            { id: 1, name: 'Instrumentos de Cuerda', code: 'INSTR-CUERDA', description: 'Violines, guitarras, cuatros, etc.', products: 156, status: 'activa' },
            { id: 2, name: 'Instrumentos de Viento', code: 'INSTR-VIENTO', description: 'Flautas, saxofones, trompetas, etc.', products: 89, status: 'activa' },
            { id: 3, name: 'Percusión', code: 'PERC', description: 'Tambores, baterías, xilófonos, etc.', products: 45, status: 'activa' },
            { id: 4, name: 'Accesorios', code: 'ACC', description: 'Cuerdas, afinadores, metrónomos, atriles, etc.', products: 67, status: 'activa' },
            { id: 5, name: 'Equipo de Sonido', code: 'SONIDO', description: 'Micrófonos, amplificadores, etc.', products: 23, status: 'activa' },
            { id: 6, name: 'Instrumentos Electrónicos', code: 'ELECTRON', description: 'Teclados electrónicos, sintetizadores', products: 15, status: 'activa' }
        ],
        orders: [
            { id: 'ORD001', schoolId: 'SCH001', product: 'Cuerdas para Violín', quantity: 100, priority: 'alta', date: '2023-10-15', status: 'pendiente', notes: 'Necesarios para clase de orquesta' },
            { id: 'ORD002', schoolId: 'SCH001', product: 'Afinadores Digitales', quantity: 50, priority: 'urgente', date: '2023-10-20', status: 'pendiente', notes: 'Para concierto de fin de año' },
            { id: 'ORD003', schoolId: 'SCH002', product: 'Teclados Electrónicos', quantity: 3, priority: 'media', date: '2023-10-18', status: 'aprobado', notes: 'Para nuevas aulas de música' },
            { id: 'ORD004', schoolId: 'SCH003', product: 'Atriles para Partituras', quantity: 20, priority: 'alta', date: '2023-10-22', status: 'pendiente', notes: 'Ampliación de banda escolar' },
            { id: 'ORD005', schoolId: 'SCH002', product: 'Tambores', quantity: 50, priority: 'media', date: '2023-10-25', status: 'rechazado', notes: 'Presupuesto no disponible' },
            { id: 'ORD006', schoolId: 'SCH003', product: 'Violines', quantity: 10, priority: 'urgente', date: '2023-10-18', status: 'pendiente', notes: 'Clase de música especial' },
            { id: 'ORD007', schoolId: 'SCH001', product: 'Boquillas para Saxofón', quantity: 25, priority: 'alta', date: '2023-10-24', status: 'aprobado', notes: 'Reposición por desgaste' }
        ],
        users: [
            { id: 1, name: 'Administrador Sistema', email: 'admin@luthinv.com', role: 'admin', schoolId: null, status: 'activo', lastAccess: '2023-10-26 14:30' },
            { id: 2, name: 'María González', email: 'maria.gonzalez@escuelanorte.edu', role: 'school-admin', schoolId: 'SCH001', status: 'activo', lastAccess: '2023-10-26 10:15' },
            { id: 3, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@escuelasur.edu', role: 'school-admin', schoolId: 'SCH002', status: 'activo', lastAccess: '2023-10-25 16:45' },
            { id: 4, name: 'Ana Martínez', email: 'ana.martinez@colegiocentro.edu', role: 'school-admin', schoolId: 'SCH003', status: 'activo', lastAccess: '2023-10-26 09:20' },
            { id: 5, name: 'Pedro Sánchez', email: 'pedro.sanchez@escuelanorte.edu', role: 'school-user', schoolId: 'SCH001', status: 'activo', lastAccess: '2023-10-24 11:30' }
        ],
        reports: [
            { id: 'REP001', type: 'inventario', period: 'mes', schoolId: null, date: '2023-10-01' },
            { id: 'REP002', type: 'consumo', period: 'trimestre', schoolId: 'SCH001', date: '2023-10-15' },
            { id: 'REP003', type: 'pedidos', period: 'mes', schoolId: null, date: '2023-10-20' },
            { id: 'REP004', type: 'alertas', period: 'semestre', schoolId: null, date: '2023-10-25' }
        ]
    };
    
    // Variables globales
    let currentProductId = null;
    let currentCategoryId = null;
    let currentUserId = null;
    let currentSchoolId = null;
    let currentOrderId = null;
    
    // Mostrar información del usuario
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userRole').textContent = userData.role;
    
    // Crear avatar con iniciales
    const initials = userData.name.charAt(0);
    document.getElementById('userAvatar').textContent = initials;
    
    // Mostrar fecha actual
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('es-ES', options);
    
    // Inicializar todas las secciones
    initDashboard();
    initInventory();
    initCategories();
    initOrders();
    initReports();
    initUsers();
    initSchools();
    initSettings();
    
    // ===== FUNCIONALIDADES GENERALES =====
    
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
        
        // Actualizar título
        document.querySelector('.content-header h2').textContent = getSectionTitle(sectionId);
    }
    
    function getSectionTitle(sectionId) {
        const titles = {
            'dashboard': 'Resumen General del Sistema',
            'inventario': 'Gestión de Inventario',
            'categorias': 'Gestión de Categorías',
            'pedidos': 'Gestión de Pedidos',
            'reportes': 'Reportes e Informes',
            'usuarios': 'Gestión de Usuarios',
            'escuelas': 'Gestión de Escuelas',
            'configuracion': 'Configuración del Sistema'
        };
        return titles[sectionId] || 'Dashboard';
    }
    
    // Manejar clicks en el menú lateral
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    
    // FUNCIÓN DE LOGOUT
    document.getElementById('logoutBtn').addEventListener('click', function() {
        showConfirmModal('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', () => {
            sessionStorage.removeItem('luth_user');
            window.location.href = '/';
        });
    });
    
    // ===== DASHBOARD =====
    
    function initDashboard() {
        // Calcular estadísticas
        updateDashboardStats();
        
        // Mostrar alertas
        displayDashboardAlerts();
        
        // Mostrar pedidos pendientes
        displayPendingOrders();
        
        // Event listeners
        document.getElementById('markAllReadBtn').addEventListener('click', function() {
            showAlert('success', 'Todas las alertas han sido marcadas como leídas.');
            document.getElementById('alertsList').innerHTML = '<p style="text-align: center; padding: 20px; color: #7f8c8d;">No hay alertas pendientes.</p>';
        });
        
        document.getElementById('viewAllOrdersBtn').addEventListener('click', function() {
            switchSection('pedidos');
        });
    }
    
    function updateDashboardStats() {
        // Estas estadísticas se calcularían de la base de datos real
        document.getElementById('totalSchools').textContent = systemData.schools.length;
        document.getElementById('totalProducts').textContent = systemData.inventory.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('pendingOrders').textContent = systemData.orders.filter(o => o.status === 'pendiente').length;
        document.getElementById('criticalAlerts').textContent = systemData.inventory.filter(i => i.status === 'out-of-stock').length;
    }
    
    function displayDashboardAlerts() {
        const alertsList = document.getElementById('alertsList');
        alertsList.innerHTML = '';
        
        const criticalProducts = systemData.inventory.filter(p => p.status === 'out-of-stock');
        const lowStockProducts = systemData.inventory.filter(p => p.status === 'low');
        const pendingOrders = systemData.orders.filter(o => o.status === 'pendiente');
        
        if (criticalProducts.length === 0 && lowStockProducts.length === 0 && pendingOrders.length === 0) {
            alertsList.innerHTML = '<p style="text-align: center; padding: 20px; color: #7f8c8d;">No hay alertas pendientes.</p>';
            return;
        }
        
        // Alertas de productos agotados
        criticalProducts.forEach(product => {
            const school = systemData.schools.find(s => s.id === product.schoolId);
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert error';
            alertDiv.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>${product.name}</strong> está agotado en ${school?.name || 'Escuela desconocida'}
                </div>
            `;
            alertsList.appendChild(alertDiv);
        });
        
        // Alertas de bajo stock
        lowStockProducts.slice(0, 3).forEach(product => {
            const school = systemData.schools.find(s => s.id === product.schoolId);
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert warning';
            alertDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>${product.name}</strong> tiene bajo stock (${product.quantity}/${product.minQuantity}) en ${school?.name || 'Escuela desconocida'}
                </div>
            `;
            alertsList.appendChild(alertDiv);
        });
        
        // Alertas de pedidos pendientes
        pendingOrders.slice(0, 2).forEach(order => {
            const school = systemData.schools.find(s => s.id === order.schoolId);
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert warning';
            alertDiv.innerHTML = `
                <i class="fas fa-shopping-cart"></i>
                <div>
                    Pedido <strong>${order.id}</strong> pendiente de ${school?.name || 'Escuela desconocida'} (${order.product})
                </div>
            `;
            alertsList.appendChild(alertDiv);
        });
    }
    
    function displayPendingOrders() {
        const tableBody = document.getElementById('pendingOrdersTableBody');
        tableBody.innerHTML = '';
        
        const pendingOrders = systemData.orders.filter(o => o.status === 'pendiente');
        
        if (pendingOrders.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 20px; color: #7f8c8d;">
                        No hay pedidos pendientes de aprobación.
                    </td>
                </tr>
            `;
            return;
        }
        
        pendingOrders.forEach(order => {
            const school = systemData.schools.find(s => s.id === order.schoolId);
            const row = document.createElement('tr');
            
            let priorityClass = '';
            let priorityText = order.priority;
            switch(order.priority) {
                case 'urgente':
                    priorityClass = 'style="color: #c0392b; font-weight: 700;"';
                    priorityText = 'URGENTE';
                    break;
                case 'alta':
                    priorityClass = 'style="color: #e74c3c; font-weight: 600;"';
                    priorityText = 'ALTA';
                    break;
                case 'media':
                    priorityClass = 'style="color: #f39c12;"';
                    priorityText = 'MEDIA';
                    break;
                case 'baja':
                    priorityClass = 'style="color: #3498db;"';
                    priorityText = 'BAJA';
                    break;
            }
            
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${school?.name || 'Escuela desconocida'}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
                <td ${priorityClass}>${priorityText}</td>
                <td>${order.date}</td>
                <td>
                    <button class="action-btn approve" data-id="${order.id}">Aprobar</button>
                    <button class="action-btn reject" data-id="${order.id}">Rechazar</button>
                    <button class="action-btn view" data-id="${order.id}">Ver</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Event listeners para botones de pedidos
        document.querySelectorAll('#pendingOrdersTableBody .action-btn.approve').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.getAttribute('data-id');
                approveOrder(orderId);
            });
        });
        
        document.querySelectorAll('#pendingOrdersTableBody .action-btn.reject').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.getAttribute('data-id');
                rejectOrder(orderId);
            });
        });
        
        document.querySelectorAll('#pendingOrdersTableBody .action-btn.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.getAttribute('data-id');
                viewOrderDetails(orderId);
            });
        });
    }
    
    function approveOrder(orderId) {
        showConfirmModal('Aprobar Pedido', '¿Estás seguro de aprobar este pedido?', () => {
            const order = systemData.orders.find(o => o.id === orderId);
            if (order) {
                order.status = 'aprobado';
                showAlert('success', `Pedido ${orderId} aprobado correctamente.`);
                displayPendingOrders();
                updateDashboardStats();
            }
        });
    }
    
    function rejectOrder(orderId) {
        showConfirmModal('Rechazar Pedido', '¿Estás seguro de rechazar este pedido?', () => {
            const order = systemData.orders.find(o => o.id === orderId);
            if (order) {
                order.status = 'rechazado';
                showAlert('success', `Pedido ${orderId} rechazado.`);
                displayPendingOrders();
                updateDashboardStats();
            }
        });
    }
    
    function viewOrderDetails(orderId) {
        const order = systemData.orders.find(o => o.id === orderId);
        if (!order) return;
        
        const school = systemData.schools.find(s => s.id === order.schoolId);
        
        const modalContent = `
            <h4>Detalles del Pedido: ${orderId}</h4>
            <p><strong>Escuela:</strong> ${school?.name || 'Desconocida'}</p>
            <p><strong>Producto:</strong> ${order.product}</p>
            <p><strong>Cantidad:</strong> ${order.quantity}</p>
            <p><strong>Prioridad:</strong> ${order.priority}</p>
            <p><strong>Fecha Solicitud:</strong> ${order.date}</p>
            <p><strong>Estado:</strong> <span class="status ${order.status}">${order.status.toUpperCase()}</span></p>
            <p><strong>Notas:</strong> ${order.notes || 'Sin notas'}</p>
        `;
        
        showModal('Detalles del Pedido', modalContent);
    }
    
    // ===== INVENTARIO =====
    
    function initInventory() {
        // Mostrar inventario
        displayInventory();
        
        // Event listeners
        document.getElementById('addProductBtn').addEventListener('click', function() {
            showProductForm();
        });
        
        document.getElementById('cancelProductBtn').addEventListener('click', function() {
            hideProductForm();
        });
        
        document.getElementById('exportInventoryBtn').addEventListener('click', function() {
            showAlert('success', 'Inventario exportado correctamente (simulado).');
        });
        
        // Filtros
        document.getElementById('searchInventory').addEventListener('input', function() {
            filterInventory();
        });
        
        document.getElementById('filterCategory').addEventListener('change', function() {
            filterInventory();
        });
        
        document.getElementById('filterSchool').addEventListener('change', function() {
            filterInventory();
        });
        
        // Formulario
        document.getElementById('productFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            saveProduct();
        });
    }
    
    function displayInventory(products = systemData.inventory) {
        const tableBody = document.getElementById('inventoryTableBody');
        tableBody.innerHTML = '';
        
        if (products.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 20px; color: #7f8c8d;">
                        No hay productos en el inventario.
                    </td>
                </tr>
            `;
            return;
        }
        
        products.forEach(product => {
            const school = systemData.schools.find(s => s.id === product.schoolId);
            const category = systemData.categories.find(c => c.name === product.category);
            
            let statusClass = 'in-stock';
            let statusText = 'En Stock';
            if (product.status === 'low') {
                statusClass = 'low-stock';
                statusText = 'Bajo Stock';
            } else if (product.status === 'out-of-stock') {
                statusClass = 'out-of-stock';
                statusText = 'Agotado';
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>PROD${product.id.toString().padStart(4, '0')}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${school?.name || 'Desconocida'}</td>
                <td>${product.quantity}</td>
                <td>${product.minQuantity}</td>
                <td>${product.location || 'No especificada'}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="action-btn edit" data-id="${product.id}">Editar</button>
                    <button class="action-btn delete" data-id="${product.id}">Eliminar</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Event listeners para botones
        document.querySelectorAll('#inventoryTableBody .action-btn.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                editProduct(productId);
            });
        });
        
        document.querySelectorAll('#inventoryTableBody .action-btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                deleteProduct(productId);
            });
        });
    }
    
    function filterInventory() {
        const searchTerm = document.getElementById('searchInventory').value.toLowerCase();
        const categoryFilter = document.getElementById('filterCategory').value;
        const schoolFilter = document.getElementById('filterSchool').value;
        
        const filtered = systemData.inventory.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                 product.category.toLowerCase().includes(searchTerm) ||
                                 (product.location && product.location.toLowerCase().includes(searchTerm));
            
            const matchesCategory = !categoryFilter || product.category.toLowerCase().includes(categoryFilter);
            const matchesSchool = !schoolFilter || product.schoolId === schoolFilter;
            
            return matchesSearch && matchesCategory && matchesSchool;
        });
        
        displayInventory(filtered);
    }
    
    function showProductForm(productId = null) {
        currentProductId = productId;
        const form = document.getElementById('productForm');
        const title = document.getElementById('productFormTitle');
        
        if (productId) {
            // Modo edición
            title.textContent = 'Editar Producto';
            const product = systemData.inventory.find(p => p.id === productId);
            if (product) {
                document.getElementById('productName').value = product.name;
                document.getElementById('productCategory').value = product.category.toLowerCase().replace(' ', '-');
                document.getElementById('productSchool').value = product.schoolId;
                document.getElementById('productQuantity').value = product.quantity;
                document.getElementById('productMinQuantity').value = product.minQuantity;
                document.getElementById('productLocation').value = product.location || '';
                document.getElementById('productDescription').value = product.description || '';
            }
        } else {
            // Modo nuevo
            title.textContent = 'Agregar Nuevo Producto';
            document.getElementById('productFormElement').reset();
        }
        
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
    }
    
    function hideProductForm() {
        document.getElementById('productForm').style.display = 'none';
        currentProductId = null;
    }
    
    function saveProduct() {
        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            schoolId: document.getElementById('productSchool').value,
            quantity: parseInt(document.getElementById('productQuantity').value),
            minQuantity: parseInt(document.getElementById('productMinQuantity').value),
            location: document.getElementById('productLocation').value,
            description: document.getElementById('productDescription').value
        };
        
        // Validaciones básicas
        if (productData.quantity < 0) {
            showAlert('error', 'La cantidad no puede ser negativa.');
            return;
        }
        
        if (productData.minQuantity < 1) {
            showAlert('error', 'La cantidad mínima debe ser al menos 1.');
            return;
        }
        
        if (currentProductId) {
            // Actualizar producto existente
            const index = systemData.inventory.findIndex(p => p.id === currentProductId);
            if (index !== -1) {
                // Determinar estado basado en cantidad
                let status = 'in-stock';
                if (productData.quantity === 0) {
                    status = 'out-of-stock';
                } else if (productData.quantity < productData.minQuantity) {
                    status = 'low';
                }
                
                systemData.inventory[index] = {
                    ...systemData.inventory[index],
                    ...productData,
                    status: status
                };
                showAlert('success', 'Producto actualizado correctamente.');
            }
        } else {
            // Crear nuevo producto
            const newId = systemData.inventory.length > 0 ? 
                Math.max(...systemData.inventory.map(p => p.id)) + 1 : 1;
            
            // Determinar estado basado en cantidad
            let status = 'in-stock';
            if (productData.quantity === 0) {
                status = 'out-of-stock';
            } else if (productData.quantity < productData.minQuantity) {
                status = 'low';
            }
            
            const newProduct = {
                id: newId,
                ...productData,
                status: status
            };
            
            systemData.inventory.push(newProduct);
            showAlert('success', 'Producto agregado correctamente.');
        }
        
        hideProductForm();
        displayInventory();
        updateDashboardStats();
        displayDashboardAlerts();
    }
    
    function editProduct(productId) {
        showProductForm(productId);
    }
    
    function deleteProduct(productId) {
        showConfirmModal('Eliminar Producto', '¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.', () => {
            const index = systemData.inventory.findIndex(p => p.id === productId);
            if (index !== -1) {
                systemData.inventory.splice(index, 1);
                showAlert('success', 'Producto eliminado correctamente.');
                displayInventory();
                updateDashboardStats();
            }
        });
    }
    
    // ===== CATEGORÍAS =====
    
    function initCategories() {
        displayCategories();
        
        document.getElementById('addCategoryBtn').addEventListener('click', function() {
            showCategoryForm();
        });
        
        document.getElementById('cancelCategoryBtn').addEventListener('click', function() {
            hideCategoryForm();
        });
        
        document.getElementById('categoryFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            saveCategory();
        });
    }
    
    function displayCategories() {
        const tableBody = document.getElementById('categoriesTableBody');
        tableBody.innerHTML = '';
        
        systemData.categories.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>CAT${category.id.toString().padStart(3, '0')}</td>
                <td>${category.name}</td>
                <td>${category.description}</td>
                <td>${category.products}</td>
                <td><span class="status activo">${category.status.toUpperCase()}</span></td>
                <td>
                    <button class="action-btn edit" data-id="${category.id}">Editar</button>
                    <button class="action-btn delete" data-id="${category.id}">Eliminar</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Event listeners
        document.querySelectorAll('#categoriesTableBody .action-btn.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const categoryId = parseInt(this.getAttribute('data-id'));
                editCategory(categoryId);
            });
        });
        
        document.querySelectorAll('#categoriesTableBody .action-btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const categoryId = parseInt(this.getAttribute('data-id'));
                deleteCategory(categoryId);
            });
        });
    }
    
    function showCategoryForm(categoryId = null) {
        currentCategoryId = categoryId;
        const form = document.getElementById('categoryForm');
        const title = document.getElementById('categoryFormTitle');
        
        if (categoryId) {
            title.textContent = 'Editar Categoría';
            const category = systemData.categories.find(c => c.id === categoryId);
            if (category) {
                document.getElementById('categoryName').value = category.name;
                document.getElementById('categoryCode').value = category.code;
                document.getElementById('categoryDescription').value = category.description;
            }
        } else {
            title.textContent = 'Nueva Categoría';
            document.getElementById('categoryFormElement').reset();
        }
        
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
    }
    
    function hideCategoryForm() {
        document.getElementById('categoryForm').style.display = 'none';
        currentCategoryId = null;
    }
    
    function saveCategory() {
        const categoryData = {
            name: document.getElementById('categoryName').value,
            code: document.getElementById('categoryCode').value,
            description: document.getElementById('categoryDescription').value,
            status: 'activa'
        };
        
        if (!categoryData.name) {
            showAlert('error', 'El nombre de la categoría es requerido.');
            return;
        }
        
        if (currentCategoryId) {
            // Actualizar categoría existente
            const index = systemData.categories.findIndex(c => c.id === currentCategoryId);
            if (index !== -1) {
                systemData.categories[index] = {
                    ...systemData.categories[index],
                    ...categoryData
                };
                showAlert('success', 'Categoría actualizada correctamente.');
            }
        } else {
            // Crear nueva categoría
            const newId = systemData.categories.length > 0 ? 
                Math.max(...systemData.categories.map(c => c.id)) + 1 : 1;
            
            const newCategory = {
                id: newId,
                products: 0,
                ...categoryData
            };
            
            systemData.categories.push(newCategory);
            showAlert('success', 'Categoría creada correctamente.');
        }
        
        hideCategoryForm();
        displayCategories();
    }
    
    function editCategory(categoryId) {
        showCategoryForm(categoryId);
    }
    
    function deleteCategory(categoryId) {
        showConfirmModal('Eliminar Categoría', '¿Estás seguro de eliminar esta categoría? Los productos asociados no serán eliminados.', () => {
            const index = systemData.categories.findIndex(c => c.id === categoryId);
            if (index !== -1) {
                systemData.categories.splice(index, 1);
                showAlert('success', 'Categoría eliminada correctamente.');
                displayCategories();
            }
        });
    }
    
    // ===== PEDIDOS =====
    
    function initOrders() {
        displayOrders();
        
        document.getElementById('exportOrdersBtn').addEventListener('click', function() {
            showAlert('success', 'Pedidos exportados correctamente (simulado).');
        });
        
        document.getElementById('orderFilter').addEventListener('change', function() {
            filterOrders();
        });
    }
    
    function displayOrders(orders = systemData.orders) {
        const tableBody = document.getElementById('ordersTableBody');
        tableBody.innerHTML = '';
        
        if (orders.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 20px; color: #7f8c8d;">
                        No hay pedidos registrados.
                    </td>
                </tr>
            `;
            return;
        }
        
        orders.forEach(order => {
            const school = systemData.schools.find(s => s.id === order.schoolId);
            
            let statusClass = 'pendiente';
            let statusText = 'PENDIENTE';
            if (order.status === 'aprobado') {
                statusClass = 'aprobado';
                statusText = 'APROBADO';
            } else if (order.status === 'rechazado') {
                statusClass = 'rechazado';
                statusText = 'RECHAZADO';
            } else if (order.status === 'entregado') {
                statusClass = 'aprobado';
                statusText = 'ENTREGADO';
            }
            
            let priorityClass = '';
            let priorityText = order.priority;
            switch(order.priority) {
                case 'urgente':
                    priorityClass = 'style="color: #c0392b; font-weight: 700;"';
                    priorityText = 'URGENTE';
                    break;
                case 'alta':
                    priorityClass = 'style="color: #e74c3c; font-weight: 600;"';
                    priorityText = 'ALTA';
                    break;
                case 'media':
                    priorityClass = 'style="color: #f39c12;"';
                    priorityText = 'MEDIA';
                    break;
                case 'baja':
                    priorityClass = 'style="color: #3498db;"';
                    priorityText = 'BAJA';
                    break;
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${school?.name || 'Escuela desconocida'}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
                <td ${priorityClass}>${priorityText}</td>
                <td>${order.date}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="action-btn view" data-id="${order.id}">Ver</button>
                    ${order.status === 'pendiente' ? `
                        <button class="action-btn approve" data-id="${order.id}">Aprobar</button>
                        <button class="action-btn reject" data-id="${order.id}">Rechazar</button>
                    ` : ''}
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Event listeners
        document.querySelectorAll('#ordersTableBody .action-btn.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.getAttribute('data-id');
                viewOrderDetails(orderId);
            });
        });
        
        document.querySelectorAll('#ordersTableBody .action-btn.approve').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.getAttribute('data-id');
                approveOrder(orderId);
                filterOrders();
            });
        });
        
        document.querySelectorAll('#ordersTableBody .action-btn.reject').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.getAttribute('data-id');
                rejectOrder(orderId);
                filterOrders();
            });
        });
    }
    
    function filterOrders() {
        const filterValue = document.getElementById('orderFilter').value;
        let filteredOrders = [...systemData.orders];
        
        if (filterValue !== 'all') {
            filteredOrders = systemData.orders.filter(order => order.status === filterValue);
        }
        
        displayOrders(filteredOrders);
    }
    
    // ===== REPORTES =====
    
    function initReports() {
        displayReports();
        
        document.getElementById('reportPeriod').addEventListener('change', function() {
            const customRange = document.getElementById('customDateRange');
            if (this.value === 'personalizado') {
                customRange.style.display = 'flex';
            } else {
                customRange.style.display = 'none';
            }
        });
        
        document.getElementById('generateReportBtn').addEventListener('click', function() {
            document.getElementById('reportPeriod').value = 'mes';
            document.getElementById('customDateRange').style.display = 'none';
            document.getElementById('reportType').value = 'inventario';
            document.getElementById('reportSchool').value = '';
        });
        
        document.getElementById('generateReportNowBtn').addEventListener('click', function() {
            generateReport();
        });
    }
    
    function displayReports() {
        const tableBody = document.getElementById('reportsTableBody');
        tableBody.innerHTML = '';
        
        systemData.reports.forEach(report => {
            const school = report.schoolId ? 
                systemData.schools.find(s => s.id === report.schoolId) : null;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${report.id}</td>
                <td>${getReportTypeName(report.type)}</td>
                <td>${getPeriodName(report.period)}</td>
                <td>${school?.name || 'Todas'}</td>
                <td>${report.date}</td>
                <td>
                    <button class="action-btn view" data-id="${report.id}">Ver</button>
                    <button class="action-btn" style="background-color: #3498db;" data-id="${report.id}">Descargar</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Event listeners
        document.querySelectorAll('#reportsTableBody .action-btn.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const reportId = this.getAttribute('data-id');
                viewReport(reportId);
            });
        });
    }
    
    function getReportTypeName(type) {
        const types = {
            'inventario': 'Inventario General',
            'consumo': 'Consumo por Escuela',
            'pedidos': 'Pedidos por Período',
            'alertas': 'Reporte de Alertas',
            'financiero': 'Análisis Financiero'
        };
        return types[type] || type;
    }
    
    function getPeriodName(period) {
        const periods = {
            'mes': 'Último Mes',
            'trimestre': 'Último Trimestre',
            'semestre': 'Último Semestre',
            'anual': 'Último Año'
        };
        return periods[period] || period;
    }
    
    function generateReport() {
        const reportType = document.getElementById('reportType').value;
        const reportPeriod = document.getElementById('reportPeriod').value;
        const reportSchool = document.getElementById('reportSchool').value;
        
        // Simular generación de reporte
        showAlert('success', `Reporte de ${getReportTypeName(reportType)} generado correctamente. Se ha enviado a la cola de descargas.`);
        
        // Agregar a la lista de reportes
        const newReportId = 'REP' + (systemData.reports.length + 1).toString().padStart(3, '0');
        const newReport = {
            id: newReportId,
            type: reportType,
            period: reportPeriod,
            schoolId: reportSchool || null,
            date: new Date().toISOString().split('T')[0]
        };
        
        systemData.reports.unshift(newReport);
        displayReports();
    }
    
    function viewReport(reportId) {
        const report = systemData.reports.find(r => r.id === reportId);
        if (!report) return;
        
        const school = report.schoolId ? 
            systemData.schools.find(s => s.id === report.schoolId) : null;
        
        const modalContent = `
            <h4>Detalles del Reporte: ${reportId}</h4>
            <p><strong>Tipo:</strong> ${getReportTypeName(report.type)}</p>
            <p><strong>Período:</strong> ${getPeriodName(report.period)}</p>
            <p><strong>Escuela:</strong> ${school?.name || 'Todas las escuelas'}</p>
            <p><strong>Fecha Generación:</strong> ${report.date}</p>
            <p><strong>Estado:</strong> Generado</p>
            <hr>
            <p>Este es un reporte simulado. En una implementación real, aquí se mostrarían los datos del reporte.</p>
        `;
        
        showModal('Detalles del Reporte', modalContent);
    }
    
    // ===== USUARIOS =====
    
    function initUsers() {
        displayUsers();
        
        document.getElementById('addUserBtn').addEventListener('click', function() {
            showUserForm();
        });
        
        document.getElementById('cancelUserBtn').addEventListener('click', function() {
            hideUserForm();
        });
        
        document.getElementById('userFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            saveUser();
        });
    }
    
    function displayUsers() {
        const tableBody = document.getElementById('usersTableBody');
        tableBody.innerHTML = '';
        
        systemData.users.forEach(user => {
            const school = user.schoolId ? 
                systemData.schools.find(s => s.id === user.schoolId) : null;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>USER${user.id.toString().padStart(4, '0')}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${getRoleName(user.role)}</td>
                <td>${school?.name || 'Sistema'}</td>
                <td><span class="status ${user.status}">${user.status.toUpperCase()}</span></td>
                <td>${user.lastAccess}</td>
                <td>
                    <button class="action-btn edit" data-id="${user.id}">Editar</button>
                    <button class="action-btn delete" data-id="${user.id}">Eliminar</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Event listeners
        document.querySelectorAll('#usersTableBody .action-btn.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.getAttribute('data-id'));
                editUser(userId);
            });
        });
        
        document.querySelectorAll('#usersTableBody .action-btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.getAttribute('data-id'));
                deleteUser(userId);
            });
        });
    }
    
    function getRoleName(role) {
        const roles = {
            'admin': 'Administrador',
            'school-admin': 'Admin Escolar',
            'school-user': 'Usuario Escolar'
        };
        return roles[role] || role;
    }
    
    function showUserForm(userId = null) {
        currentUserId = userId;
        const form = document.getElementById('userForm');
        const title = document.getElementById('userFormTitle');
        
        if (userId) {
            title.textContent = 'Editar Usuario';
            const user = systemData.users.find(u => u.id === userId);
            if (user) {
                document.getElementById('userName').value = user.name;
                document.getElementById('userEmail').value = user.email;
                document.getElementById('userRole').value = user.role;
                document.getElementById('userSchool').value = user.schoolId || '';
                // No mostramos contraseñas por seguridad
                document.getElementById('userPassword').value = '********';
                document.getElementById('userConfirmPassword').value = '********';
            }
        } else {
            title.textContent = 'Nuevo Usuario';
            document.getElementById('userFormElement').reset();
        }
        
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
    }
    
    function hideUserForm() {
        document.getElementById('userForm').style.display = 'none';
        currentUserId = null;
    }
    
    function saveUser() {
        const userData = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            role: document.getElementById('userRole').value,
            schoolId: document.getElementById('userSchool').value || null,
            password: document.getElementById('userPassword').value,
            confirmPassword: document.getElementById('userConfirmPassword').value
        };
        
        // Validaciones
        if (!userData.name || !userData.email || !userData.role) {
            showAlert('error', 'Todos los campos requeridos deben ser completados.');
            return;
        }
        
        if (userData.password !== userData.confirmPassword) {
            showAlert('error', 'Las contraseñas no coinciden.');
            return;
        }
        
        if (userData.password.length < 6) {
            showAlert('error', 'La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        
        if (currentUserId) {
            // Actualizar usuario existente
            const index = systemData.users.findIndex(u => u.id === currentUserId);
            if (index !== -1) {
                systemData.users[index] = {
                    ...systemData.users[index],
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                    schoolId: userData.schoolId
                    // En una app real, aquí se hashearía la nueva contraseña
                };
                showAlert('success', 'Usuario actualizado correctamente.');
            }
        } else {
            // Crear nuevo usuario
            const newId = systemData.users.length > 0 ? 
                Math.max(...systemData.users.map(u => u.id)) + 1 : 1;
            
            const newUser = {
                id: newId,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                schoolId: userData.schoolId,
                status: 'activo',
                lastAccess: 'Nunca'
            };
            
            systemData.users.push(newUser);
            showAlert('success', 'Usuario creado correctamente.');
        }
        
        hideUserForm();
        displayUsers();
    }
    
    function editUser(userId) {
        showUserForm(userId);
    }
    
    function deleteUser(userId) {
        showConfirmModal('Eliminar Usuario', '¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.', () => {
            const index = systemData.users.findIndex(u => u.id === userId);
            if (index !== -1) {
                systemData.users.splice(index, 1);
                showAlert('success', 'Usuario eliminado correctamente.');
                displayUsers();
            }
        });
    }
    
    // ===== ESCUELAS =====
    
    function initSchools() {
        displaySchools();
        
        document.getElementById('addSchoolBtn').addEventListener('click', function() {
            showSchoolForm();
        });
        
        document.getElementById('cancelSchoolBtn').addEventListener('click', function() {
            hideSchoolForm();
        });
        
        document.getElementById('schoolFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            saveSchool();
        });
    }
    
    function displaySchools() {
        const tableBody = document.getElementById('schoolsTableBody');
        tableBody.innerHTML = '';
        
        systemData.schools.forEach(school => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${school.id}</td>
                <td>${school.name}</td>
                <td>${school.address}</td>
                <td>${school.phone || 'No especificado'}</td>
                <td>${school.contactName}<br>${school.contactEmail}</td>
                <td>${school.users}</td>
                <td>${school.products}</td>
                <td><span class="status ${school.status}">${school.status.toUpperCase()}</span></td>
                <td>
                    <button class="action-btn edit" data-id="${school.id}">Editar</button>
                    <button class="action-btn delete" data-id="${school.id}">Eliminar</button>
                    <button class="action-btn view" data-id="${school.id}">Ver</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Event listeners
        document.querySelectorAll('#schoolsTableBody .action-btn.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const schoolId = this.getAttribute('data-id');
                editSchool(schoolId);
            });
        });
        
        document.querySelectorAll('#schoolsTableBody .action-btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const schoolId = this.getAttribute('data-id');
                deleteSchool(schoolId);
            });
        });
        
        document.querySelectorAll('#schoolsTableBody .action-btn.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const schoolId = this.getAttribute('data-id');
                viewSchoolDetails(schoolId);
            });
        });
    }
    
    function showSchoolForm(schoolId = null) {
        currentSchoolId = schoolId;
        const form = document.getElementById('schoolForm');
        const title = document.getElementById('schoolFormTitle');
        
        if (schoolId) {
            title.textContent = 'Editar Escuela';
            const school = systemData.schools.find(s => s.id === schoolId);
            if (school) {
                document.getElementById('schoolName').value = school.name;
                document.getElementById('schoolCode').value = school.id;
                document.getElementById('schoolAddress').value = school.address;
                document.getElementById('schoolPhone').value = school.phone || '';
                document.getElementById('schoolContactName').value = school.contactName;
                document.getElementById('schoolContactEmail').value = school.contactEmail;
            }
        } else {
            title.textContent = 'Nueva Escuela';
            document.getElementById('schoolFormElement').reset();
        }
        
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
    }
    
    function hideSchoolForm() {
        document.getElementById('schoolForm').style.display = 'none';
        currentSchoolId = null;
    }
    
    function saveSchool() {
        const schoolData = {
            id: document.getElementById('schoolCode').value,
            name: document.getElementById('schoolName').value,
            address: document.getElementById('schoolAddress').value,
            phone: document.getElementById('schoolPhone').value,
            contactName: document.getElementById('schoolContactName').value,
            contactEmail: document.getElementById('schoolContactEmail').value,
            users: 1, // Por defecto
            products: 0, // Por defecto
            status: 'activa'
        };
        
        // Validaciones
        if (!schoolData.id || !schoolData.name || !schoolData.address || 
            !schoolData.contactName || !schoolData.contactEmail) {
            showAlert('error', 'Todos los campos requeridos deben ser completados.');
            return;
        }
        
        if (currentSchoolId) {
            // Actualizar escuela existente
            const index = systemData.schools.findIndex(s => s.id === currentSchoolId);
            if (index !== -1) {
                // Mantener los datos existentes de usuarios y productos
                schoolData.users = systemData.schools[index].users;
                schoolData.products = systemData.schools[index].products;
                
                systemData.schools[index] = {
                    ...systemData.schools[index],
                    ...schoolData
                };
                showAlert('success', 'Escuela actualizada correctamente.');
            }
        } else {
            // Crear nueva escuela
            // Verificar que el ID no exista
            if (systemData.schools.find(s => s.id === schoolData.id)) {
                showAlert('error', 'El código de escuela ya existe.');
                return;
            }
            
            systemData.schools.push(schoolData);
            showAlert('success', 'Escuela creada correctamente.');
            
            // Actualizar selectores en otras secciones
            updateSchoolSelectors();
        }
        
        hideSchoolForm();
        displaySchools();
        updateDashboardStats();
    }
    
    function updateSchoolSelectors() {
        // Esta función actualizaría los selectores de escuela en otros formularios
        // En una implementación real, se recargarían los selectores
    }
    
    function editSchool(schoolId) {
        showSchoolForm(schoolId);
    }
    
    function deleteSchool(schoolId) {
        showConfirmModal('Eliminar Escuela', '¿Estás seguro de eliminar esta escuela? También se eliminarán todos sus usuarios y productos asociados.', () => {
            const index = systemData.schools.findIndex(s => s.id === schoolId);
            if (index !== -1) {
                // También eliminar usuarios y productos asociados
                systemData.users = systemData.users.filter(u => u.schoolId !== schoolId);
                systemData.inventory = systemData.inventory.filter(p => p.schoolId !== schoolId);
                
                systemData.schools.splice(index, 1);
                showAlert('success', 'Escuela eliminada correctamente.');
                displaySchools();
                displayUsers();
                displayInventory();
                updateDashboardStats();
            }
        });
    }
    
    function viewSchoolDetails(schoolId) {
        const school = systemData.schools.find(s => s.id === schoolId);
        if (!school) return;
        
        const schoolUsers = systemData.users.filter(u => u.schoolId === schoolId);
        const schoolProducts = systemData.inventory.filter(p => p.schoolId === schoolId);
        const schoolOrders = systemData.orders.filter(o => o.schoolId === schoolId);
        
        const modalContent = `
            <h4>Detalles de la Escuela: ${school.name}</h4>
            <p><strong>Código:</strong> ${school.id}</p>
            <p><strong>Dirección:</strong> ${school.address}</p>
            <p><strong>Teléfono:</strong> ${school.phone || 'No especificado'}</p>
            <p><strong>Contacto:</strong> ${school.contactName} (${school.contactEmail})</p>
            <p><strong>Estado:</strong> <span class="status ${school.status}">${school.status.toUpperCase()}</span></p>
            <hr>
            <p><strong>Estadísticas:</strong></p>
            <ul>
                <li>Usuarios: ${school.users}</li>
                <li>Productos en inventario: ${school.products}</li>
                <li>Pedidos totales: ${schoolOrders.length}</li>
                <li>Pedidos pendientes: ${schoolOrders.filter(o => o.status === 'pendiente').length}</li>
            </ul>
        `;
        
        showModal('Detalles de la Escuela', modalContent);
    }
    
    // ===== CONFIGURACIÓN =====
    
    function initSettings() {
        // Configuración general
        document.getElementById('generalSettingsForm').addEventListener('submit', function(e) {
            e.preventDefault();
            saveGeneralSettings();
        });
        
        // Configuración de notificaciones
        document.getElementById('notificationSettingsForm').addEventListener('submit', function(e) {
            e.preventDefault();
            saveNotificationSettings();
        });
        
        // Botones de mantenimiento
        document.getElementById('backupBtn').addEventListener('click', function() {
            showConfirmModal('Crear Respaldo', '¿Deseas crear un respaldo completo del sistema?', () => {
                showAlert('success', 'Respaldo creado correctamente. Se ha guardado en el servidor.');
            });
        });
        
        document.getElementById('clearCacheBtn').addEventListener('click', function() {
            showConfirmModal('Limpiar Caché', '¿Deseas limpiar la caché del sistema?', () => {
                showAlert('success', 'Caché limpiada correctamente.');
            });
        });
        
        document.getElementById('systemLogsBtn').addEventListener('click', function() {
            showModal('Logs del Sistema', '<p>Aquí se mostrarían los logs del sistema. En una implementación real, estos se cargarían desde el servidor.</p><p><strong>Logs recientes:</strong></p><ul><li>[INFO] Sistema iniciado - 2023-10-26 10:00:00</li><li>[INFO] Usuario admin inició sesión - 2023-10-26 10:05:00</li><li>[INFO] Pedido ORD001 aprobado - 2023-10-26 10:30:00</li><li>[WARN] Producto Papel Bond A4 bajo stock - 2023-10-26 11:15:00</li></ul>');
        });
    }
    
    function saveGeneralSettings() {
        showAlert('success', 'Configuración general guardada correctamente.');
    }
    
    function saveNotificationSettings() {
        showAlert('success', 'Preferencias de notificaciones guardadas correctamente.');
    }
    
    // ===== UTILIDADES =====
    
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