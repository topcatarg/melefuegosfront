<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo / Brand -->
      <div class="navbar-brand">
        
      </div>

      <!-- Mobile menu toggle -->
      <button 
        class="menu-toggle" 
        @click="toggleMenu"
        :class="{ active: isMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation Menu -->
      <div class="navbar-menu" :class="{ open: isMenuOpen }">
        <a 
          v-for="section in menuSections" 
          :key="section.id"
          :href="`#${section.id}`"
          class="menu-item"
          @click="closeMenu"
        >
          {{ section.title }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const menuSections = [
  { id: 'tintos', title: 'Tintos' },
  { id: 'blancos', title: 'Blancos' },
  { id: 'rosados', title: 'Rosados' },
  { id: 'naranjos', title: 'Naranjos' },
  { id: 'burbujas', title: 'Burbujas' },
  { id: 'por-copa', title: 'Por Copa' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(139, 69, 19, 0.3);
  z-index: 100;
  padding: 15px 0;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-logo {
  height: 50px;
  width: auto;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 101;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: #fff;
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 3px;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.navbar-menu {
  display: flex;
  gap: 30px;
  align-items: center;
}

.menu-item {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.menu-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #8B4513;
  transition: width 0.3s ease;
}

.menu-item:hover {
  color: #8B4513;
}

.menu-item:hover::after {
  width: 80%;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .navbar-menu {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 70%;
    max-width: 300px;
    background: rgba(0, 0, 0, 0.98);
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 40px;
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
  }

  .navbar-menu.open {
    right: 0;
  }

  .menu-item {
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    padding: 15px;
  }

  .brand-logo {
    height: 40px;
  }
}

@media (max-width: 480px) {
  .brand-logo {
    height: 35px;
  }
}
</style>
