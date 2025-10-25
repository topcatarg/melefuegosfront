<template>
  <div class="pdf-viewer">
    <div v-html="htmlContent"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const htmlContent = ref('')

onMounted(async () => {
  try {
    // Cargar el HTML del menú desde el archivo subido
    const response = await fetch('/menu-mele-fuegos.html')
    const html = await response.text()
    htmlContent.value = html
  } catch (error) {
    console.error('Error cargando el menú:', error)
  }
})
</script>

<style>
/* Sin estilos adicionales para que se vea exactamente como el original */
.pdf-viewer {
  width: 100%;
  min-height: 100vh;
  background: white;
}
</style>
