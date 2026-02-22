// ============================================
// dashboard.js - Script principal del panel de administracion
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard JS cargado");

  // ============================================
  // 1. OBTENER DATOS DE DJANGO
  // ============================================
  const data = window.djangoData || {
    escuelas: [],
    materiales: [],
    tipos_materiales: [],
    usuarios: [],
    alertas: [],
    estadisticas: {
      total_escuelas: 0,
      total_materiales: 0,
      alertas_criticas: 0,
      pedidos_pendientes: 0,
    },
  };

  console.log("Datos recibidos:", data);

  // ============================================
  // 2. FUNCION PARA CAMBIAR DE SECCION
  // ============================================
  function switchSection(sectionId) {
    console.log("Cambiando a seccion:", sectionId);

    // Ocultar todas las secciones
    document.querySelectorAll(".dashboard-section").forEach((section) => {
      section.classList.remove("active");
    });

    // Mostrar la seccion seleccionada
    const selectedSection = document.getElementById("section-" + sectionId);
    if (selectedSection) {
      selectedSection.classList.add("active");
    }

    // Actualizar menu activo
    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.section === sectionId) {
        link.classList.add("active");
      }
    });

    // Cargar datos especificos segun la seccion
    if (sectionId === "pedidos") {
      if (typeof cargarPedidosAdmin === "function") {
        cargarPedidosAdmin();
      }
    } else if (sectionId === "reportes") {
      if (typeof cargarEstadisticasReportes === "function") {
        cargarEstadisticasReportes();
      }
    }
  }

  // ============================================
  // 3. ASIGNAR EVENTOS A LOS MENUS
  // ============================================
  document.querySelectorAll(".sidebar-menu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.dataset.section;
      switchSection(sectionId);
    });
  });

  // ============================================
  // 4. CARGAR DATOS EN LAS TABLAS
  // ============================================

  function loadSchools() {
    const tbody = document.getElementById("schoolsTableBody");
    if (!tbody) return;

    let html = "";
    data.escuelas.forEach((school) => {
      html += `<tr>
                <td>${school.id}</td>
                <td>${school.name || "Sin nombre"}</td>
                <td>${school.direccion || "No especificada"}</td>
                <td>${school.telefono || "No especificado"}</td>
                <td>${school.contacto_nombre || "No especificado"}<br>${
        school.contacto_email || ""
      }</td>
                <td>${school.usuarios_count || 0}</td>
                <td>${school.materiales_count || 0}</td>
                <td><span class="status ${
                  school.activo ? "activa" : "inactiva"
                }">${school.activo ? "ACTIVA" : "INACTIVA"}</span></td>
                <td>
                    <button class="action-btn edit" data-id="${
                      school.id
                    }">Editar</button>
                    <button class="action-btn delete" data-id="${
                      school.id
                    }">Eliminar</button>
                </td>
            </tr>`;
    });

    if (html === "") {
      html =
        '<tr><td colspan="9" style="text-align:center;">No hay escuelas registradas</td></tr>';
    }
    tbody.innerHTML = html;
  }

  function loadCategories() {
    const tbody = document.getElementById("categoriesTableBody");
    if (!tbody) return;

    let html = "";
    data.tipos_materiales.forEach((tipo, index) => {
      html += `<tr>
                <td>${index + 1}</td>
                <td>${tipo.nombre || tipo.tipo}</td>
                <td>Materiales de tipo ${tipo.nombre || tipo.tipo}</td>
                <td>${tipo.count}</td>
                <td><span class="status activa">ACTIVA</span></td>
                <td>
                    <button class="action-btn edit">Ver</button>
                </td>
            </tr>`;
    });

    if (html === "") {
      html =
        '<tr><td colspan="6" style="text-align:center;">No hay categorias registradas</td></tr>';
    }
    tbody.innerHTML = html;
  }

  function loadUsers() {
    const tbody = document.getElementById("usersTableBody");
    if (!tbody) return;

    let html = "";
    data.usuarios.forEach((user) => {
      html += `<tr>
                <td>USER${user.id}</td>
                <td>${user.first_name || ""} ${user.last_name || ""}</td>
                <td>${user.email || ""}</td>
                <td>${user.rol === "ADMIN" ? "Administrador" : "Usuario"}</td>
                <td>Sistema</td>
                <td><span class="status ${
                  user.is_active ? "activo" : "inactivo"
                }">${user.is_active ? "ACTIVO" : "INACTIVO"}</span></td>
                <td>${
                  user.last_login
                    ? new Date(user.last_login).toLocaleDateString()
                    : "Nunca"
                }</td>
                <td>
                    <button class="action-btn edit" data-id="${
                      user.id
                    }">Editar</button>
                    <button class="action-btn delete" data-id="${
                      user.id
                    }">Eliminar</button>
                </td>
            </tr>`;
    });

    if (html === "") {
      html =
        '<tr><td colspan="8" style="text-align:center;">No hay usuarios registrados</td></tr>';
    }
    tbody.innerHTML = html;
  }

  function loadAlerts() {
    const alertsDiv = document.getElementById("alertsList");
    if (!alertsDiv) return;

    if (data.alertas.length === 0) {
      alertsDiv.innerHTML =
        '<p style="text-align:center; padding:20px;">No hay alertas pendientes</p>';
      return;
    }

    let html = '<ul style="list-style:none; padding:0;">';
    data.alertas.forEach((alerta) => {
      html += `<li style="margin-bottom:10px; padding:10px; background-color:#f8f9fa; border-left:4px solid #e74c3c;">
                <strong>Alerta #${alerta.id}:</strong> ${
        alerta.msg || "Sin mensaje"
      }<br>
                <small>${alerta.escuela_nombre} - ${new Date(
        alerta.fecha
      ).toLocaleString()}</small>
            </li>`;
    });
    html += "</ul>";
    alertsDiv.innerHTML = html;
  }

  function loadPendingOrders() {
    const tbody = document.getElementById("pendingOrdersTableBody");
    if (!tbody) return;

    let html =
      '<tr><td colspan="7" style="text-align:center;">Modulo de pedidos en desarrollo</td></tr>';
    tbody.innerHTML = html;
  }

  // ============================================
  // 5. FUNCION PRINCIPAL DE TABLA DE MATERIALES
  // ============================================

  function updateMaterialsTable(materiales) {
    const tbody = document.getElementById("inventoryTableBody");
    if (!tbody) return;

    const stocks = window.djangoData?.stocks_por_escuela || [];
    const stocksFlat = [];

    stocks.forEach((escuela) => {
      if (escuela.items && Array.isArray(escuela.items)) {
        escuela.items.forEach((item) => {
          stocksFlat.push({
            material_id: item.material_id,
            material_nombre: item.material_nombre,
            escuela_id: escuela.escuela_id,
            escuela_nombre: escuela.escuela_nombre,
            cantidad: item.cantidad,
            minimo: item.minimo,
            estado: item.estado,
          });
        });
      }
    });

    let html = "";

    if (!materiales || materiales.length === 0) {
      html = `
        <tr>
            <td colspan="9" style="text-align: center; padding: 60px 20px;">
                <div style="text-align: center;">
                    <i class="fas fa-box-open" style="font-size: 4rem; color: #dee2e6; margin-bottom: 20px;"></i>
                    <h3 style="color: #6c757d; margin-bottom: 10px;">No se encontraron materiales</h3>
                    <p style="color: #adb5bd;">Prueba con otros filtros o agrega un nuevo material</p>
                </div>
            </td>
        </tr>
        `;
    } else {
      materiales.forEach((mat) => {
        const stockTotal = mat.stock_total || 0;
        const stockMinimo = mat.stock_minimo || 5;

        const stocksDelMaterial = stocksFlat.filter(
          (s) => s.material_id == mat.id
        );

        let statusClass = "status-in-stock";
        let statusText = "En Stock";
        let statusIcon = "fa-check-circle";

        if (stockTotal === 0) {
          statusClass = "status-out-of-stock";
          statusText = "Agotado";
          statusIcon = "fa-times-circle";
        } else if (stockTotal < stockMinimo) {
          statusClass = "status-low-stock";
          statusText = "Bajo Stock";
          statusIcon = "fa-exclamation-triangle";
        }

        let ubicacionesHtml = "";
        if (stocksDelMaterial.length > 0) {
          stocksDelMaterial.forEach((s) => {
            ubicacionesHtml += `
                        <div style="display: flex; align-items: center; gap: 5px; background-color: #f8f9fa; padding: 3px 6px; border-radius: 4px; margin-bottom: 3px;">
                            <i class="fas fa-school" style="color: #28a745;" title="Escuela"></i>
                            <span style="flex: 1;">${s.escuela_nombre}</span>
                            <span style="font-weight: 600; color: #007bff;">${s.cantidad}</span>
                        </div>
                    `;
          });
        } else {
          ubicacionesHtml =
            '<span style="color: #6c757d; font-style: italic;">Sin ubicacion</span>';
        }

        html += `
            <tr style="border-bottom: 1px solid #e9ecef;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='transparent'">
                <td style="padding: 12px 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-cube" style="color: #6c757d; font-size: 1.1rem;"></i>
                        <span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">
                            MAT${mat.id}
                        </span>
                    </div>
                </td>
                <td style="padding: 12px 10px; font-weight: 600;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-tag" style="color: #28a745; font-size: 1rem;"></i>
                        ${mat.name || ""}
                    </div>
                </td>
                <td style="padding: 12px 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-layer-group" style="color: #17a2b8;"></i>
                        <span style="background: #e2e3e5; color: #383d41; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">
                            ${mat.tipo_display || mat.tipo || "General"}
                        </span>
                    </div>
                </td>
                <td style="padding: 12px 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-weight-hanging" style="color: #ffc107;"></i>
                        ${mat.unidad || "PIEZAS"}
                    </div>
                </td>
                <td style="padding: 12px 10px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" 
                    title="${mat.desc || ""}">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-align-left" style="color: #6c757d;"></i>
                        ${mat.desc || "-"}
                    </div>
                </td>
                <td style="padding: 12px 10px; min-width: 200px;">
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        ${ubicacionesHtml}
                    </div>
                </td>
                <td style="padding: 12px 10px; text-align: center;">
                    <span style="font-size: 1.3rem; font-weight: 700; color: #007bff;">${stockTotal}</span>
                    <br>
                    <small style="color: #6c757d; display: flex; align-items: center; justify-content: center; gap: 4px;">
                        <i class="fas fa-arrow-down" style="font-size: 0.7rem;"></i> Min: ${stockMinimo}
                    </small>
                </td>
                <td style="padding: 12px 10px;">
                    <span class="status-badge ${statusClass}" 
                          style="display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                        <i class="fas ${statusIcon}"></i>
                        ${statusText}
                    </span>
                </td>
                <td style="padding: 12px 10px;">
                    <div style="display: flex; gap: 5px;">
                        <button class="action-btn edit" data-id="${mat.id}" title="Editar material" 
                                style="background: #007bff; border: none; color: white; width: 32px; height: 32px; border-radius: 4px; cursor: pointer;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" data-id="${mat.id}" title="Eliminar material" 
                                style="background: #dc3545; border: none; color: white; width: 32px; height: 32px; border-radius: 4px; cursor: pointer;">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="action-btn view" data-id="${mat.id}" title="Ver detalles" 
                                style="background: #28a745; border: none; color: white; width: 32px; height: 32px; border-radius: 4px; cursor: pointer;">
                            <i class="fas fa-chart-bar"></i>
                        </button>
                    </div>
                </td>
            </tr>
            `;
      });
    }

    tbody.innerHTML = html;
    attachMaterialButtonEvents();
  }

  // ============================================
  // 6. INICIALIZAR TODO
  // ============================================

  if (window.userData) {
    const userName = document.getElementById("userName");
    const userRole = document.getElementById("userRole");
    const userAvatar = document.getElementById("userAvatar");

    if (userName) userName.textContent = window.userData.name || "Usuario";
    if (userRole)
      userRole.textContent =
        window.userData.rol === "ADMIN"
          ? "Administrador del Sistema"
          : "Usuario";
    if (userAvatar)
      userAvatar.textContent = (window.userData.name || "A")
        .charAt(0)
        .toUpperCase();
  }

  const dateElement = document.getElementById("currentDate");
  if (dateElement) {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    dateElement.textContent = now.toLocaleDateString("es-ES", options);
  }

  const totalSchools = document.getElementById("totalSchools");
  const totalProducts = document.getElementById("totalProducts");
  const pendingOrders = document.getElementById("pendingOrders");
  const criticalAlerts = document.getElementById("criticalAlerts");

  if (totalSchools)
    totalSchools.textContent = data.estadisticas.total_escuelas;
  if (totalProducts)
    totalProducts.textContent = data.estadisticas.total_materiales;
  if (pendingOrders)
    pendingOrders.textContent = data.estadisticas.pedidos_pendientes;
  if (criticalAlerts)
    criticalAlerts.textContent = data.estadisticas.alertas_criticas;

  loadSchools();
  updateMaterialsTable(data.materiales || []);
  loadCategories();
  loadUsers();
  loadAlerts();
  loadPendingOrders();

  // ============================================
  // 7. BOTONES DE ACCION
  // ============================================

  document
    .getElementById("addSchoolBtn")
    ?.addEventListener("click", () =>
      alert("Funcion: Agregar escuela (en desarrollo)")
    );
  document
    .getElementById("addProductBtn")
    ?.addEventListener("click", () =>
      alert("Funcion: Agregar material (en desarrollo)")
    );
  document
    .getElementById("addCategoryBtn")
    ?.addEventListener("click", () =>
      alert("Funcion: Agregar categoria (en desarrollo)")
    );
  document
    .getElementById("addUserBtn")
    ?.addEventListener("click", () =>
      alert("Funcion: Agregar usuario (en desarrollo)")
    );

  document
    .getElementById("exportInventoryBtn")
    ?.addEventListener("click", () => alert("Exportando inventario..."));
  document
    .getElementById("exportOrdersBtn")
    ?.addEventListener("click", () => alert("Exportando pedidos..."));

  document.getElementById("markAllReadBtn")?.addEventListener("click", () => {
    alert("Todas las alertas marcadas como leidas");
  });

  document
    .getElementById("viewAllOrdersBtn")
    ?.addEventListener("click", () => switchSection("pedidos"));

  document.getElementById("generateReportBtn")?.addEventListener("click", () => {
    document.getElementById("reportPeriod").value = "mes";
    document.getElementById("customDateRange").style.display = "none";
  });

  document.getElementById("reportPeriod")?.addEventListener("change", function () {
    const customRange = document.getElementById("customDateRange");
    if (customRange) {
      customRange.style.display =
        this.value === "personalizado" ? "flex" : "none";
    }
  });

  document.getElementById("logoutBtn")?.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Cerrar sesion?")) {
      document.getElementById("logoutForm")?.submit();
    }
  });

  console.log("Dashboard conectado a PostgreSQL");
});

// ============================================
// VARIABLES GLOBALES
// ============================================
let searchTimeout = null;
let currentUserId = null;
let currentMaterialId = null;
let currentStockId = null;
let currentEscuelaId = null;

// ============================================
// FILTROS EN TIEMPO REAL
// ============================================

function initMaterialFilters() {
  const searchInput = document.getElementById("searchInventory");
  const tipoFilter = document.getElementById("filterCategory");
  const escuelaFilter = document.getElementById("filterSchool");

  function aplicarFiltros() {
    const params = new URLSearchParams({
      busqueda: searchInput?.value || "",
      tipo: tipoFilter?.value || "",
      escuela: escuelaFilter?.value || "",
    });

    fetch(`/api/filtrar-materiales/?${params}`)
      .then((response) => response.json())
      .then((data) => {
        actualizarTablaMateriales(data.data);
      });
  }

  searchInput?.addEventListener("input", aplicarFiltros);
  tipoFilter?.addEventListener("change", aplicarFiltros);
  escuelaFilter?.addEventListener("change", aplicarFiltros);
}

function actualizarTablaMateriales(materiales) {
  const tbody = document.getElementById("inventoryTableBody");
  if (!tbody) return;

  if (!materiales || materiales.length === 0) {
    tbody.innerHTML = `
        <tr>
            <td colspan="8" style="text-align: center; padding: 60px 20px;">
                <div style="text-align: center;">
                    <i class="fas fa-box-open" style="font-size: 4rem; color: #dee2e6;"></i>
                    <h3 style="color: #6c757d;">No se encontraron materiales</h3>
                </div>
            </td>
        </tr>
        `;
    return;
  }

  updateMaterialsTable(materiales);
}

function initUserFilters() {
  const searchInput = document.getElementById("searchUsers");
  const rolFilter = document.getElementById("filterUserRole");
  const estadoFilter = document.getElementById("filterUserStatus");
  const escuelaFilter = document.getElementById("filterUserSchool");

  function aplicarFiltros() {
    const params = new URLSearchParams({
      busqueda: searchInput?.value || "",
      rol: rolFilter?.value || "",
      estado: estadoFilter?.value || "",
      escuela: escuelaFilter?.value || "",
    });

    fetch(`/api/filtrar-usuarios/?${params}`)
      .then((response) => response.json())
      .then((data) => {
        actualizarTablaUsuarios(data.data);
      });
  }

  searchInput?.addEventListener("input", aplicarFiltros);
  rolFilter?.addEventListener("change", aplicarFiltros);
  estadoFilter?.addEventListener("change", aplicarFiltros);
  escuelaFilter?.addEventListener("change", aplicarFiltros);
}

function actualizarTablaUsuarios(usuarios) {
  const tbody = document.getElementById("usersTableBody");
  if (!tbody) return;

  let html = "";
  usuarios.forEach((user) => {
    html += `<tr>
            <td>USER${user.id}</td>
            <td><strong>${user.username}</strong></td>
            <td>${user.first_name || "-"}</td>
            <td>${user.last_name || "-"}</td>
            <td>${user.email || "-"}</td>
            <td>
                <span class="role-badge ${
                  user.rol === "Administrador" ? "role-admin" : "role-escuela"
                }">
                    ${user.rol}
                </span>
            </td>
            <td>${user.escuela}</td>
            <td>${user.telefono || "-"}</td>
            <td>
                <span class="status-badge ${
                  user.activo ? "status-in-stock" : "status-out-of-stock"
                }">
                    ${user.activo ? "Activo" : "Inactivo"}
                </span>
            </td>
            <td>${user.ultimo_acceso}</td>
            <td>
                <div style="display: flex; gap: 5px;">
                    <button class="action-btn edit" data-id="${
                      user.id
                    }"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" data-id="${
                      user.id
                    }"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`;
  });

  tbody.innerHTML = html;
}

initMaterialFilters();
initUserFilters();

// ============================================
// FUNCIONALIDADES PARA GESTION DE USUARIOS
// ============================================

function initUserActions() {
  document.getElementById("addUserBtn")?.addEventListener("click", function () {
    showUserForm();
  });

  document.getElementById("cancelUserBtn")?.addEventListener("click", function () {
    hideUserForm();
  });

  document
    .getElementById("userFormElement")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      saveUser();
    });

  document.querySelectorAll("#usersTableBody .action-btn.edit").forEach((btn) => {
    btn.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      editUser(userId);
    });
  });

  document.querySelectorAll("#usersTableBody .action-btn.delete").forEach((btn) => {
    btn.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      deleteUser(userId);
    });
  });

  document.querySelectorAll("#usersTableBody .action-btn.view").forEach((btn) => {
    btn.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-ban")) {
        toggleUserStatus(userId, false);
      } else if (icon.classList.contains("fa-check-circle")) {
        toggleUserStatus(userId, true);
      }
    });
  });

  const searchInput = document.getElementById("searchUsers");
  const roleFilter = document.getElementById("filterUserRole");
  const statusFilter = document.getElementById("filterUserStatus");
  const schoolFilter = document.getElementById("filterUserSchool");

  if (searchInput) searchInput.addEventListener("input", filterUsers);
  if (roleFilter) roleFilter.addEventListener("change", filterUsers);
  if (statusFilter) statusFilter.addEventListener("change", filterUsers);
  if (schoolFilter) schoolFilter.addEventListener("change", filterUsers);
}

function showUserForm(userId = null) {
  currentUserId = userId;
  const form = document.getElementById("userForm");
  const title = document.getElementById("userFormTitle");

  if (!form) return;

  document.getElementById("userFormElement").reset();

  if (userId) {
    title.innerHTML = '<i class="fas fa-user-edit"></i> Editar Usuario';

    const user = window.djangoData?.usuarios?.find((u) => u.id == userId);
    if (user) {
      document.getElementById("username").value = user.username || "";
      document.getElementById("first_name").value = user.first_name || "";
      document.getElementById("last_name").value = user.last_name || "";
      document.getElementById("email").value = user.email || "";
      document.getElementById("userRole").value = user.rol || "";
      document.getElementById("userSchool").value = user.escuela_id || "";
      document.getElementById("nro_tlf").value = user.nro_tlf || "";
      document.getElementById("is_active").value = user.is_active
        ? "true"
        : "false";

      document.getElementById("password").value = "";
      document.getElementById("confirm_password").value = "";

      document.querySelector("#password").parentElement.querySelector(
        "small"
      ).textContent = "Dejar en blanco para mantener la contrasena actual";
    }
  } else {
    title.innerHTML = '<i class="fas fa-user-plus"></i> Nuevo Usuario';
    document.getElementById("is_active").value = "true";
    document.querySelector("#password").parentElement.querySelector(
      "small"
    ).textContent = "Minimo 8 caracteres";
  }

  form.style.display = "block";
  form.scrollIntoView({ behavior: "smooth" });
}

function hideUserForm() {
  document.getElementById("userForm").style.display = "none";
  currentUserId = null;
}

function saveUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const rol = document.getElementById("userRole").value;

  if (!username || !email || !rol) {
    showNotification("error", "Por favor completa los campos requeridos (*)");
    return;
  }

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  if (!currentUserId && password.length < 8) {
    showNotification("error", "La contrasena debe tener al menos 8 caracteres");
    return;
  }

  if (password !== confirmPassword) {
    showNotification("error", "Las contrasenas no coinciden");
    return;
  }

  const userData = {
    username: username,
    first_name: document.getElementById("first_name").value.trim(),
    last_name: document.getElementById("last_name").value.trim(),
    email: email,
    rol: rol,
    admin_of: document.getElementById("userSchool").value || null,
    nro_tlf: document.getElementById("nro_tlf").value.trim() || null,
    is_active: document.getElementById("is_active").value === "true",
  };

  if (password) {
    userData.password = password;
  }

  const url = currentUserId ? `/api/usuarios/${currentUserId}/` : "/api/usuarios/";
  const method = currentUserId ? "PUT" : "POST";

  showNotification("info", "Guardando usuario...");

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken(),
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    })
    .then((data) => {
      showNotification(
        "success",
        currentUserId
          ? "Usuario actualizado correctamente"
          : "Usuario creado correctamente"
      );
      hideUserForm();
      refreshUserData();
    })
    .catch((error) => {
      console.error("Error:", error);
      let errorMsg = "Error al guardar usuario";
      if (error.error) {
        errorMsg = error.error;
      } else if (error.email) {
        errorMsg = "El email ya esta registrado";
      } else if (error.username) {
        errorMsg = "El nombre de usuario ya existe";
      }
      showNotification("error", errorMsg);
    });
}

function editUser(userId) {
  showUserForm(userId);
}

function deleteUser(userId) {
  showConfirmModal(
    "Eliminar Usuario",
    "Estas seguro de eliminar este usuario? Esta accion no se puede deshacer.",
    function () {
      fetch(`/api/usuarios/${userId}/`, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": getCsrfToken(),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar usuario");
          }
          showNotification("success", "Usuario eliminado correctamente");
          refreshUserData();
        })
        .catch((error) => {
          console.error("Error:", error);
          showNotification("error", "Error al eliminar usuario");
        });
    }
  );
}

function toggleUserStatus(userId, activate) {
  const action = activate ? "activar" : "desactivar";
  showConfirmModal(
    `${activate ? "Activar" : "Desactivar"} Usuario`,
    `Estas seguro de ${action} este usuario?`,
    function () {
      fetch(`/api/usuarios/${userId}/toggle-status/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify({ activate: activate }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cambiar estado");
          }
          return response.json();
        })
        .then((data) => {
          showNotification("success", data.message);
          refreshUserData();
        })
        .catch((error) => {
          console.error("Error:", error);
          showNotification("error", "Error al cambiar estado del usuario");
        });
    }
  );
}

function filterUsers() {
  const searchTerm =
    document.getElementById("searchUsers")?.value.toLowerCase() || "";
  const roleFilter = document.getElementById("filterUserRole")?.value || "";
  const statusFilter = document.getElementById("filterUserStatus")?.value || "";
  const schoolFilter = document.getElementById("filterUserSchool")?.value || "";

  const usuarios = window.djangoData?.usuarios || [];

  const filtered = usuarios.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      (user.username && user.username.toLowerCase().includes(searchTerm)) ||
      (user.first_name && user.first_name.toLowerCase().includes(searchTerm)) ||
      (user.last_name && user.last_name.toLowerCase().includes(searchTerm)) ||
      (user.email && user.email.toLowerCase().includes(searchTerm));

    const matchesRole = roleFilter === "" || user.rol === roleFilter;

    let matchesStatus = true;
    if (statusFilter !== "") {
      const isActive = statusFilter === "true";
      matchesStatus = user.is_active === isActive;
    }

    const matchesSchool =
      schoolFilter === "" ||
      (user.escuela_id && user.escuela_id.toString() === schoolFilter);

    return matchesSearch && matchesRole && matchesStatus && matchesSchool;
  });

  updateUsersTable(filtered);
}

function updateUsersTable(usuarios) {
  const tbody = document.getElementById("usersTableBody");
  if (!tbody) return;

  let html = "";

  if (usuarios.length === 0) {
    html = `
        <tr>
            <td colspan="11" style="text-align: center; padding: 60px 20px;">
                <div style="text-align: center;">
                    <i class="fas fa-users" style="font-size: 4rem; color: #dee2e6; margin-bottom: 20px;"></i>
                    <h3 style="color: #6c757d; margin-bottom: 10px;">No se encontraron usuarios</h3>
                    <p style="color: #adb5bd;">Prueba con otros filtros</p>
                </div>
            </td>
        </tr>
        `;
  } else {
    usuarios.forEach((user) => {
      html += generateUserRow(user);
    });
  }

  tbody.innerHTML = html;

  document.querySelectorAll(".stats-cards-mini h3").forEach((el, index) => {
    if (index === 0) el.textContent = usuarios.length;
  });

  initUserActions();
}

function generateUserRow(user) {
  const escuelaNombre = user.escuela_nombre || user.admin_of?.name || "Sistema";
  const telefono = user.nro_tlf || user.telefono || "-";
  const ultimoAcceso = user.last_login
    ? new Date(user.last_login).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Nunca";

  return `
    <tr style="border-bottom: 1px solid #e9ecef;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='transparent'">
        <td style="padding: 12px 10px;">
            <span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">
                USER${user.id}
            </span>
        </td>
        <td style="padding: 12px 10px; font-weight: 600;">${user.username || ""}</td>
        <td style="padding: 12px 10px;">${user.first_name || "-"}</td>
        <td style="padding: 12px 10px;">${user.last_name || "-"}</td>
        <td style="padding: 12px 10px;">
            <span style="color: #007bff;">
                <i class="fas fa-envelope" style="font-size: 0.8rem; margin-right: 5px;"></i>${user.email || "-"}
            </span>
        </td>
        <td style="padding: 12px 10px;">
            ${
              user.rol === "ADMIN"
                ? '<span style="background: #cce5ff; color: #004085; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-crown"></i> Administrador</span>'
                : '<span style="background: #d4edda; color: #155724; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-school"></i> Escuela</span>'
            }
        </td>
        <td style="padding: 12px 10px;">
            ${
              escuelaNombre !== "Sistema"
                ? `<span style="background: #e2e3e5; color: #383d41; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">
                    <i class="fas fa-map-marker-alt"></i> ${escuelaNombre}
                </span>`
                : '<span style="color: #6c757d;"><i class="fas fa-globe"></i> Sistema</span>'
            }
        </td>
        <td style="padding: 12px 10px;">
            ${
              telefono !== "-"
                ? `<span style="background: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">
                    <i class="fas fa-phone"></i> ${telefono}
                </span>`
                : '<span style="color: #adb5bd;">-</span>'
            }
        </td>
        <td style="padding: 12px 10px;">
            ${
              user.is_active
                ? '<span style="background: #d4edda; color: #155724; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-check-circle"></i> Activo</span>'
                : '<span style="background: #f8d7da; color: #721c24; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-times-circle"></i> Inactivo</span>'
            }
        </td>
        <td style="padding: 12px 10px;">
            <span style="color: #6c757d; font-size: 0.85rem;">
                <i class="fas fa-clock"></i> ${ultimoAcceso}
            </span>
        </td>
        <td style="padding: 12px 10px;">
            <div style="display: flex; gap: 5px;">
                <button class="action-btn edit" data-id="${
                  user.id
                }" title="Editar usuario" 
                    style="background: #007bff; border: none; color: white; width: 32px; height: 32px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" data-id="${
                  user.id
                }" title="Eliminar usuario" 
                    style="background: #dc3545; border: none; color: white; width: 32px; height: 32px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
                ${
                  user.is_active
                    ? `<button class="action-btn view" data-id="${
                        user.id
                      }" title="Desactivar usuario" 
                        style="background: #ffc107; border: none; color: #212529; width: 32px; height: 32px; border-radius: 4px; cursor: pointer;">
                        <i class="fas fa-ban"></i>
                    </button>`
                    : `<button class="action-btn view" data-id="${
                        user.id
                      }" title="Activar usuario" 
                        style="background: #28a745; border: none; color: white; width: 32px; height: 32px; border-radius: 4px; cursor: pointer;">
                        <i class="fas fa-check-circle"></i>
                    </button>`
                }
            </div>
        </td>
    </tr>
    `;
}

// ============================================
// FUNCIONALIDADES PARA GESTION DE INVENTARIO
// ============================================

function initInventoryActions() {
  console.log("Inicializando acciones de inventario...");

  document.getElementById("addProductBtn")?.addEventListener("click", function () {
    showMaterialForm();
  });

  document.getElementById("cancelProductBtn")?.addEventListener("click", function () {
    hideMaterialForm();
  });

  document.getElementById("exportInventoryBtn")?.addEventListener("click", function () {
    exportInventory();
  });

  document.getElementById("refreshStockBtn")?.addEventListener("click", function () {
    refreshAllStocks();
  });

  document
    .getElementById("productFormElement")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      saveMaterial();
    });

  document.querySelectorAll("#inventoryTableBody .action-btn.edit").forEach((btn) => {
    btn.addEventListener("click", function () {
      const materialId = this.getAttribute("data-id");
      editMaterial(materialId);
    });
  });

  document.querySelectorAll("#inventoryTableBody .action-btn.delete").forEach((btn) => {
    btn.addEventListener("click", function () {
      const materialId = this.getAttribute("data-id");
      deleteMaterial(materialId);
    });
  });

  const searchInput = document.getElementById("searchInventory");
  const tipoFilter = document.getElementById("filterCategory");
  const escuelaFilter = document.getElementById("filterSchool");

  if (searchInput) {
    searchInput.addEventListener("input", debounce(filterMaterials, 300));
  }
  if (tipoFilter) {
    tipoFilter.addEventListener("change", filterMaterials);
  }
  if (escuelaFilter) {
    escuelaFilter.addEventListener("change", filterMaterials);
  }

  initTooltips();
}

function showMaterialForm(materialId = null) {
  currentMaterialId = materialId;
  const form = document.getElementById("productForm");
  const title = document.getElementById("productFormTitle");

  if (!form) return;

  document.getElementById("productFormElement").reset();

  const tipoSelect = document.getElementById("productTipo");
  const unidadSelect = document.getElementById("productUnidad");

  tipoSelect.innerHTML =
    '<option value="" disabled selected>Cargando tipos...</option>';
  unidadSelect.innerHTML =
    '<option value="" disabled selected>Cargando unidades...</option>';

  fetch("/api/tipos-material/")
    .then((response) => response.json())
    .then((data) => {
      let options =
        '<option value="" disabled selected>Seleccionar tipo</option>';
      data.tipos.forEach((tipo) => {
        options += `<option value="${tipo.valor}">${tipo.etiqueta}</option>`;
      });
      tipoSelect.innerHTML = options;

      if (materialId) {
        const material = window.djangoData?.materiales?.find(
          (m) => m.id == materialId
        );
        if (material && material.tipo) {
          tipoSelect.value = material.tipo;
        }
      }
    })
    .catch((error) => {
      console.error("Error cargando tipos:", error);
      const tiposLocales = [
        { valor: "MADERA", etiqueta: "Maderas y Trozos" },
        { valor: "BARNIZ", etiqueta: "Barnices y Pinturas" },
        { valor: "HERRAJE", etiqueta: "Herrajes y Piezas" },
        { valor: "CUERDAS", etiqueta: "Cuerdas" },
        { valor: "HERRAMIENTA", etiqueta: "Herramientas" },
        { valor: "OTRO", etiqueta: "Otros" },
      ];
      let options =
        '<option value="" disabled selected>Seleccionar tipo</option>';
      tiposLocales.forEach((tipo) => {
        options += `<option value="${tipo.valor}">${tipo.etiqueta}</option>`;
      });
      tipoSelect.innerHTML = options;
    });

  fetch("/api/unidades-material/")
    .then((response) => response.json())
    .then((data) => {
      let options =
        '<option value="" disabled selected>Seleccionar unidad</option>';
      data.unidades.forEach((unidad) => {
        options += `<option value="${unidad.valor}">${unidad.etiqueta}</option>`;
      });
      unidadSelect.innerHTML = options;

      if (materialId) {
        const material = window.djangoData?.materiales?.find(
          (m) => m.id == materialId
        );
        if (material && material.unidad) {
          unidadSelect.value = material.unidad;
        }
      }
    })
    .catch((error) => {
      console.error("Error cargando unidades:", error);
      const unidadesLocales = [
        { valor: "KILOS", etiqueta: "Kilogramos" },
        { valor: "LITROS", etiqueta: "Litros" },
        { valor: "PIEZAS", etiqueta: "Piezas" },
        { valor: "TABLONES", etiqueta: "Tableros" },
        { valor: "LAMINAS", etiqueta: "Laminas" },
      ];
      let options =
        '<option value="" disabled selected>Seleccionar unidad</option>';
      unidadesLocales.forEach((unidad) => {
        options += `<option value="${unidad.valor}">${unidad.etiqueta}</option>`;
      });
      unidadSelect.innerHTML = options;
    });

  if (materialId) {
    title.innerHTML = '<i class="fas fa-edit"></i> Editar Material';

    const material = window.djangoData?.materiales?.find((m) => m.id == materialId);
    if (material) {
      document.getElementById("productName").value = material.name || "";
      document.getElementById("productDesc").value = material.desc || "";
    }
  } else {
    title.innerHTML = '<i class="fas fa-plus-circle"></i> Agregar Nuevo Material';
  }

  form.style.display = "block";
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function hideMaterialForm() {
  document.getElementById("productForm").style.display = "none";
  currentMaterialId = null;
}

function saveMaterial() {
  const name = document.getElementById("productName").value.trim();
  const tipo = document.getElementById("productTipo").value;
  const unidad = document.getElementById("productUnidad").value;

  if (!name) {
    showNotification("error", "El nombre del material es requerido");
    document.getElementById("productName").focus();
    return;
  }

  if (!tipo) {
    showNotification("error", "Debes seleccionar un tipo de material");
    document.getElementById("productTipo").focus();
    return;
  }

  if (!unidad) {
    showNotification("error", "Debes seleccionar una unidad de medida");
    document.getElementById("productUnidad").focus();
    return;
  }

  const materialData = {
    name: name,
    tipo: tipo,
    unidad: unidad,
    desc: document.getElementById("productDesc").value.trim() || "",
  };

  const url = currentMaterialId
    ? `/api/materiales/${currentMaterialId}/`
    : "/api/materiales/";
  const method = currentMaterialId ? "PUT" : "POST";

  showNotification("info", "Guardando material...");

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken(),
    },
    body: JSON.stringify(materialData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    })
    .then((data) => {
      showNotification(
        "success",
        currentMaterialId
          ? "Material actualizado correctamente"
          : "Material creado correctamente"
      );
      hideMaterialForm();
      refreshMaterialData();
    })
    .catch((error) => {
      console.error("Error:", error);
      let errorMsg = "Error al guardar material";
      if (error.error) {
        errorMsg = error.error;
      } else if (error.name) {
        errorMsg = "Ya existe un material con ese nombre";
      }
      showNotification("error", errorMsg);
    });
}

function editMaterial(materialId) {
  showMaterialForm(materialId);
}

function deleteMaterial(materialId) {
  showConfirmModal(
    "Eliminar Material",
    "Estas seguro de eliminar este material? Esta accion no se puede deshacer y afectara a todos los stocks relacionados.",
    function () {
      fetch(`/api/materiales/${materialId}/`, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": getCsrfToken(),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar material");
          }
          showNotification("success", "Material eliminado correctamente");
          refreshMaterialData();
        })
        .catch((error) => {
          console.error("Error:", error);
          showNotification(
            "error",
            "Error al eliminar material. Verifica que no tenga stocks asociados."
          );
        });
    }
  );
}

function filterMaterials() {
  const searchTerm =
    document.getElementById("searchInventory")?.value.toLowerCase() || "";
  const tipoFilter = document.getElementById("filterCategory")?.value || "";
  const escuelaFilter = document.getElementById("filterSchool")?.value || "";

  console.log("Filtrando por:", { searchTerm, tipoFilter, escuelaFilter });

  const params = new URLSearchParams({
    search: searchTerm,
    tipo: tipoFilter,
    escuela: escuelaFilter,
  });

  const tbody = document.getElementById("inventoryTableBody");
  if (tbody) {
    tbody.innerHTML =
      '<tr><td colspan="8" style="text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin"></i> Buscando...</td></tr>';
  }

  fetch(`/api/filtrar-materiales/?${params}`)
    .then((response) => response.json())
    .then((data) => {
      updateMaterialsTable(data.data || []);
    })
    .catch((error) => {
      console.error("Error en filtro:", error);
      showNotification("error", "Error al aplicar filtros, usando filtro local");
      filterMaterialsLocal(searchTerm, tipoFilter, escuelaFilter);
    });
}

function filterMaterialsLocal(searchTerm, tipoFilter, escuelaFilter) {
  const materiales = window.djangoData?.materiales || [];

  if (!searchTerm && !tipoFilter && !escuelaFilter) {
    updateMaterialsTable(materiales);
    return;
  }

  const filtered = materiales.filter((mat) => {
    let matchesSearch = true;
    if (searchTerm) {
      const id = `MAT${mat.id}`.toLowerCase();
      const name = (mat.name || "").toLowerCase();
      const tipo = (mat.tipo_display || mat.tipo || "").toLowerCase();
      const unidad = (mat.unidad || "").toLowerCase();
      const desc = (mat.desc || "").toLowerCase();
      const stockTotal = String(mat.stock_total || 0).toLowerCase();
      const stockMinimo = String(mat.stock_minimo || 5).toLowerCase();

      matchesSearch =
        id.includes(searchTerm) ||
        name.includes(searchTerm) ||
        tipo.includes(searchTerm) ||
        unidad.includes(searchTerm) ||
        desc.includes(searchTerm) ||
        stockTotal.includes(searchTerm) ||
        stockMinimo.includes(searchTerm);
    }

    const matchesTipo =
      !tipoFilter ||
      mat.tipo === tipoFilter ||
      mat.tipo_value === tipoFilter ||
      (mat.tipo_display &&
        mat.tipo_display.toLowerCase() === tipoFilter.toLowerCase());

    let matchesEscuela = true;
    if (escuelaFilter) {
      const stocks = window.djangoData?.stocks_por_escuela || [];
      const escuelaStocks = stocks.find((s) => s.escuela_id == escuelaFilter);
      matchesEscuela =
        escuelaStocks?.items?.some((item) => item.material_id == mat.id) || false;
    }

    return matchesSearch && matchesTipo && matchesEscuela;
  });

  console.log(
    `Filtro local: ${filtered.length} resultados de ${materiales.length} materiales`
  );
  updateMaterialsTable(filtered);
}

function attachMaterialButtonEvents() {
  document.querySelectorAll("#inventoryTableBody .action-btn.edit").forEach((btn) => {
    btn.removeEventListener("click", editMaterialHandler);
    btn.addEventListener("click", editMaterialHandler);
  });

  document.querySelectorAll("#inventoryTableBody .action-btn.delete").forEach((btn) => {
    btn.removeEventListener("click", deleteMaterialHandler);
    btn.addEventListener("click", deleteMaterialHandler);
  });

  document.querySelectorAll("#inventoryTableBody .action-btn.view").forEach((btn) => {
    btn.removeEventListener("click", viewMaterialDetails);
    btn.addEventListener("click", viewMaterialDetails);
  });
}

function editMaterialHandler(e) {
  const materialId = this.getAttribute("data-id");
  editMaterial(materialId);
}

function deleteMaterialHandler(e) {
  const materialId = this.getAttribute("data-id");
  deleteMaterial(materialId);
}

function viewMaterialDetails(e) {
  const materialId = this.getAttribute("data-id");
  const material = window.djangoData?.materiales?.find((m) => m.id == materialId);

  if (!material) return;

  const stocks = window.djangoData?.stocks_por_escuela || [];
  const materialStocks = [];

  stocks.forEach((escuela) => {
    const item = escuela.items?.find((i) => i.material_id == materialId);
    if (item) {
      materialStocks.push({
        escuela: escuela.escuela_nombre,
        cantidad: item.cantidad,
        minimo: item.minimo,
        estado: item.estado,
      });
    }
  });

  let stocksHtml = "";
  if (materialStocks.length === 0) {
    stocksHtml =
      '<p style="color: #6c757d; text-align: center;">No hay stock registrado para este material</p>';
  } else {
    stocksHtml = '<table style="width: 100%; margin-top: 10px;">';
    stocksHtml +=
      "<tr><th>Escuela</th><th>Cantidad</th><th>Minimo</th><th>Estado</th></tr>";
    materialStocks.forEach((s) => {
      let estadoColor =
        s.estado === "Normal"
          ? "#28a745"
          : s.estado === "Bajo Stock"
          ? "#ffc107"
          : "#dc3545";
      stocksHtml += `<tr>
                <td>${s.escuela}</td>
                <td style="font-weight: 600;">${s.cantidad}</td>
                <td>${s.minimo}</td>
                <td><span style="color: ${estadoColor}; font-weight: 600;">${
        s.estado
      }</span></td>
            </tr>`;
    });
    stocksHtml += "</table>";
  }

  const modalContent = `
        <h4 style="margin-top: 0;">${material.name}</h4>
        <p><strong>Tipo:</strong> ${material.tipo_display || material.tipo}</p>
        <p><strong>Unidad:</strong> ${material.unidad}</p>
        <p><strong>Descripcion:</strong> ${material.desc || "Sin descripcion"}</p>
        <hr>
        <h5>Stock por Escuela:</h5>
        ${stocksHtml}
    `;

  showModal("Detalles del Material", modalContent);
}

// ============================================
// FUNCIONALIDADES PARA STOCK POR ESCUELA
// ============================================

function initStockActions() {
  console.log("Inicializando acciones de stock...");

  // Botones para agregar stock
  document.querySelectorAll(".agregar-stock").forEach((btn) => {
    btn.onclick = function (e) {
      e.preventDefault();
      const escuelaId = this.dataset.escuelaId;
      const escuelaNombre = this.dataset.escuelaNombre;
      showStockForm(escuelaId, escuelaNombre);
    };
  });

  // Boton de actualizar stock
  const refreshBtn = document.getElementById("refreshStockBtn");
  if (refreshBtn) {
    refreshBtn.onclick = function (e) {
      e.preventDefault();
      refreshAllStocks();
    };
  }

  // Cerrar modal
  const closeBtn = document.getElementById("stockModalClose");
  if (closeBtn) {
    closeBtn.onclick = function (e) {
      e.preventDefault();
      hideStockModal();
    };
  }

  const cancelBtn = document.getElementById("cancelStockBtn");
  if (cancelBtn) {
    cancelBtn.onclick = function (e) {
      e.preventDefault();
      hideStockModal();
    };
  }

  // Envio del formulario
  const stockForm = document.getElementById("stockForm");
  if (stockForm) {
    stockForm.onsubmit = function (e) {
      e.preventDefault();
      saveStock();
    };
  }

  // Cargar stocks al iniciar
  refreshAllStocks();
}

function showStockForm(escuelaId, escuelaNombre, stockId = null) {
  console.log("Mostrando formulario:", { escuelaId, escuelaNombre, stockId });

  currentEscuelaId = escuelaId;
  currentStockId = stockId;

  const modal = document.getElementById("stockModal");
  const title = document.getElementById("stockModalTitle");
  const escuelaInput = document.getElementById("escuelaId");
  const stockIdInput = document.getElementById("stockId");
  const materialSelect = document.getElementById("materialSelect");
  const cantidadInput = document.getElementById("stockCantidad");
  const minimoInput = document.getElementById("stockMinimo");

  if (!modal || !title) return;

  escuelaInput.value = escuelaId;
  stockIdInput.value = stockId || "";

  // Resetear campos
  if (materialSelect) materialSelect.value = "";
  if (cantidadInput) cantidadInput.value = "";
  if (minimoInput) minimoInput.value = "";

  if (stockId) {
    title.innerHTML = `<i class="fas fa-edit"></i> Editar Stock en ${escuelaNombre}`;

    // Cargar datos del stock directamente desde la API
    fetch(`/api/stocks/${stockId}/`)
      .then((response) => response.json())
      .then((stock) => {
        console.log("Stock cargado:", stock);
        if (stock) {
          if (materialSelect) materialSelect.value = stock.material_id;
          if (cantidadInput) cantidadInput.value = stock.cantidad;
          if (minimoInput) minimoInput.value = stock.minimo;
        }
      })
      .catch((error) => {
        console.error("Error cargando stock:", error);
        showNotification("error", "Error al cargar los datos del stock");
      });
  } else {
    title.innerHTML = `<i class="fas fa-plus"></i> Agregar Material a ${escuelaNombre}`;
  }

  modal.style.display = "flex";
}

function hideStockModal() {
  const modal = document.getElementById("stockModal");
  if (modal) modal.style.display = "none";
  currentStockId = null;
  currentEscuelaId = null;
}

function saveStock() {
  const escuelaId = document.getElementById("escuelaId")?.value;
  const materialId = document.getElementById("materialSelect")?.value;
  const cantidad = parseInt(document.getElementById("stockCantidad")?.value);
  const minimo = parseInt(document.getElementById("stockMinimo")?.value);
  const stockId = document.getElementById("stockId")?.value;

  if (!escuelaId || !materialId || isNaN(cantidad) || isNaN(minimo)) {
    showNotification("error", "Por favor completa todos los campos");
    return;
  }

  const stockData = {
    escuela_id: escuelaId,
    material_id: materialId,
    cantidad: cantidad,
    minimo: minimo,
  };

  const url = stockId ? `/api/stocks/${stockId}/` : "/api/stocks/";
  const method = stockId ? "PUT" : "POST";

  console.log("Guardando stock:", { url, method, data: stockData });

  showNotification("info", "Guardando stock...");

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken(),
    },
    body: JSON.stringify(stockData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error || "Error al guardar");
        });
      }
      return response.json();
    })
    .then((data) => {
      showNotification("success", stockId ? "Stock actualizado" : "Stock creado");
      hideStockModal();
      refreshAllStocks();
    })
    .catch((error) => {
      console.error("Error:", error);
      showNotification("error", error.message || "Error al guardar stock");
    });
}

function refreshAllStocks() {
  console.log("Refrescando todos los stocks...");

  fetch("/api/stocks/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos de stocks:", data);

      // Limpiar todas las tablas primero
      document.querySelectorAll(".escuela-stock-card").forEach((card) => {
        const escuelaId = card.dataset.escuelaId;
        const tbody = document.getElementById(`stock-tbody-${escuelaId}`);
        const emptyDiv = document.getElementById(`stock-empty-${escuelaId}`);
        const totalSpan = document.querySelector(`.total-items-${escuelaId}`);

        if (tbody) tbody.innerHTML = "";
        if (emptyDiv) emptyDiv.style.display = "block";
        if (totalSpan) totalSpan.textContent = "0";
      });

      // Si no hay datos, terminar
      if (!data.data || data.data.length === 0) {
        return;
      }

      // Agrupar stocks por escuela
      const stocksPorEscuela = {};
      data.data.forEach((s) => {
        if (!stocksPorEscuela[s.inventario_id]) {
          stocksPorEscuela[s.inventario_id] = {
            nombre: s.inventario_nombre,
            items: [],
          };
        }
        stocksPorEscuela[s.inventario_id].items.push({
          id: s.id,
          material_id: s.material_id,
          material_nombre: s.material_nombre,
          cantidad: s.cantidad,
          minimo: s.minimo,
          estado: s.estado,
        });
      });

      // Actualizar cada escuela
      Object.keys(stocksPorEscuela).forEach((escuelaId) => {
        const escuela = stocksPorEscuela[escuelaId];
        const tbody = document.getElementById(`stock-tbody-${escuelaId}`);
        const emptyDiv = document.getElementById(`stock-empty-${escuelaId}`);
        const totalSpan = document.querySelector(`.total-items-${escuelaId}`);

        if (!tbody) return;

        if (escuela.items.length === 0) {
          if (emptyDiv) emptyDiv.style.display = "block";
          if (totalSpan) totalSpan.textContent = "0";
        } else {
          if (emptyDiv) emptyDiv.style.display = "none";
          if (totalSpan) totalSpan.textContent = escuela.items.length;

          let html = "";
          escuela.items.forEach((item) => {
            let estadoClass = "";
            let estadoText = "";

            if (item.cantidad === 0) {
              estadoClass = "status-out-of-stock";
              estadoText = "Agotado";
            } else if (item.cantidad < item.minimo) {
              estadoClass = "status-low-stock";
              estadoText = "Bajo Stock";
            } else {
              estadoClass = "status-in-stock";
              estadoText = "Normal";
            }

            html += `
            <tr>
              <td style="padding: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <i class="fas fa-cube" style="color: #6c757d;"></i>
                  <strong>${item.material_nombre}</strong>
                </div>
              </td>
              <td style="padding: 12px; text-align: center; font-weight: 600; color: #007bff;">
                ${item.cantidad}
              </td>
              <td style="padding: 12px; text-align: center; color: #6c757d;">
                ${item.minimo}
              </td>
              <td style="padding: 12px; text-align: center;">
                <span class="status-badge ${estadoClass}" style="display: inline-flex; align-items: center; gap: 5px; padding: 4px 8px; border-radius: 20px;">
                  ${estadoText}
                </span>
              </td>
              <td style="padding: 12px;">
                <span style="background: #e2e3e5; color: #383d41; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">
                  <i class="fas fa-map-pin"></i> ${escuela.nombre}
                </span>
              </td>
              <td style="padding: 12px; text-align: center;">
                <div style="display: flex; gap: 5px; justify-content: center;">
                  <button class="action-btn edit-stock" 
                    data-stock-id="${item.id}" 
                    data-escuela-id="${escuelaId}" 
                    data-escuela-nombre="${escuela.nombre}" 
                    style="background: #007bff; border: none; color: white; width: 32px; height: 32px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn delete-stock" 
                    data-stock-id="${item.id}" 
                    style="background: #dc3545; border: none; color: white; width: 32px; height: 32px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            `;
          });

          tbody.innerHTML = html;
        }
      });

      // Asignar eventos a los nuevos botones
      attachStockButtonEventsDirect();
      showNotification("success", "Stocks actualizados");
    })
    .catch((error) => {
      console.error("Error:", error);
      showNotification("error", "Error al cargar stocks");
    });
}

function attachStockButtonEventsDirect() {
  console.log("Asignando eventos a botones de stock");

  // Botones Editar
  document.querySelectorAll(".edit-stock").forEach((btn) => {
    btn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();

      const stockId = this.dataset.stockId;
      const escuelaId = this.dataset.escuelaId;
      const escuelaNombre = this.dataset.escuelaNombre;

      console.log("Editando stock:", { stockId, escuelaId, escuelaNombre });

      if (!stockId) {
        showNotification("error", "Error: ID de stock no encontrado");
        return;
      }

      showStockForm(escuelaId, escuelaNombre, stockId);
    };
  });

  // Botones Eliminar
  document.querySelectorAll(".delete-stock").forEach((btn) => {
    btn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();

      const stockId = this.dataset.stockId;

      console.log("Eliminando stock:", stockId);

      if (!stockId) {
        showNotification("error", "Error: ID de stock no encontrado");
        return;
      }

      if (confirm("Estas seguro de eliminar este stock?")) {
        fetch(`/api/stocks/${stockId}/`, {
          method: "DELETE",
          headers: {
            "X-CSRFToken": getCsrfToken(),
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al eliminar");
            }
            showNotification("success", "Stock eliminado");
            refreshAllStocks();
          })
          .catch((error) => {
            console.error("Error:", error);
            showNotification("error", "Error al eliminar stock");
          });
      }
    };
  });
}

// ============================================
// EXPORTAR INVENTARIO
// ============================================

function exportInventory() {
  const format = confirm(
    "Deseas exportar a Excel?\n\nAceptar = Excel\nCancelar = CSV"
  )
    ? "excel"
    : "csv";

  showNotification("info", `Generando archivo ${format.toUpperCase()}...`);

  fetch(`/api/exportar-inventario/?format=${format}`)
    .then((response) => {
      if (!response.ok) throw new Error("Error al exportar");
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `inventario_${new Date().toISOString().split("T")[0]}.${
        format === "excel" ? "xlsx" : "csv"
      }`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      showNotification("success", "Archivo exportado correctamente");
    })
    .catch((error) => {
      console.error("Error:", error);
      showNotification("error", "Error al exportar inventario");
    });
}

// ============================================
// REFRESCAR DATOS
// ============================================

function refreshMaterialData() {
  fetch("/api/materiales/")
    .then((response) => response.json())
    .then((data) => {
      if (window.djangoData) {
        window.djangoData.materiales = data.data || [];
      }
      filterMaterials();
    })
    .catch((error) => console.error("Error al recargar materiales:", error));
}

function refreshUserData() {
  fetch("/api/usuarios/")
    .then((response) => response.json())
    .then((data) => {
      if (window.djangoData) {
        window.djangoData.usuarios = data.data || [];
      }
      filterUsers();
    })
    .catch((error) => console.error("Error al recargar usuarios:", error));
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function getCsrfToken() {
  const name = "csrftoken";
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) return cookieValue;
  }
  return "";
}

function showNotification(type, message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

  switch (type) {
    case "success":
      notification.style.backgroundColor = "#28a745";
      notification.innerHTML = '<i class="fas fa-check-circle"></i> ' + message;
      break;
    case "error":
      notification.style.backgroundColor = "#dc3545";
      notification.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> ' + message;
      break;
    case "info":
      notification.style.backgroundColor = "#17a2b8";
      notification.innerHTML = '<i class="fas fa-info-circle"></i> ' + message;
      break;
    case "warning":
      notification.style.backgroundColor = "#ffc107";
      notification.style.color = "#212529";
      notification.innerHTML =
        '<i class="fas fa-exclamation-triangle"></i> ' + message;
      break;
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function showConfirmModal(title, message, onConfirm) {
  const modal = document.getElementById("confirmModal");
  const modalTitle = document.getElementById("confirmModalTitle");
  const modalContent = document.getElementById("confirmModalContent");
  const confirmBtn = document.getElementById("confirmActionBtn");
  const cancelBtn = document.getElementById("confirmCancelBtn");
  const closeBtn = document.getElementById("confirmModalClose");

  if (!modal) return;

  modalTitle.textContent = title;
  modalContent.innerHTML = `<p style="font-size: 1.1rem; color: #333;">${message}</p>`;
  modal.style.display = "flex";

  const closeModal = () => {
    modal.style.display = "none";
  };

  confirmBtn.onclick = () => {
    closeModal();
    if (onConfirm) onConfirm();
  };

  cancelBtn.onclick = closeModal;
  closeBtn.onclick = closeModal;

  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

function showModal(title, content) {
  const modal = document.getElementById("detailModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const closeBtn = document.getElementById("modalClose");

  if (!modal) return;

  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  modal.style.display = "flex";

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}

// ============================================
// ANIMACIONES
// ============================================

const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function initTooltips() {
  document.querySelectorAll("[title]").forEach((el) => {
    el.addEventListener("mouseenter", (e) => {
      const title = e.target.getAttribute("title");
      if (title) {
        // Implementacion simple de tooltips si se desea
      }
    });
  });
}

// Debounce para busqueda
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// INICIALIZACION FINAL
// ============================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    initInventoryActions();
    initStockActions();
    initUserActions();
  });
} else {
  initInventoryActions();
  initStockActions();
  initUserActions();
}

// ============================================
// CODIGO DE EMERGENCIA
// ============================================
setInterval(function () {
  console.log("Verificando botones...");

  // Forzar eventos a TODOS los botones cada 2 segundos
  document.querySelectorAll(".edit-stock, .delete-stock").forEach((btn) => {
    // Eliminar eventos anteriores
    btn.onclick = null;

    if (btn.classList.contains("edit-stock")) {
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const stockId = this.dataset.stockId;
        const escuelaId = this.dataset.escuelaId;
        const escuelaNombre = this.dataset.escuelaNombre;

        if (!stockId) {
          alert("ERROR: No hay stockId");
          return;
        }

        // Mostrar formulario directamente
        currentStockId = stockId;
        currentEscuelaId = escuelaId;

        const modal = document.getElementById("stockModal");
        document.getElementById("stockModalTitle").innerHTML = `<i class="fas fa-edit"></i> Editar Stock en ${escuelaNombre}`;
        document.getElementById("escuelaId").value = escuelaId;
        document.getElementById("stockId").value = stockId;

        // Cargar datos
        fetch(`/api/stocks/${stockId}/`)
          .then((r) => r.json())
          .then((s) => {
            document.getElementById("materialSelect").value = s.material_id;
            document.getElementById("stockCantidad").value = s.cantidad;
            document.getElementById("stockMinimo").value = s.minimo;
            modal.style.display = "flex";
          });
      };
    }

    if (btn.classList.contains("delete-stock")) {
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const stockId = this.dataset.stockId;

        if (confirm("Eliminar stock?")) {
          fetch(`/api/stocks/${stockId}/`, {
            method: "DELETE",
            headers: { "X-CSRFToken": getCsrfToken() },
          }).then(() => {
            alert("Eliminado");
            location.reload(); // FORZAR RECARGA
          });
        }
      };
    }
  });
}, 2000); // Cada 2 segundos

// ============================================
// REPORTES PARA ADMIN
// ============================================

let reporteActual = null;

function cargarEstadisticasReportes() {
  Promise.all([
    fetch("/api/reporte-inventario-admin/").then((r) => r.json()),
    fetch("/api/reporte-consumo-admin/?periodo=mes").then((r) => r.json()),
    fetch("/api/reporte-pedidos-admin/").then((r) => r.json()),
    fetch("/api/reporte-alertas-admin/").then((r) => r.json()),
  ])
    .then((responses) => {
      const [inventario, consumo, pedidos, alertas] = responses;

      if (inventario.success) {
        document.getElementById("totalMaterialesReport").textContent =
          inventario.estadisticas?.total_materiales || 0;
      }
      if (consumo.success) {
        document.getElementById("totalMovimientosReport").textContent =
          consumo.estadisticas?.total_movimientos || 0;
      }
      if (pedidos.success) {
        document.getElementById("totalPedidosReport").textContent =
          pedidos.estadisticas?.total_pedidos || 0;
      }
      if (alertas.success) {
        document.getElementById("totalAlertasReport").textContent =
          alertas.estadisticas?.total_alertas || 0;
      }
    })
    .catch((error) => {
      console.error("Error cargando estadisticas:", error);
    });
}

function generarReporte(tipo, periodo) {
  let url = "";
  let titulo = "";

  if (tipo === "inventario") {
    url = "/api/reporte-inventario-admin/";
    titulo = "Inventario General";
  } else if (tipo === "consumo") {
    url = "/api/reporte-consumo-admin/?periodo=" + periodo;
    titulo =
      "Consumo " +
      (periodo === "mes"
        ? "Mensual"
        : periodo === "trimestre"
        ? "Trimestral"
        : periodo === "semestre"
        ? "Semestral"
        : "Anual");
  } else if (tipo === "pedidos") {
    url = "/api/reporte-pedidos-admin/?periodo=" + periodo;
    titulo = "Historial de Pedidos";
  } else if (tipo === "alertas") {
    url = "/api/reporte-alertas-admin/";
    titulo = "Reporte de Alertas";
  } else {
    return;
  }

  // Mostrar loading
  document.getElementById("reportPreviewContainer").style.display = "block";
  document.getElementById("reportPreview").innerHTML =
    '<p style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Generando reporte...</p>';
  document.getElementById("reportPreviewTitle").textContent = titulo;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Error al generar reporte");
      return response.json();
    })
    .then((data) => {
      if (!data.success) throw new Error(data.error || "Error desconocido");

      reporteActual = { tipo, periodo, data };
      mostrarVistaPreviaReporte(tipo, data);
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("reportPreview").innerHTML = `<p style="color:#dc3545;">Error: ${error.message}</p>`;
    });
}

function mostrarVistaPreviaReporte(tipo, data) {
  let html = "";

  // Informacion general
  html += '<div style="margin-bottom:20px;">';
  html += `<p><strong>Fecha de generacion:</strong> ${new Date().toLocaleString()}</p>`;

  if (data.estadisticas) {
    html += "<h4>Estadisticas:</h4><ul>";
    for (let key in data.estadisticas) {
      if (key !== "por_escuela" && typeof data.estadisticas[key] !== "object") {
        let label = key.replace(/_/g, " ");
        html += `<li><strong>${label}:</strong> ${data.estadisticas[key]}</li>`;
      }
    }
    html += "</ul>";
  }
  html += "</div>";

  // Datos detallados
  if (tipo === "inventario" && data.data && data.data.length > 0) {
    html += '<table style="width:100%; border-collapse:collapse;">';
    html +=
      '<thead><tr style="background:#f8f9fa;"><th>Escuela</th><th>Material</th><th>Tipo</th><th>Cantidad</th><th>Minimo</th><th>Estado</th></tr></thead><tbody>';
    data.data.slice(0, 30).forEach((item) => {
      let estadoClass =
        item.estado === "Agotado"
          ? "status-out-of-stock"
          : item.estado === "Bajo Stock"
          ? "status-low-stock"
          : "status-in-stock";
      html += `<tr>
                <td>${item.escuela}</td>
                <td>${item.material}</td>
                <td>${item.tipo}</td>
                <td>${item.cantidad}</td>
                <td>${item.minimo}</td>
                <td><span class="status-badge ${estadoClass}">${item.estado}</span></td>
            </tr>`;
    });
    if (data.data.length > 30) {
      html += `<tr><td colspan="6">... y ${data.data.length - 30} mas</td></tr>`;
    }
    html += "</tbody></table>";
  } else if (tipo === "consumo" && data.por_material && data.por_material.length > 0) {
    html += "<h4>Consumo por Material</h4>";
    html += '<table style="width:100%; border-collapse:collapse;">';
    html +=
      '<thead><tr style="background:#f8f9fa;"><th>Material</th><th>Total Consumido</th><th>Veces</th></tr></thead><tbody>';
    data.por_material.forEach((item) => {
      html += `<tr><td>${item.material}</td><td>${item.total_consumido}</td><td>${item.veces}</td></tr>`;
    });
    html += "</tbody></table>";

    if (data.por_escuela && data.por_escuela.length > 0) {
      html += '<h4 style="margin-top:20px;">Consumo por Escuela</h4>';
      html += '<table style="width:100%; border-collapse:collapse;">';
      html +=
        '<thead><tr style="background:#f8f9fa;"><th>Escuela</th><th>Total Consumido</th><th>Movimientos</th></tr></thead><tbody>';
      data.por_escuela.forEach((item) => {
        html += `<tr><td>${item.escuela}</td><td>${item.total_consumido}</td><td>${item.movimientos}</td></tr>`;
      });
      html += "</tbody></table>";
    }
  } else if (tipo === "pedidos" && data.data && data.data.length > 0) {
    html += '<table style="width:100%; border-collapse:collapse;">';
    html +=
      '<thead><tr style="background:#f8f9fa;"><th>Fecha</th><th>Escuela</th><th>Material</th><th>Cantidad</th><th>Estado</th></tr></thead><tbody>';
    data.data.slice(0, 30).forEach((item) => {
      html += `<tr>
                <td>${new Date(item.fecha).toLocaleDateString()}</td>
                <td>${item.escuela}</td>
                <td>${item.material}</td>
                <td>${item.cantidad}</td>
                <td>${item.estado}</td>
            </tr>`;
    });
    if (data.data.length > 30) {
      html += `<tr><td colspan="5">... y ${data.data.length - 30} mas</td></tr>`;
    }
    html += "</tbody></table>";
  } else if (tipo === "alertas" && data.data && data.data.length > 0) {
    html += '<table style="width:100%; border-collapse:collapse;">';
    html +=
      '<thead><tr style="background:#f8f9fa;"><th>Fecha</th><th>Escuela</th><th>Material</th><th>Mensaje</th><th>Estado</th></tr></thead><tbody>';
    data.data.slice(0, 30).forEach((item) => {
      html += `<tr>
                <td>${new Date(item.fecha).toLocaleDateString()}</td>
                <td>${item.escuela || "N/A"}</td>
                <td>${item.material}</td>
                <td>${item.mensaje}</td>
                <td><span class="status-badge ${
                  item.resuelto ? "status-in-stock" : "status-out-of-stock"
                }">${item.estado}</span></td>
            </tr>`;
    });
    if (data.data.length > 30) {
      html += `<tr><td colspan="5">... y ${data.data.length - 30} mas</td></tr>`;
    }
    html += "</tbody></table>";
  } else {
    html += "<p>No hay datos para mostrar en este periodo.</p>";
  }

  document.getElementById("reportPreview").innerHTML = html;
}

function exportarReporteExcel(tipo, periodo) {
  let url = "/api/exportar-reporte-admin-excel/?tipo=" + tipo;
  if (periodo && tipo !== "inventario" && tipo !== "alertas") {
    url += "&periodo=" + periodo;
  }
  window.open(url, "_blank");
}

// Event listeners
document.getElementById("generateReportBtn")?.addEventListener("click", function () {
  const tipo = document.getElementById("reportType").value;
  const periodo = document.getElementById("reportPeriod").value;
  generarReporte(tipo, periodo);
});

document.getElementById("exportReportBtn")?.addEventListener("click", function () {
  if (!reporteActual) {
    alert("Primero genera un reporte");
    return;
  }
  exportarReporteExcel(reporteActual.tipo, reporteActual.periodo);
});

document.getElementById("closePreviewBtn")?.addEventListener("click", function () {
  document.getElementById("reportPreviewContainer").style.display = "none";
  reporteActual = null;
});

// ============================================
// GESTION DE PEDIDOS PARA ADMIN
// ============================================

let pedidosData = [];
let filtroActual = "";

function cargarPedidosAdmin() {
  const tbody = document.getElementById("pedidosTableBody");
  if (!tbody) {
    console.error("No se encontro el elemento pedidosTableBody");
    return;
  }

  tbody.innerHTML =
    '<tr><td colspan="8" style="text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin"></i> Cargando pedidos...</td></tr>';

  console.log("Cargando pedidos desde API...");

  // Usar fetch normal
  fetch("/api/pedidos-admin/")
    .then((response) => {
      console.log("Status respuesta:", response.status);
      if (!response.ok) {
        throw new Error("Error al cargar pedidos: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos recibidos:", data);

      if (!data.success) throw new Error(data.error || "Error desconocido");

      pedidosData = data.data || [];
      actualizarEstadisticasPedidos(data.stats);
      renderizarTablaPedidos(pedidosData);
    })
    .catch((error) => {
      console.error("Error completo:", error);
      tbody.innerHTML =
        '<tr><td colspan="8" style="text-align:center; color:#dc3545;">' +
        "Error al cargar pedidos: " +
        error.message +
        '<br><button onclick="cargarPedidosAdmin()" style="margin-top:10px; padding:5px 10px;">Reintentar</button>' +
        "</td></tr>";
    });
}

function actualizarEstadisticasPedidos(stats) {
  if (!stats) return;

  const pendientesEl = document.getElementById("pendientesCount");
  const aprobadosEl = document.getElementById("aprobadosCount");
  const rechazadosEl = document.getElementById("rechazadosCount");
  const entregadosEl = document.getElementById("entregadosCount");

  if (pendientesEl) pendientesEl.textContent = stats.pendientes || 0;
  if (aprobadosEl) aprobadosEl.textContent = stats.aprobados || 0;
  if (rechazadosEl) rechazadosEl.textContent = stats.rechazados || 0;
  if (entregadosEl) entregadosEl.textContent = stats.entregados || 0;
}

function renderizarTablaPedidos(pedidos) {
  const tbody = document.getElementById("pedidosTableBody");
  if (!tbody) return;

  if (!pedidos || pedidos.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="8" style="text-align:center; padding:40px;">No hay pedidos para mostrar</td></tr>';
    return;
  }

  console.log("Renderizando", pedidos.length, "pedidos");

  // Aplicar filtros de busqueda
  const searchTerm =
    document.getElementById("searchPedidos")?.value?.toLowerCase() || "";
  const escuelaFilter = document.getElementById("escuelaFilter")?.value || "";

  const pedidosFiltrados = pedidos.filter((p) => {
    const matchesSearch =
      searchTerm === "" ||
      (p.material_nombre &&
        p.material_nombre.toLowerCase().includes(searchTerm)) ||
      (p.escuela_destino &&
        p.escuela_destino.toLowerCase().includes(searchTerm)) ||
      (p.solicitante && p.solicitante.toLowerCase().includes(searchTerm));

    const matchesEscuela =
      escuelaFilter === "" ||
      (p.escuela_destino && p.escuela_destino.includes(escuelaFilter));

    return matchesSearch && matchesEscuela;
  });

  let html = "";
  pedidosFiltrados.forEach((p) => {
    // Determinar clase de estado
    let estadoClass = "status-low-stock";
    let estadoIcon = "fa-clock";
    let botonesAccion = "";

    const estado = (p.estado || "pendiente").toLowerCase();

    if (estado === "pendiente") {
      estadoClass = "status-low-stock";
      estadoIcon = "fa-clock";
      botonesAccion = `
                <button class="action-btn approve" onclick="responderPedido(${
                  p.id
                }, 'aprobar')" style="background: #28a745;">
                    <i class="fas fa-check"></i>
                </button>
                <button class="action-btn reject" onclick="responderPedido(${
                  p.id
                }, 'rechazar')" style="background: #dc3545;">
                    <i class="fas fa-times"></i>
                </button>
            `;
    } else if (estado === "aprobado") {
      estadoClass = "status-in-stock";
      estadoIcon = "fa-check-circle";
      botonesAccion = `
                <button class="action-btn view" onclick="verDetallePedido(${
                  p.id
                })" style="background: #17a2b8;">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="responderPedido(${
                  p.id
                }, 'entregar')" style="background: #007bff;">
                    <i class="fas fa-truck"></i>
                </button>
            `;
    } else if (estado === "rechazado") {
      estadoClass = "status-out-of-stock";
      estadoIcon = "fa-times-circle";
      botonesAccion = `
                <button class="action-btn view" onclick="verDetallePedido(${
                  p.id
                })" style="background: #6c757d;">
                    <i class="fas fa-eye"></i>
                </button>
            `;
    } else if (estado === "entregado") {
      estadoClass = "status-in-stock";
      estadoIcon = "fa-check-double";
      botonesAccion = `
                <button class="action-btn view" onclick="verDetallePedido(${
                  p.id
                })" style="background: #6c757d;">
                    <i class="fas fa-eye"></i>
                </button>
            `;
    } else {
      botonesAccion = `
                <button class="action-btn view" onclick="verDetallePedido(${
                  p.id
                })" style="background: #6c757d;">
                    <i class="fas fa-eye"></i>
                </button>
            `;
    }

    // Formatear fecha
    let fechaFormateada = "Fecha invalida";
    try {
      if (p.fecha) {
        const fecha = new Date(p.fecha);
        fechaFormateada = fecha.toLocaleDateString();
      }
    } catch (e) {
      console.error("Error formateando fecha:", e);
    }

    html += `
        <tr>
            <td style="padding: 12px;">#${p.id}</td>
            <td style="padding: 12px;">${fechaFormateada}</td>
            <td style="padding: 12px;"><i class="fas fa-school"></i> ${
              p.escuela_destino || "N/A"
            }</td>
            <td style="padding: 12px;"><i class="fas fa-box"></i> ${
              p.material_nombre || "Desconocido"
            }</td>
            <td style="padding: 12px; font-weight: 600;">${p.cantidad || 0} ${
      p.unidad || ""
    }</td>
            <td style="padding: 12px;"><i class="fas fa-user"></i> ${
              p.solicitante_nombre || p.solicitante || "Sistema"
            }</td>
            <td style="padding: 12px;">
                <span class="status-badge ${estadoClass}">
                    <i class="fas ${estadoIcon}"></i> ${p.estado_display ||
      estado}
                </span>
            </td>
            <td style="padding: 12px;">
                <div style="display: flex; gap: 5px;">
                    ${botonesAccion}
                </div>
            </td>
        </tr>
        `;
  });

  tbody.innerHTML = html;
}

function filtrarPedidos(estado) {
  filtroActual = estado;
  const estadoFilter = document.getElementById("estadoFilter");
  if (estadoFilter) estadoFilter.value = estado;
  cargarPedidosAdmin();
}

function responderPedido(pedidoId, accion) {
  let mensaje = "";
  if (accion === "aprobar") mensaje = "Aprobar este pedido?";
  else if (accion === "rechazar") mensaje = "Rechazar este pedido?";
  else if (accion === "entregar") mensaje = "Marcar como entregado?";

  if (!confirm(mensaje)) return;

  fetch(`/api/aprobar-pedido/${pedidoId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken(),
    },
    body: JSON.stringify({ accion: accion }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("✅ " + data.message);
        cargarPedidosAdmin();
      } else {
        alert("❌ " + (data.error || "Error"));
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("❌ Error al procesar la solicitud");
    });
}

function verDetallePedido(pedidoId) {
  const pedido = pedidosData.find((p) => p.id === pedidoId);
  if (!pedido) return;

  const modal = document.getElementById("pedidoModal");
  const title = document.getElementById("pedidoModalTitle");
  const content = document.getElementById("pedidoModalContent");

  if (!modal || !title || !content) {
    console.error("Modal no encontrado");
    return;
  }

  title.textContent = `Detalles del Pedido #${pedido.id}`;

  // Formatear fecha
  let fechaFormateada = "Fecha no disponible";
  try {
    if (pedido.fecha) {
      const fecha = new Date(pedido.fecha);
      fechaFormateada = fecha.toLocaleString();
    }
  } catch (e) {
    console.error("Error formateando fecha:", e);
  }

  content.innerHTML = `
        <div style="padding: 10px;">
            <p><strong>📅 Fecha:</strong> ${fechaFormateada}</p>
            <p><strong>🏫 Escuela:</strong> ${pedido.escuela_destino ||
              "N/A"}</p>
            <p><strong>📦 Material:</strong> ${pedido.material_nombre ||
              "Desconocido"}</p>
            <p><strong>🔢 Cantidad:</strong> ${pedido.cantidad || 0} ${
    pedido.unidad || ""
  }</p>
            <p><strong>👤 Solicitante:</strong> ${pedido.solicitante_nombre ||
              pedido.solicitante ||
              "Sistema"}</p>
            <p><strong>📊 Estado:</strong> <span class="status-badge ${
              pedido.estado === "pendiente"
                ? "status-low-stock"
                : pedido.estado === "aprobado" || pedido.estado === "entregado"
                ? "status-in-stock"
                : "status-out-of-stock"
            }">
                ${pedido.estado_display || pedido.estado}
            </span></p>
            ${pedido.notas_admin ? `<p><strong>📝 Notas:</strong> ${pedido.notas_admin}</p>` : ""}
        </div>
    `;

  modal.style.display = "flex";
}

// Event listeners para pedidos
document.addEventListener("DOMContentLoaded", function () {
  const estadoFilter = document.getElementById("estadoFilter");
  if (estadoFilter) {
    estadoFilter.addEventListener("change", function () {
      filtrarPedidos(this.value);
    });
  }

  const escuelaFilter = document.getElementById("escuelaFilter");
  if (escuelaFilter) {
    escuelaFilter.addEventListener("change", function () {
      renderizarTablaPedidos(pedidosData);
    });
  }

  const searchPedidos = document.getElementById("searchPedidos");
  if (searchPedidos) {
    searchPedidos.addEventListener("input", function () {
      renderizarTablaPedidos(pedidosData);
    });
  }

  const refreshBtn = document.getElementById("refreshPedidosBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {
      filtroActual = "";
      const estadoFilter = document.getElementById("estadoFilter");
      if (estadoFilter) estadoFilter.value = "";
      cargarPedidosAdmin();
    });
  }

  const pedidoModalClose = document.getElementById("pedidoModalClose");
  if (pedidoModalClose) {
    pedidoModalClose.addEventListener("click", function () {
      document.getElementById("pedidoModal").style.display = "none";
    });
  }
});

// Cerrar modal de pedido
document
  .getElementById("pedidoModalClose")
  ?.addEventListener("click", function () {
    document.getElementById("pedidoModal").style.display = "none";
  });

