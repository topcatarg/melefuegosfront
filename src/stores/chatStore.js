import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const conversationId = ref(null)
  const userId = ref(null)
  const isLoading = ref(false)

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
        restaurantCode: 'RES-010'
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

  const resetChat = () => {
    messages.value = []
    conversationId.value = null
    userId.value = null
  }

  return {
    messages,
    conversationId,
    userId,
    isLoading,
    sendMessage,
    resetChat
  }
})
