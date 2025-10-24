<template>
  <div class="menu-container">
    <div class="menu-header">
      <h1>Menú Mele Fuegos</h1>
      <button @click="toggleView" class="btn btn-toggle">
        {{ isListView ? 'Ver PDF Original' : 'Ver Lista' }}
      </button>
    </div>

    <!-- Vista de lista organizada -->
    <div v-if="isListView" class="menu-content organized">
      <div class="menu-section" v-for="section in menuSections" :key="section.title">
        <h2 class="section-title">{{ section.title }}</h2>
        <div class="items-grid">
          <div class="menu-item" v-for="(item, index) in section.items" :key="index">
            <div class="item-header">
              <h3 class="item-name">{{ item.name }}</h3>
              <span class="item-price" v-if="item.price">{{ item.price }}</span>
            </div>
            <p class="item-description" v-if="item.description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista PDF original embebido -->
    <div v-else class="menu-content pdf-view">
      <iframe 
        ref="pdfFrame"
        :srcdoc="htmlContent"
        class="pdf-iframe"
        sandbox="allow-same-origin"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isListView = ref(true)
const htmlContent = ref('')
const pdfFrame = ref(null)

// Estructura del menú de Mele Fuegos
const menuSections = ref([
  {
    title: 'Entradas',
    items: [
      {
        name: 'Provoleta',
        description: 'Queso provolone gratinado con especias',
        price: '$8.500'
      },
      {
        name: 'Empanadas',
        description: 'De carne, jamón y queso, o humita',
        price: '$2.500 c/u'
      },
      {
        name: 'Tabla de Fiambres',
        description: 'Selección de fiambres artesanales y quesos',
        price: '$12.000'
      },
      {
        name: 'Chorizo Criollo',
        description: 'Con chimichurri casero',
        price: '$6.500'
      }
    ]
  },
  {
    title: 'Carnes a la Parrilla',
    items: [
      {
        name: 'Bife de Chorizo',
        description: '350g de carne de primera calidad',
        price: '$18.500'
      },
      {
        name: 'Ojo de Bife',
        description: '400g jugoso y tierno',
        price: '$20.000'
      },
      {
        name: 'Vacío',
        description: '350g a punto perfecto',
        price: '$17.500'
      },
      {
        name: 'Entraña',
        description: '300g marinada con chimichurri',
        price: '$19.500'
      },
      {
        name: 'Asado de Tira',
        description: '400g con hueso',
        price: '$16.500'
      },
      {
        name: 'Parrillada Completa',
        description: 'Para 2 personas - variedad de cortes',
        price: '$42.000'
      }
    ]
  },
  {
    title: 'Guarniciones',
    items: [
      {
        name: 'Papas Fritas',
        price: '$4.500'
      },
      {
        name: 'Ensalada Mixta',
        price: '$5.000'
      },
      {
        name: 'Ensalada Caesar',
        price: '$6.500'
      },
      {
        name: 'Puré de Papas',
        price: '$4.500'
      },
      {
        name: 'Verduras Grilladas',
        price: '$5.500'
      }
    ]
  },
  {
    title: 'Vinos',
    items: [
      {
        name: 'Malbec - Luigi Bosca',
        description: 'DOC - 750ml',
        price: '$18.000'
      },
      {
        name: 'Cabernet Sauvignon - Catena Zapata',
        description: '750ml',
        price: '$22.000'
      },
      {
        name: 'Chardonnay - Trumpeter',
        description: '750ml',
        price: '$14.000'
      },
      {
        name: 'Vino de la Casa',
        description: 'Tinto/Blanco - Copa',
        price: '$3.500'
      }
    ]
  },
  {
    title: 'Postres',
    items: [
      {
        name: 'Flan Casero',
        description: 'Con dulce de leche y crema',
        price: '$5.500'
      },
      {
        name: 'Panqueque con Dulce de Leche',
        price: '$6.000'
      },
      {
        name: 'Helado Artesanal',
        description: '2 bochas a elección',
        price: '$5.000'
      },
      {
        name: 'Tiramisú',
        price: '$6.500'
      }
    ]
  },
  {
    title: 'Bebidas',
    items: [
      {
        name: 'Agua Mineral',
        description: '500ml',
        price: '$2.000'
      },
      {
        name: 'Gaseosa',
        description: 'Coca-Cola, Sprite, Fanta',
        price: '$2.500'
      },
      {
        name: 'Cerveza Quilmes',
        description: '1L',
        price: '$4.500'
      },
      {
        name: 'Cerveza Artesanal',
        description: '500ml',
        price: '$5.500'
      },
      {
        name: 'Café',
        price: '$2.500'
      }
    ]
  }
])

const toggleView = () => {
  isListView.value = !isListView.value
}

// Cargar el HTML original cuando se monte el componente
onMounted(async () => {
  try {
    const response = await fetch('/menu-original.html')
    if (response.ok) {
      htmlContent.value = await response.text()
    }
  } catch (error) {
    console.log('No se pudo cargar el HTML original', error)
  }
})
</script>

<style scoped>
.menu-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px;
}

.menu-header {
  background: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.menu-header h1 {
  margin: 0;
  color: #c9402a;
  font-size: 2.5rem;
  font-weight: 700;
}

.btn-toggle {
  background: #c9402a;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-toggle:hover {
  background: #a33422;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(201, 64, 42, 0.3);
}

.menu-content.organized {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.menu-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  color: #c9402a;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 3px solid #c9402a;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.menu-item {
  padding: 20px;
  border-radius: 8px;
  background: #f8f9fa;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.menu-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border-color: #c9402a;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 10px;
  gap: 10px;
}

.item-name {
  color: #1a1a2e;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.item-price {
  color: #c9402a;
  font-size: 1.2rem;
  font-weight: 700;
  white-space: nowrap;
}

.item-description {
  color: #6c757d;
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
}

.menu-content.pdf-view {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.pdf-iframe {
  width: 100%;
  min-height: 800px;
  border: none;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .menu-header h1 {
    font-size: 1.8rem;
  }

  .items-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .menu-header {
    flex-direction: column;
    text-align: center;
  }
}

@media print {
  .menu-header {
    page-break-after: avoid;
  }

  .menu-section {
    page-break-inside: avoid;
  }

  .btn-toggle {
    display: none;
  }
}
</style>
