<template>
  <div class="pdf-viewer-container">
    <div v-html="htmlContent" />
  </div>
</template>

<script>
export default {
  name: 'PdfViewer',
  props: {
    htmlContent: {
      type: String,
      required: true,
      validator: (value) => {
        // Validar que sea contenido HTML válido
        return typeof value === 'string' && value.length > 0;
      }
    }
  }
}
</script>

<style scoped>
.pdf-viewer-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

/* Estilos base para el contenido del PDF */
.pdf-viewer-container :deep(#sidebar) {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  padding: 0;

  overflow: auto;
}

.pdf-viewer-container :deep(#page-container) {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  border: 0;
}

.pdf-viewer-container :deep(.pf) {
  position: relative;
  background-color: white;
  overflow: hidden;

  border: 0;
}

.pdf-viewer-container :deep(.pc) {
  position: absolute;
  border: 0;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;
  transform-origin: 0 0;
}

.pdf-viewer-container :deep(.loading-indicator) {
  display: none;
}

.pdf-viewer-container :deep(.loading-indicator.active) {
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: 50%;
  left: 50%;
  margin-top: -32px;
  margin-left: -32px;
}
</style>
