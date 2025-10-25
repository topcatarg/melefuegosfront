<template>
  <div class="app">
    <!-- Navigation -->
    <NavigationMenu />
    
    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section with Background -->
      <section class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">Mele Fuegos</h1>
          <p class="hero-subtitle">Carta de Vinos</p>
        </div>
      </section>

      <!-- Wine List Sections -->
      <div class="wine-sections-container">
        <section 
          v-for="section in wineSections" 
          :key="section.id"
          :id="section.id"
          class="wine-section"
        >
          <h2 class="section-title">{{ section.title }}</h2>
          
          <div class="wine-items">
            <div 
              class="wine-item" 
              v-for="wine in section.wines" 
              :key="wine.id"
            >
              <div class="wine-info">
                <h3 class="wine-name">{{ wine.name }}</h3>
                <p class="wine-details" v-if="wine.details">{{ wine.details }}</p>
              </div>
              <div class="wine-price">{{ wine.price }}</div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Chat Widget Floating Button -->
    <div class="chat-widget">
      <button class="chat-button" @click="toggleChat">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <!-- Chat Container (lo integraremos después con tu chat existente) -->
      <div class="chat-container" v-if="isChatOpen">
        <div class="chat-header">
          <h4>Asistente Virtual</h4>
          <button class="close-chat" @click="toggleChat">×</button>
        </div>
        <div class="chat-body">
          <!-- Aquí irá tu componente de chat -->
          <p class="chat-placeholder">Chat próximamente...</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2025 Mele Fuegos. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavigationMenu from './NavigationMenu.vue'

const isChatOpen = ref(false)

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

const wineSections = ref([
  {
    id: 'tintos',
    title: 'Vinos Tintos',
    wines: [
      { id: 1, name: 'WAPIZA Pinot Noir', details: 'Patagonia Atlántica, Río Negro', price: '$16.000' },
      { id: 2, name: 'RUGIENTES 45° Pinot Noir', details: 'Sarmiento, Chubut', price: '$35.000' },
      { id: 3, name: 'BARDA Pinot Noir', details: 'Patagonia, Río Negro', price: '$55.000' },
      { id: 4, name: 'TRASLAPIEDRA Criolla Grande', details: 'Valle de Uco, Mdza', price: '$20.000' },
      { id: 5, name: 'CADUS APPELLATION Criolla Chica', details: 'Tunuyán, Mdza', price: '$28.000' },
      { id: 6, name: 'BENJAMIN NIETO Malbec', details: 'Mendoza', price: '$9.000' },
      { id: 7, name: 'TAPIZ CLASSIC Malbec', details: 'Valle De Uco, Mendoza', price: '$10.000' },
      { id: 8, name: 'SOMBRERO Malbec', details: 'Gualtallary, Valle de Uco', price: '$13.000' },
      { id: 9, name: 'ESCORIHUELA GASCÓN Malbec', details: 'Agrelo, Mendoza', price: '$16.000' },
      { id: 10, name: 'NIETO PATRIMONIAL DOC Malbec', details: 'Lujan de Cuyo', price: '$16.000' },
      { id: 11, name: 'SAINT FELICIEN Malbec', details: 'Lunluta, Mendoza', price: '$20.000' },
      { id: 12, name: 'DE ANGELES Malbec', details: 'Luján de Cuyo, Mendoza', price: '$23.500' },
      { id: 13, name: 'D.V. CATENA L´esploratore Malbec', details: 'Cafayate, Salta', price: '$27.000' },
      { id: 14, name: 'FELINO Malbec', details: 'Luján de Cuyo, Mendoza', price: '$28.000' },
      { id: 15, name: 'PEQUEÑAS PRODUCCIONES Malbec', details: 'Luján de Cuyo', price: '$30.000' },
      { id: 16, name: 'DIAS PERFECTOS by C R U Malbec', details: 'Mendoza', price: '$30.000' },
      { id: 17, name: 'KUN FU Malbec', details: 'Gualtallary, Mendoza', price: '$38.000' },
      { id: 18, name: 'A LISA Malbec', details: 'Valle Azul, Río Negro', price: '$45.000' },
      { id: 19, name: 'BLACK TEARS Malbec', details: 'Valle de Uco, Mendoza', price: '$60.000' },
      { id: 20, name: 'VIÑA COBOS VINCULUM Malbec', details: '', price: '$60.000' },
      { id: 21, name: 'MALBEC ARGENTINO Malbec', details: 'La Consulta, Mendoza', price: '$85.000' },
      { id: 22, name: 'NICASIA Cabernet Franc', details: 'Altamira, Mendoza', price: '$20.000' },
      { id: 23, name: 'PARADISE 74 Cabernet Franc', details: 'Valle de Uco, Mendoza', price: '$28.000' },
      { id: 24, name: 'DIAS PERFECTOS by C R U Cabernet Franc', details: 'Mendoza', price: '$30.000' },
      { id: 25, name: 'EL GRAN ENEMIGO Cabernet Franc', details: 'Mendoza', price: '$60.000' },
      { id: 26, name: 'RUCA MALÉN CAPÍTULO 1 Cab. Sauvignon', details: 'Mendoza', price: '$16.500' },
      { id: 27, name: 'ANGELICA ZAPATA Cab. Sauvignon', details: 'Mendoza', price: '$35.000' },
    ]
  },
  {
    id: 'blancos',
    title: 'Vinos Blancos',
    wines: [
      { id: 28, name: 'TAPIZ Sauvignon Blanc', details: 'Valle de Uco, Mendoza', price: '$10.000' },
      { id: 29, name: 'RUCA MALÉN CAPÍTULO 1 Chadonnay', details: 'Mendoza', price: '$14.000' },
      { id: 30, name: 'SAINT FELICIEN Chadonnay', details: 'Luján de Cuyo, Mendoza', price: '$20.000' },
      { id: 31, name: 'COSTA & PAMPA Albariño', details: 'Chapadmalal, Buenos Aires', price: '$25.000' },
      { id: 32, name: 'BRAMARE Chardonnay', details: 'Valle de Uco, Mendoza', price: '$38.000' },
    ]
  },
  {
    id: 'rosados',
    title: 'Vinos Rosados',
    wines: [
      { id: 33, name: 'CRIOS Malbec', details: 'Valle de Uco, Mendoza', price: '$15.000' },
      { id: 34, name: 'AMOUR D´AVRIL Garnacha', details: 'Valle de Uco, Mendoza', price: '$26.000' },
      { id: 35, name: 'MENDEL ROSADÍA Blend', details: 'Paraje Altamira, Mendoza', price: '$35.000' },
    ]
  },
  {
    id: 'naranjos',
    title: 'Vinos Naranjos',
    wines: [
      { id: 36, name: 'LE MECANIQUE Chadonnay', details: 'Valle de Uco, Mendoza', price: '$28.000' },
      { id: 37, name: 'VÍA REVOLUCIONARIA Torrontes', details: 'Tupungato, Mendoza', price: '$29.000' },
    ]
  },
  {
    id: 'burbujas',
    title: 'Burbujas',
    wines: [
      { id: 38, name: 'CHANDON Extra Brut', details: '', price: '$15.500' },
      { id: 39, name: 'CASA BOHER Extra Brut', details: '', price: '$27.000' },
      { id: 40, name: 'ALMA 4 Pinot - Chardonnay', details: '', price: '$33.000' },
    ]
  },
  {
    id: 'por-copa',
    title: 'Por Copa',
    wines: [
      { id: 41, name: 'COPA ZOLO Sauvignon Blanc', details: '', price: '$3.800' },
      { id: 42, name: 'COPA BENJAMIN NIETO Malbec', details: '', price: '$3.800' },
      { id: 43, name: 'COPA NICASIA Cabernet Franc', details: '', price: '$5.500' },
      { id: 44, name: 'COPA CHANDON Extra Brut', details: '', price: '$4.500' },
    ]
  },
])
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.main-content {
  position: relative;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
              url('/hero-bg.jpg') center/cover no-repeat;
  background-attachment: fixed;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 4px;
  background: linear-gradient(45deg, #fff, #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  letter-spacing: 2px;
}

/* Wine Sections */
.wine-sections-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.wine-section {
  margin-bottom: 80px;
  scroll-margin-top: 80px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;
  padding-bottom: 20px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #8B4513, transparent);
}

.wine-items {
  display: grid;
  gap: 15px;
}

.wine-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 25px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.wine-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(10px);
  border-color: rgba(139, 69, 19, 0.4);
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.2);
}

.wine-info {
  flex: 1;
  padding-right: 20px;
}

.wine-name {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #fff;
  line-height: 1.4;
}

.wine-details {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-style: italic;
  line-height: 1.5;
}

.wine-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #8B4513;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Chat Widget */
.chat-widget {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.chat-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B4513, #A0522D);
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.6);
}

.chat-container {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 15px;
  border: 1px solid rgba(139, 69, 19, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(135deg, #8B4513, #A0522D);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h4 {
  margin: 0;
  font-size: 1.1rem;
}

.close-chat {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 30px;
  height: 30px;
}

.chat-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.chat-placeholder {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 50%;
}

/* Footer */
.footer {
  background: rgba(0, 0, 0, 0.95);
  padding: 40px 20px;
  text-align: center;
  border-top: 1px solid rgba(139, 69, 19, 0.3);
}

.footer p {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .wine-item {
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }

  .wine-info {
    padding-right: 0;
  }

  .wine-price {
    align-self: flex-start;
  }

  .chat-container {
    width: calc(100vw - 40px);
    right: -10px;
  }

  .chat-button {
    width: 50px;
    height: 50px;
  }
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #8B4513, #A0522D);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #A0522D, #8B4513);
}
</style>
