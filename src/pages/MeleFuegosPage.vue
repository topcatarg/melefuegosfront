<template>
  <div class="mele-page">
    <!-- Background image -->
    <div class="background-overlay"></div>
    
    <!-- Main Content -->
    <div class="content-container">
      <!-- Header / Logo -->
      <div class="header-section">
        <img src="/logo.png" alt="Mele Fuegos" class="logo" />
      </div>

      <!-- Wine List Section -->
      <div class="wine-list-container">
        <div class="wine-section" v-for="section in wineSections" :key="section.id">
          <h2 class="section-title">{{ section.title }}</h2>
          
          <div class="wine-items">
            <div 
              class="wine-item" 
              v-for="wine in section.wines" 
              :key="wine.id"
            >
              <div class="wine-info">
                <h3 class="wine-name">{{ wine.name }}</h3>
                <p class="wine-details">{{ wine.details }}</p>
              </div>
              <div class="wine-price">{{ wine.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Widget (lo agregaremos después) -->
    <div class="chat-widget-container">
      <!-- Aquí irá el chat que ya tenemos -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
.mele-page {
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85));
  z-index: 0;
}

.content-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  text-align: center;
  padding: 40px 0;
}

.logo {
  max-width: 300px;
  height: auto;
}

.wine-list-container {
  padding: 20px 0;
}

.wine-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 2px solid #8B4513;
  padding-bottom: 15px;
}

.wine-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wine-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.wine-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(5px);
  border-color: rgba(139, 69, 19, 0.5);
}

.wine-info {
  flex: 1;
}

.wine-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #fff;
}

.wine-details {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-style: italic;
}

.wine-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #8B4513;
  white-space: nowrap;
  margin-left: 20px;
}

.chat-widget-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

/* Responsive */
@media (max-width: 768px) {
  .content-container {
    padding: 15px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .wine-item {
    flex-direction: column;
    gap: 10px;
  }

  .wine-price {
    margin-left: 0;
    align-self: flex-end;
  }

  .logo {
    max-width: 200px;
  }
}
</style>
