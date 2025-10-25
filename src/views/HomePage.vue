<template>
  <div class="home-container">
    <!-- Main Screen -->
    <div class="main-screen">
      <div class="content-card">
        <h1 class="mb-4">Bienvenido a Tracy</h1>
        <p class="subtitle mb-5">Selecciona el restaurante</p>

        <div class="bot-buttons">
          <button
            @click="selectRestaurant('resto1')"
            class="bot-button"
          >
            <div class="bot-icon">
              <img src="/avatars/mele.jpeg" alt="Mele Fuegos" />
            </div>
            <h3>Mele Fuegos</h3>
            <p>Parrilla Argentina</p>
          </button>

          <button
            @click="selectRestaurant('resto2')"
            class="bot-button"
          >
            <div class="bot-icon">
              <img src="/avatars/amazonia.jpeg" alt="Amazonia" />
            </div>
            <h3>Amazonia</h3>
            <p>Restaurante Amazonia</p>
          </button>

          <button
            @click="selectRestaurant('resto3')"
            class="bot-button"
          >
            <div class="bot-icon">
              <img src="/avatars/romero.jpeg" alt="Romero Verde" />
            </div>
            <h3>Romero Verde</h3>
            <p>Restaurante Romero Verde</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isLoading = ref(true)
const error = ref(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

onMounted(async () => {
  try {
    // Llamar al health check para despertar el backend
    await axios.get(`${API_URL}/api/chat/health`, {
      timeout: 30000 // 30 segundos de timeout
    })
    
    // Esperar un poco más para que todo esté listo
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    isLoading.value = false
  } catch (err) {
    console.error('Error al conectar con el backend:', err)
    error.value = 'No se pudo conectar con el servidor. Por favor, intenta de nuevo.'
    isLoading.value = false
  }
})

const selectRestaurant = (restaurantId) => {
  router.push({ name: 'Restaurant', params: { restaurantId } })
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.loading-screen {
  text-align: center;
}

.spinner-container {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-screen {
  width: 100%;
  max-width: 1200px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-card {
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #6c757d;
}

.bot-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.bot-button {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 16px;
  padding: 40px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.bot-button:hover {
  transform: translateY(-5px);
  border-color: #667eea;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
}

.bot-icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bot-icon img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #e9ecef;
  transition: all 0.3s ease;
}

.bot-button:hover .bot-icon img {
  border-color: #667eea;
  transform: scale(1.05);
}

.bot-button h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.bot-button p {
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
}

.error-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

@media (max-width: 768px) {
  .content-card {
    padding: 40px 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .bot-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
