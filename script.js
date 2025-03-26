const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("messages");
const paymentModal = document.getElementById("payment-modal");
const processPaymentBtn = document.getElementById("process-payment");
const closePaymentModalBtn = document.getElementById("close-payment-modal");

// Función para agregar mensaje
function addMessage(content, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(`${sender}-message`);
  messageDiv.innerText = content;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Respuesta automática del bot
function botResponse(message) {
  if (message.includes("pago")) {
    addMessage("¡Claro! Por favor, ingresa los detalles de tu tarjeta de crédito para procesar el pago.", "bot");
    openPaymentModal();
  } else if (message.includes("ropa")) {
    addMessage("Tenemos una gran variedad de ropa. ¿Buscas algo específico?", "bot");
  } else {
    addMessage("Lo siento, no entiendo eso. ¿Cómo puedo ayudarte con tu compra?", "bot");
  }
}

// Función para abrir el modal de pago
function openPaymentModal() {
  paymentModal.style.display = "flex";
}

// Función para cerrar el modal de pago
closePaymentModalBtn.addEventListener("click", () => {
  paymentModal.style.display = "none";
});

// Función para procesar el pago (simulación)
processPaymentBtn.addEventListener("click", () => {
  const cardNumber = document.getElementById("credit-card").value;
  const expiration = document.getElementById("expiration").value;
  const cvv = document.getElementById("cvv").value;

  if (!cardNumber || !expiration || !cvv) {
    alert("Por favor, completa todos los campos.");
  } else {
    addMessage("Pago procesado exitosamente. ¡Gracias por tu compra!", "bot");
    paymentModal.style.display = "none";
  }
});

// Enviar mensaje
sendBtn.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, "user");
    userInput.value = ""; // Limpiar el campo de entrada
    botResponse(userMessage);
  }
});

// Enviar mensaje al presionar Enter
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
