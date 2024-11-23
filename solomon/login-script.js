// Importando funções do Firebase
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';

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

// Função de login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Realizando o login com o Firebase Auth
    await signInWithEmailAndPassword(auth, email, password);

    // Redireciona para a página principal após login
    window.location.href = 'index.html';
  } catch (error) {
    // Exibindo erro de login
    loginError.style.display = 'block';
  }
});
