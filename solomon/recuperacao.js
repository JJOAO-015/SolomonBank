// Importando o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função para enviar o link de redefinição de senha
function resetPassword() {
    const email = document.getElementById('email').value;  // Supondo que o campo de e-mail tenha o id 'email'

    // Validação simples do e-mail
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    // Enviando o e-mail para redefinir a senha
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Exibe uma mensagem de sucesso para o usuário
        alert('Enviamos um link para redefinir sua senha! Verifique seu e-mail.');

        // Redireciona o usuário para a página de login após 2 segundos
        setTimeout(() => {
          window.location.href = 'Login.html';  // Altere para o caminho correto da sua página de login
        }, 2000);
      })
      .catch((error) => {
        // Tratamento de erro
        const errorCode = error.code;
        const errorMessage = error.message;

        // Exibindo mensagens de erro mais amigáveis
        if (errorCode === 'auth/user-not-found') {
          alert('Não encontramos um usuário com esse e-mail.');
        } else if (errorCode === 'auth/invalid-email') {
          alert('O e-mail fornecido não é válido.');
        } else {
          alert('Erro ao enviar e-mail de redefinição: ' + errorMessage);
        }
      });
}

// Certifique-se de adicionar o evento de clique após o DOM estar carregado
document.addEventListener('DOMContentLoaded', function() {
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    resetPasswordBtn.addEventListener('click', resetPassword);
});
