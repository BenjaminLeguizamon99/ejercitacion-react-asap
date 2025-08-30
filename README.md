# 📝 Gestor de Tareas en React + TypeScript

Este proyecto es una aplicación de ejemplo para gestionar tareas (alta, edición, eliminación y cambio de estado).  
Cuenta con **dos implementaciones diferentes**, cada una en su propia rama:

- **`useState` branch** → la gestión de tareas está implementada utilizando el estado local de React (`useState`).
- **`redux` branch** → la gestión de tareas está implementada utilizando **Redux Toolkit** para el manejo global del estado.

---

## 🚀 Funcionalidades actuales

- Crear nuevas tareas con:
  - Nombre
  - Descripción
  - Prioridad
  - Responsable
- Editar tareas existentes
- Eliminar tareas
- Cambiar estado de la tarea (`Creado`, `En curso`, `Finalizado`)

---

## 🔧 Mejoras pendientes

- ✅ **Ventana modal de confirmación** al eliminar una tarea.  
- ✅ **Mejorar los estilos** de la UI para que sea más atractiva/responsiva.  
- ✅ **Validaciones en el formulario** (campos requeridos, rango de prioridad, etc).  
- ✅ Otros detalles de UX (feedback visual, notificaciones, etc).

---

## 📦 Librerías utilizadas

- [Redux Toolkit](https://redux-toolkit.js.org/) → manejo global del estado.  
- [react-icons](https://react-icons.github.io/react-icons/) → íconos (editar, eliminar).  
- [uuid](https://github.com/uuidjs/uuid) → generación de IDs únicos para las tareas.  

---

## ▶️ Cómo correr el proyecto

1. Clonar el repo:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
2. Instalar dependencias
  npm install
3. Levantar el servidor de desarrollo
  npm run dev


## 📂 Ramas del proyecto

- **`master`** → implementación del gestor de tareas utilizando **useState**.  
- **`rama-redux`** → implementación del gestor de tareas utilizando **Redux Toolkit**.  
