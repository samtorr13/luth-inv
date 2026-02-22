
        document.addEventListener('DOMContentLoaded', function() {
            // Elementos del DOM
            const loginForm = document.getElementById('loginForm');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('togglePassword');
            const errorMessage = document.getElementById('errorMessage');
            const successMessage = document.getElementById('successMessage');
            const loginButton = document.getElementById('loginButton');
            const buttonText = document.getElementById('buttonText');
            const loadingSpinner = document.getElementById('loadingSpinner');
            const demoUserCards = document.querySelectorAll('.user-card');
            
            // Verificar si hay una sesión activa y redirigir
            checkExistingSession();
            
            // Base de datos de usuarios
            const users = {
                'admin@luthinv.com': {
                    password: 'admin123',
                    name: 'Administrador del Sistema',
                    role: 'Administrador',
                    type: 'admin',
                    dashboardUrl: 'dashboard'
                },
                'escuela_norte@luthinv.com': {
                    password: 'norte123',
                    name: 'Escuela Primaria Norte',
                    role: 'Directora',
                    type: 'school',
                    schoolId: 'SCH001',
                    dashboardUrl: 'dashboardes'
                },
                'escuela_sur@luthinv.com': {
                    password: 'sur123',
                    name: 'Escuela Secundaria Sur',
                    role: 'Director',
                    type: 'school',
                    schoolId: 'SCH002',
                    dashboardUrl: 'dashboardes'
                },
                'escuela_centro@luthinv.com': {
                    password: 'centro123',
                    name: 'Colegio Centro',
                    role: 'Coordinador',
                    type: 'school',
                    schoolId: 'SCH003',
                    dashboardUrl: 'dashboardes'
                }
            };
            
            // Función para verificar sesión existente
            function checkExistingSession() {
                const userData = sessionStorage.getItem('luth_user');
                if (userData) {
                    const user = JSON.parse(userData);
                    if (user.type === 'admin') {
                        window.location.href = 'dashboard';
                    } else if (user.type === 'school') {
                        window.location.href = 'dashboardes';
                    }
                }
            }
            
            // Función para alternar visibilidad de contraseña
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            });
            
            // Función para llenar credenciales desde las tarjetas de usuario demo
            demoUserCards.forEach(card => {
                card.addEventListener('click', function() {
                    const email = this.getAttribute('data-email');
                    const password = this.getAttribute('data-password');
                    
                    emailInput.value = email;
                    passwordInput.value = password;
                    
                    // Resaltar la tarjeta seleccionada
                    demoUserCards.forEach(c => c.style.backgroundColor = 'rgba(255, 255, 255, 0.1)');
                    this.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
                    
                    // Ocultar mensajes anteriores
                    errorMessage.style.display = 'none';
                });
            });
            
            // Función para validar email
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
            
            // Función para simular login
            function simulateLogin(email, password) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        if (users[email] && users[email].password === password) {
                            resolve({ success: true, user: users[email] });
                        } else {
                            resolve({ success: false, message: 'Credenciales incorrectas' });
                        }
                    }, 1000);
                });
            }
            
            // Función para redirigir al dashboard correspondiente
            function redirectToDashboard(user) {
                // Guardar información del usuario en sessionStorage
                sessionStorage.setItem('luth_user', JSON.stringify({
                    email: emailInput.value.trim(),
                    name: user.name,
                    role: user.role,
                    type: user.type,
                    schoolId: user.schoolId || null,
                    loginTime: new Date().toISOString()
                }));
                
                // Redirigir a la página del dashboard correspondiente
                window.location.href = user.dashboardUrl;
            }
            
            // Manejar envío del formulario
            loginForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                const password = passwordInput.value;
                
                // Validaciones básicas
                if (!email || !password) {
                    showError('Por favor, completa todos los campos.');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showError('Por favor, ingresa un correo electrónico válido.');
                    return;
                }
                
                // Mostrar estado de carga
                loginButton.disabled = true;
                buttonText.textContent = 'Verificando...';
                loadingSpinner.style.display = 'inline-block';
                errorMessage.style.display = 'none';
                
                // Simular petición de login
                const result = await simulateLogin(email, password);
                
                if (result.success) {
                    // Mostrar mensaje de éxito
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    
                    // Redirigir al dashboard después de un breve delay
                    setTimeout(() => {
                        redirectToDashboard(result.user);
                    }, 1000);
                } else {
                    // Mostrar error
                    showError(result.message);
                    
                    // Restaurar botón
                    loginButton.disabled = false;
                    buttonText.textContent = 'Iniciar Sesión';
                    loadingSpinner.style.display = 'none';
                }
            });
            
            // Función para mostrar mensaje de error
            function showError(message) {
                errorMessage.textContent = message;
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
                
                // Efecto de sacudida en el formulario
                loginForm.style.animation = 'none';
                setTimeout(() => {
                    loginForm.style.animation = 'shake 0.5s ease-in-out';
                }, 10);
            }
            
            // Añadir animación de sacudida
            const style = document.createElement('style');
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
            
            // Prellenar con un usuario demo para facilitar la prueba
            emailInput.value = 'admin@luthinv.com';
            passwordInput.value = 'admin123';
            
            // Resaltar la tarjeta correspondiente
            demoUserCards[0].style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
        });
  