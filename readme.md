# Mele Fuegos Chat - Frontend Vue 3

Chat interface mejorada con página de inicio y múltiples asistentes para Mele Fuegos usando Vue 3 + Vue Router + Pinia + Bootstrap.

## 🎨 Nuevas Características

✅ **Página de Inicio con Health Check**: Verifica la conexión con el backend antes de mostrar las opciones  
✅ **3 Tipos de Asistentes**: Reservas, Menú y Soporte  
✅ **Navegación con Vue Router**: Sistema de rutas para navegar entre páginas  
✅ **Spinner de Carga**: Muestra mientras se configura el sistema  
✅ **Botones Animados**: Interfaz moderna y atractiva  
✅ **Botón Volver**: Regresa fácilmente a la página de inicio desde cualquier chat  

## 📁 Estructura del proyecto

```
mele-fuegos-frontend/
├── public/
├── src/
│   ├── router/
│   │   └── index.js             # Configuración de rutas
│   ├── stores/
│   │   └── chatStore.js         # Store de Pinia para el chat
│   ├── views/
│   │   ├── HomePage.vue         # Página de inicio con health check
│   │   └── ChatPage.vue         # Página del chat
│   ├── App.vue                  # Componente principal
│   ├── main.js                  # Entry point
│   └── style.css                # Estilos globales
├── index.html
├── package.json
├── vite.config.js
├── .env.development             # Variables de entorno - desarrollo
└── .env.production              # Variables de entorno - producción
```

## 🚀 Setup Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar URL del backend

El archivo `.env.development` ya está configurado para `http://localhost:5000`.

Si tu backend corre en otro puerto, edítalo:
```
VITE_API_URL=http://localhost:TU_PUERTO
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La app estará disponible en: `http://localhost:5173`

## 🎯 Flujo de la Aplicación

1. **Carga Inicial**: 
   - Muestra spinner "Configurando el sistema..."
   - Llama al endpoint `/api/chat/health` del backend
   - Si el backend responde, muestra los botones

2. **Selección de Asistente**:
   - Usuario elige entre: Reservas 🍽️, Menú 📋 o Soporte 💬
   - Navega a `/chat/[tipo-bot]`

3. **Chat**:
   - Interfaz personalizada según el tipo de asistente
   - Botón "Volver" para regresar al inicio
   - El chat se resetea al cambiar de asistente

## 🔧 Tecnologías

- **Vue 3** (Composition API)
- **Vue Router 4** (Navegación)
- **Pinia** (State management)
- **Bootstrap 5** (Estilos base)
- **Axios** (HTTP requests)
- **Vite** (Build tool)

## 📦 Build para producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados.

## 🚢 Deploy en Vercel

### Configuración en Vercel:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**: 
  ```
  VITE_API_URL = https://tu-api-en-render.onrender.com
  ```

## 🐛 Troubleshooting

### Backend no responde al health check
- Verifica que el backend esté corriendo en el puerto correcto
- En Render, el primer request puede tardar ~30-60 segundos si el servicio estaba dormido
- El timeout del health check está configurado a 30 segundos

### Error de CORS
- Asegúrate que el backend tenga CORS configurado correctamente
- Verifica que la URL en `.env.development` coincida con el backend

### Los botones no navegan
- Verifica la consola del navegador para ver errores de Vue Router
- Asegúrate que todas las dependencias estén instaladas correctamente

## 📝 Próximos Pasos

- [ ] Conectar cada tipo de bot con lógica específica en el backend
- [ ] Agregar historial de conversaciones
- [ ] Implementar autenticación de usuarios
- [ ] Agregar más tipos de asistentes según necesidad
