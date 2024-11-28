import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';

// Configuração do Firebase
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

// Referências aos elementos do HTML
const welcomeMessage = document.getElementById('welcomeMessage');
const userNameElement = document.getElementById('userName');  // Onde o nome do usuário será exibido
const loginLogoutButton = document.getElementById('loginLogoutButton'); // Botão de login/logout

// Checando o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuário logado
    console.log('Usuário logado:', user);

    // Exibe a mensagem de boas-vindas
    welcomeMessage.style.display = 'block'; // Torna a div visível
    userNameElement.textContent = user.displayName || user.email;  // Exibe o nome ou e-mail do usuário

    // Atualiza o botão para "Sair"
    loginLogoutButton.textContent = 'SAIR';
    loginLogoutButton.setAttribute('href', '#');

    // Logout ao clicar no botão
    loginLogoutButton.addEventListener('click', () => {
      auth.signOut().then(() => {
        window.location.href = 'Login.html';  // Redireciona para a página de login
      });
    });
  } else {
    // Usuário não está logado
    console.log('Nenhum usuário logado');

    // Esconde a mensagem de boas-vindas
    welcomeMessage.style.display = 'none';

    // Atualiza o botão para "Acessar"
    loginLogoutButton.textContent = 'ACESSAR';
    loginLogoutButton.setAttribute('href', 'Login.html');
  }
});
