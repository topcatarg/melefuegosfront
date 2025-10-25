import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const conversationId = ref(null)
  const userId = ref(null)
  const isLoading = ref(false)
  const currentRestaurantId = ref(null)
  const restaurantHtml = ref('')
  const isChatReady = ref(false)
  const restaurantName = ref('')
  const restaurantAvatar = ref('')
  const initialMessage = ref(null)

  const sendMessage = async (messageText) => {
    // Agregar mensaje del usuario a la UI
    messages.value.push({
      role: 'user',
      content: messageText
    })

    isLoading.value = true

    try {
      const response = await axios.post(`${API_URL}/api/chat/message`, {
        message: messageText,
        conversationId: conversationId.value,
        userId: userId.value,
        restaurantCode: getRestaurantCode(currentRestaurantId.value)
      })

      const data = response.data

      // Guardar conversationId y userId para siguientes mensajes
      if (data.conversationId) {
        conversationId.value = data.conversationId
      }
      if (data.userId) {
        userId.value = data.userId
      }

      // Agregar respuesta del asistente
      messages.value.push({
        role: 'assistant',
        content: data.message
      })

    } catch (error) {
      console.error('Error enviando mensaje:', error)
      
      messages.value.push({
        role: 'assistant',
        content: 'Lo siento, hubo un error. Por favor intenta de nuevo.'
      })
    } finally {
      isLoading.value = false
    }
  }

  const initializeChat = async (restaurantId) => {
    isChatReady.value = false

    // Configurar nombre y avatar del restaurante
    const restaurantConfig = getRestaurantConfig(restaurantId)
    restaurantName.value = restaurantConfig.name
    restaurantAvatar.value = restaurantConfig.avatar

    try {
      // Llamada inicial con "Hola" para inicializar la conversación
      const response = await axios.post(`${API_URL}/api/chat/message`, {
        message: 'Hola',
        conversationId: null,
        userId: null,
        restaurantCode: getRestaurantCode(restaurantId)
      })

      const data = response.data

      // Guardar conversationId y userId
      if (data.conversationId) {
        conversationId.value = data.conversationId
      }
      if (data.userId) {
        userId.value = data.userId
      }

      // Guardar el mensaje inicial del backend
      if (data.message) {
        initialMessage.value = data.message
        // Agregar el mensaje inicial a la lista de mensajes
        messages.value.push({
          role: 'assistant',
          content: data.message
        })
      }

      isChatReady.value = true
    } catch (error) {
      console.error('Error inicializando chat:', error)
      // Incluso si hay error, marcamos como ready para que el usuario pueda intentar
      isChatReady.value = true
    }
  }

  const getRestaurantCode = (restaurantId) => {
    const restaurantCodeMap = {
      'resto1': 'RES-010',
      'resto2': 'RES-007',
      'resto3': 'RES-009'
    }
    return restaurantCodeMap[restaurantId] || 'RES-010'
  }

  const getRestaurantConfig = (restaurantId) => {
    const configMap = {
      'resto1': {
        name: 'Mele Fuegos',
        avatar: '/avatars/mele.jpeg' // Placeholder - actualizar con la ruta correcta
      },
      'resto2': {
        name: 'Amazonia',
        avatar: '/avatars/amazonia.jpeg' // Placeholder - actualizar con la ruta correcta
      },
      'resto3': {
        name: 'Romero Verde',
        avatar: '/avatars/romero.jpeg' // Placeholder - actualizar con la ruta correcta
      }
    }
    return configMap[restaurantId] || { name: 'Restaurante', avatar: '/avatars/default.png' }
  }

  const loadRestaurantHtml = async (restaurantId) => {
    currentRestaurantId.value = restaurantId

    // Mapeo de IDs de restaurante a archivos HTML
    const restaurantHtmlMap = {
      'resto1': '/menu-mele-fuegos.html',
      'resto2': '/menu-amazonia.html',
      'resto3': '/menu-romero-verde.html'
    }

    const htmlFile = restaurantHtmlMap[restaurantId]

    if (htmlFile) {
      try {
        const response = await fetch(htmlFile)
        restaurantHtml.value = await response.text()
      } catch (error) {
        console.error('Error cargando HTML del restaurante:', error)
        restaurantHtml.value = '<p>Error cargando el contenido del restaurante</p>'
      }
    } else {
      restaurantHtml.value = '<p>Restaurante no encontrado</p>'
    }
  }

  const resetChat = () => {
    messages.value = []
    conversationId.value = null
    userId.value = null
    isChatReady.value = false
  }

  return {
    messages,
    conversationId,
    userId,
    isLoading,
    isChatReady,
    currentRestaurantId,
    restaurantHtml,
    restaurantName,
    restaurantAvatar,
    initialMessage,
    sendMessage,
    initializeChat,
    loadRestaurantHtml,
    resetChat
  }
})
