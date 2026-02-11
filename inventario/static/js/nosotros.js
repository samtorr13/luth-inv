document.addEventListener('DOMContentLoaded', function() {
    // Efecto hover mejorado para las tarjetas
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Manejo de errores de imágenes
    const images = document.querySelectorAll('.member-photo img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Error cargando imagen para:', this.alt);
            // Si hay un error, mostrar un placeholder SVG
            if (!this.src.includes('default-avatar')) {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzJlODBkYiIvPjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiPkFVU0VSPC90ZXh0Pjwvc3ZnPg==';
                this.alt = 'Avatar por defecto';
            }
        });
    });
    
    // CORRECCIÓN: Esta función no funciona en archivos .js separados
    // Solo funciona en templates donde Django puede procesar {% url %}
    // Para archivos .js separados, necesitas:
    // 1. Pasar las URLs como variables desde el template, o
    // 2. Usar rutas absolutas
    
    // Solución: Usar rutas absolutas en JavaScript
    function navigateToDashboard() {
        // Asume que dashboardes está en la raíz
        window.location.href = '/dashboardes';
    }
    
    function navigateToAdmin() {
        window.location.href = '/dashboard';
    }
    
    function navigateToNosotros() {
        window.location.href = '/nosotros';
    }
    
    // Opcional: Agregar event listeners a botones si es necesario
    document.querySelectorAll('[data-navigate]').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-navigate');
            switch(target) {
                case 'dashboardes':
                    navigateToDashboard();
                    break;
                case 'dashboard':
                    navigateToAdmin();
                    break;
                case 'nosotros':
                    navigateToNosotros();
                    break;
            }
        });
    });
});