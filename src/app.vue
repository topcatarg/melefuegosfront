<template>
  <div class="app-container">
    <div class="chat-container">
      <div class="chat-header">
        <h4 class="mb-0">Mele Fuegos - Chat</h4>
      </div>
      
      <div class="chat-messages" ref="messagesContainer">
        <div 
          v-for="(msg, index) in chatStore.messages" 
          :key="index"
          :class="['message', msg.role]"
        >
          <div class="message-bubble">
            {{ msg.content }}
          </div>
        </div>
        
        <div v-if="chatStore.isLoading" class="message assistant">
          <div class="message-bubble">
            <span class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <form @submit.prevent="sendMessage" class="d-flex gap-2">
          <input 
            v-model="messageText"
            type="text" 
            class="form-control"
            placeholder="Escribe tu mensaje..."
            :disabled="chatStore.isLoading"
          />
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="!messageText.trim() || chatStore.isLoading"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from './stores/chatStore'

const chatStore = useChatStore()
const messageText = ref('')
const messagesContainer = ref(null)

const sendMessage = async () => {
  if (!messageText.value.trim()) return
  
  const text = messageText.value
  messageText.value = ''
  
  await chatStore.sendMessage(text)
  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(() => chatStore.messages.length, () => {
  scrollToBottom()
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.chat-container {
  width: 100%;
  max-width: 800px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-header {
  padding: 20px;
  background: #667eea;
  color: white;
  text-align: center;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
}

.message.user .message-bubble {
  background: #667eea;
  color: white;
}

.message.assistant .message-bubble {
  background: #f1f3f5;
  color: #333;
}

.chat-input {
  padding: 20px;
  border-top: 1px solid #e9ecef;
  background: white;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>