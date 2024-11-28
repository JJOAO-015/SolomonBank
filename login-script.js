import { getAuth, signInWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';

const firebaseConfig = {
  apiKey: "AIzaSyCQMIux5PccSHoph5ULRL5DrRXrDfCGxPU",
  authDomain: "solomonbank-c0110.firebaseapp.com",
  projectId: "solomonbank-c0110",
  storageBucket: "solomonbank-c0110.firebasestorage.app",
  messagingSenderId: "717881916836",
  appId: "1:717881916836:web:76a801c1ae79a321e55531",
  measurementId: "G-ZP5CP3RETF"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Elementos do formulário de login
const loginForm = document.getElementById('formulario-login');
const loginError = document.getElementById('loginError');
const nomeInput = document.getElementById('nome');  // Campo de nome do formulário

// Função de login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const nome = nomeInput.value;  // Capturando o nome digitado

  try {
    // Realizando o login com o Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Caso seja a primeira vez que o usuário faz login, atualiza o nome
    if (user && !user.displayName) {
      await updateProfile(user, {
        displayName: nome
      });
    }

    // Redireciona para a página principal após login
    window.location.href = 'index.html';
  } catch (error) {
    // Exibindo erro de login
    loginError.style.display = 'block';
    loginError.textContent = "Erro ao fazer login. Verifique suas credenciais.";
  }
});
