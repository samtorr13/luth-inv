// static/js/login.js - VERSIÓN CON DEPURACIÓN
document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginButton = document.getElementById('loginButton');
        const errorMsg = document.getElementById('errorMessage');
        
        if (!username || !password) {
            errorMsg.textContent = 'Completa todos los campos';
            errorMsg.style.display = 'block';
            return;
        }
        
        loginButton.disabled = true;
        loginButton.innerHTML = '<span>Iniciando sesión...</span> <i class="fas fa-spinner fa-spin"></i>';
        
        const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('csrfmiddlewaretoken', csrf);
        
        fetch('/admin/login/?next=/admin/', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        })
        .then(response => {
            console.log('Status:', response.status);
            console.log('URL:', response.url);
            
            if (response.url.includes('/admin/') && !response.url.includes('/login/')) {
                window.location.href = '/admin/';
            } else {
                // Intentar obtener el mensaje de error
                return response.text().then(html => {
                    // Buscar mensaje de error en el HTML
                    const errorMatch = html.match(/<li>(.*?)<\/li>/) || 
                                     html.match(/error.*?>(.*?)</) ||
                                     html.match(/<p class="errornote">(.*?)<\/p>/);
                    
                    const errorText = errorMatch ? errorMatch[1] : 'Credenciales incorrectas';
                    throw new Error(errorText);
                });
            }
        })
        .catch(error => {
            console.error('Error detallado:', error);
            errorMsg.textContent = error.message || 'Error al iniciar sesión';
            errorMsg.style.display = 'block';
            loginButton.disabled = false;
            loginButton.innerHTML = '<span id="buttonText">Iniciar Sesión</span> <i class="fas fa-spinner fa-spin" id="loadingSpinner" style="display: none;"></i>';
            document.getElementById('password').value = '';
        });
    });
    
    // Toggle contraseña
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const password = document.getElementById('password');
            const icon = this.querySelector('i');
            if (password.type === 'password') {
                password.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                password.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    }
    
    // Usuarios demo
    document.querySelectorAll('.user-card').forEach(card => {
        card.addEventListener('click', function() {
            document.getElementById('username').value = this.dataset.email;
            document.getElementById('password').value = this.dataset.password;
            document.getElementById('errorMessage').style.display = 'none';
        });
    });
});