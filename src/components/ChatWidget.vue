<template>
  <div class="chat-widget">
    <!-- Botón flotante -->
    <button
      class="chat-fab"
      @click="toggleChat"
      v-show="!isOpen"
      :class="{ pulse: hasNewMessage, disabled: !chatStore.isChatReady }"
      :disabled="!chatStore.isChatReady"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>

    <!-- Burbuja de "Conectando" -->
    <div v-if="!chatStore.isChatReady && !isOpen" class="connecting-bubble">
      <div class="connecting-content">
        <span class="connecting-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <p>Nos estamos conectando...</p>
      </div>
    </div>
    
    <!-- Chat expandido -->
    <transition name="slide-up">
      <div v-if="isOpen" class="chat-container">
        <!-- Header -->
        <div class="chat-header">
          <div class="header-content">
            <div class="avatar">
              <img v-if="chatStore.restaurantAvatar" :src="chatStore.restaurantAvatar" :alt="chatStore.restaurantName" />
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="header-info">
              <h4>{{ chatStore.restaurantName || 'Asistente Virtual' }}</h4>
              <p class="status">
                <span class="status-dot"></span>
                En línea
              </p>
            </div>
          </div>
          <button @click="toggleChat" class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <!-- Messages -->
        <div class="chat-messages" ref="messagesContainer">
          <!-- Mensajes -->
          <div
            v-for="(msg, index) in chatStore.messages"
            :key="index"
            :class="['message', msg.role]"
          >
            <div class="message-content">
              <div class="message-bubble" v-html="renderMarkdown(msg.content)"></div>
              <div class="message-time">
                {{ formatTime(msg.timestamp || new Date()) }}
              </div>
            </div>
          </div>
          
          <!-- Loading indicator -->
          <div v-if="chatStore.isLoading" class="message assistant">
            <div class="message-content">
              <div class="message-bubble">
                <span class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input">
          <form @submit.prevent="sendMessage" class="input-form">
            <button 
              type="button" 
              class="attachment-btn"
              title="Adjuntar archivo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
            </button>
            
            <input
              ref="messageInput"
              v-model="messageText"
              type="text"
              class="message-input"
              placeholder="Escribe tu mensaje..."
              :disabled="chatStore.isLoading"
              @keydown.enter.exact.prevent="sendMessage"
            />
            
            <button 
              type="submit" 
              class="send-btn"
              :disabled="!messageText.trim() || chatStore.isLoading"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
          
          <!-- Powered by -->
          <div class="powered-by">
            Powered by <strong>Tracy AI</strong>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '../stores/chatStore'
import { marked } from 'marked'

const chatStore = useChatStore()
const isOpen = ref(false)
const messageText = ref('')
const messagesContainer = ref(null)
const messageInput = ref(null)
const hasNewMessage = ref(false)
const unreadCount = ref(0)

// Configurar marked
marked.setOptions({
  breaks: true,
  gfm: true
})

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    unreadCount.value = 0
    hasNewMessage.value = false
    nextTick(() => scrollToBottom())
  }
}

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

const formatTime = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const renderMarkdown = (content) => {
  return marked.parse(content)
}

const focusInput = () => {
  nextTick(() => {
    if (messageInput.value) {
      messageInput.value.focus()
    }
  })
}

// Watch for chat ready (primera respuesta del backend)
watch(() => chatStore.isChatReady, (isReady) => {
  if (isReady && chatStore.messages.length > 0) {
    // Abrir el chat automáticamente cuando llega la primera respuesta
    isOpen.value = true
    nextTick(() => scrollToBottom())
  }
})

// Watch for new messages
watch(() => chatStore.messages.length, (newLength, oldLength) => {
  if (newLength > oldLength && !isOpen.value) {
    hasNewMessage.value = true
    unreadCount.value++
  }
  scrollToBottom()

  // Mantener el foco en el input si el chat está abierto
  if (isOpen.value) {
    focusInput()
  }
})
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.chat-fab {
  position: relative;
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

.chat-fab:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.6);
}

.chat-fab.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chat-fab.pulse {
  animation: pulse 2s infinite;
}

.connecting-bubble {
  position: fixed;
  bottom: 100px;
  right: 30px;
  background: white;
  border-radius: 20px;
  padding: 15px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: slideInUp 0.3s ease-out;
  max-width: 200px;
}

.connecting-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.connecting-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.connecting-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}

.connecting-dots span {
  width: 8px;
  height: 8px;
  background: #8B4513;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.connecting-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.connecting-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.4);
  }
  50% {
    box-shadow: 0 4px 25px rgba(139, 69, 19, 0.8);
  }
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid white;
}

.chat-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 400px;
  height: 650px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(135deg, #8B4513, #A0522D);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.status {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.welcome-message {
  text-align: center;
  padding: 40px 20px;
}

.welcome-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.welcome-message h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #333;
}

.welcome-message p {
  color: #666;
  margin-bottom: 20px;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-action-btn {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-size: 0.95rem;
}

.quick-action-btn:hover {
  background: #f5f5f5;
  border-color: #8B4513;
  transform: translateY(-2px);
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

.message-content {
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  line-height: 1.5;
}

.message.user .message-bubble {
  background: linear-gradient(135deg, #8B4513, #A0522D);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-bubble {
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
}

/* Estilos para markdown renderizado */
.message-bubble :deep(p) {
  margin: 0 0 8px 0;
}

.message-bubble :deep(p:last-child) {
  margin-bottom: 0;
}

.message-bubble :deep(strong) {
  font-weight: 600;
}

.message-bubble :deep(em) {
  font-style: italic;
}

.message-bubble :deep(a) {
  color: #8B4513;
  text-decoration: underline;
}

.message.user .message-bubble :deep(a) {
  color: #fff;
  text-decoration: underline;
}

.message-bubble :deep(ul),
.message-bubble :deep(ol) {
  margin: 8px 0;
  padding-left: 20px;
}

.message-bubble :deep(li) {
  margin: 4px 0;
}

.message-bubble :deep(code) {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.message.user .message-bubble :deep(code) {
  background: rgba(255, 255, 255, 0.2);
}

.message-bubble :deep(pre) {
  background: rgba(0, 0, 0, 0.05);
  padding: 10px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 8px 0;
}

.message.user .message-bubble :deep(pre) {
  background: rgba(255, 255, 255, 0.15);
}

.message-bubble :deep(pre code) {
  background: none;
  padding: 0;
}

.message-bubble :deep(blockquote) {
  border-left: 3px solid #8B4513;
  padding-left: 12px;
  margin: 8px 0;
  font-style: italic;
}

.message.user .message-bubble :deep(blockquote) {
  border-left-color: rgba(255, 255, 255, 0.5);
}

.message-time {
  font-size: 0.75rem;
  color: #999;
  padding: 0 8px;
}

.message.user .message-time {
  text-align: right;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #8B4513;
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

.chat-input {
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 15px;
}

.input-form {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.attachment-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.attachment-btn:hover {
  background: #f5f5f5;
  color: #8B4513;
}

.message-input {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s;
}

.message-input:focus {
  border-color: #8B4513;
  box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
}

.send-btn {
  background: linear-gradient(135deg, #8B4513, #A0522D);
  border: none;
  color: white;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.1);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.powered-by {
  text-align: center;
  font-size: 0.75rem;
  color: #999;
}

.powered-by strong {
  color: #8B4513;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Scrollbar */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #8B4513;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #A0522D;
}

/* Responsive */
@media (max-width: 768px) {
  .chat-container {
    width: calc(100vw - 20px);
    height: calc(100vh - 100px);
    bottom: 10px;
    right: 10px;
    border-radius: 15px;
  }
  
  .chat-fab {
    width: 50px;
    height: 50px;
  }
  
  .message-content {
    max-width: 85%;
  }
}
</style>
