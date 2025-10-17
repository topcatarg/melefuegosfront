# Mele Fuegos Chat - Frontend Vue 3

Chat interface simple y elegante para Mele Fuegos usando Vue 3 + Pinia + Bootstrap.

## 📁 Estructura del proyecto

```
mele-fuegos-chat/
├── public/
├── src/
│   ├── stores/
│   │   └── chatStore.js       # Store de Pinia para el chat
│   ├── App.vue                # Componente principal
│   ├── main.js                # Entry point
│   └── style.css              # Estilos globales
├── index.html
├── package.json
├── vite.config.js
├── .env.development           # Variables de entorno - desarrollo
└── .env.production            # Variables de entorno - producción
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

## 🧪 Probar localmente

1. **Asegúrate que el backend esté corriendo** en `http://localhost:5000`
2. Abre el frontend en `http://localhost:5173`
3. Escribe un mensaje y envía
4. Deberías ver la respuesta del chatbot

## 📦 Build para producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados.

## 🚢 Deploy en Vercel

### Opción 1: Desde la UI de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en **"Add New"** → **"Project"**
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (o la carpeta del frontend si está en subcarpeta)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**:
   ```
   VITE_API_URL = https://tu-api-en-render.onrender.com
   ```
6. Click **"Deploy"**

### Opción 2: Desde la terminal (Vercel CLI)

```bash
npm install -g vercel
vercel login
vercel
```

Sigue las instrucciones en pantalla.

### Configurar la URL de producción

En `.env.production`, actualiza con tu URL real de Render:
```
VITE_API_URL=https://mele-fuegos-api.onrender.com
```

## 🎨 Características

✅ Interfaz de chat estilo Claude  
✅ Indicador de "escribiendo..." con animación  
✅ Scroll automático a nuevos mensajes  
✅ Diseño responsive  
✅ Estado global con Pinia  
✅ Manejo automático de `conversationId` y `userId`  
✅ Animaciones suaves  

## 🔧 Tecnologías

- **Vue 3** (Composition API)
- **Pinia** (State management)
- **Pinia Colada** (Data fetching helpers)
- **Bootstrap 5** (Estilos base)
- **Axios** (HTTP requests)
- **Vite** (Build tool)

## 📝 Notas

- El primer mensaje se envía a Make
- Los mensajes subsiguientes van directo a Relevance
- El `conversationId` se mantiene automáticamente durante toda la sesión
- El código del restaurant está hardcoded como "RES-010"

## 🐛 Troubleshooting

### Error de CORS

Si ves errores de CORS, asegúrate que:
1. El backend tiene CORS configurado correctamente
2. La URL en `.env.development` coincide con donde corre el backend
3. El backend está efectivamente corriendo

### No conecta con el backend

Verifica en la consola del navegador (F12) los errores de red.
Chequea que `VITE_API_URL` esté bien configurado.