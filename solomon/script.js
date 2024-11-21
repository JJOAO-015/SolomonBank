// Importar funções do Firebase (módulo)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js';

const firebaseConfig = {
  apiKey: "AIzaSyCQMIux5PccSHoph5ULRL5DrRXrDfCGxPU",
  authDomain: "solomonbank-c0110.firebaseapp.com",
  projectId: "solomonbank-c0110",
  storageBucket: "solomonbank-c0110.firebasestorage.app",
  messagingSenderId: "717881916836",
  appId: "1:717881916836:web:76a801c1ae79a321e55531",
  measurementId: "G-ZP5CP3RETF"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Obter instância do Firebase Auth
const auth = getAuth();

// Inicializar Firestore
const db = getFirestore(app);

// Carregar UFs
const urlUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");

document.addEventListener('DOMContentLoaded', function () {
  // Verifica se o elemento 'uf' existe antes de adicionar o event listener
  if (uf) {
    uf.addEventListener('change', async function () {
      const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.value}/municipios`;
      try {
        const request = await fetch(urlCidades);
        const response = await request.json();

        let options = '<option value="">Selecione uma cidade</option>';
        response.forEach(function (cidadeData) {
          options += `<option value="${cidadeData.nome}">${cidadeData.nome}</option>`;
        });

        if (cidade) cidade.innerHTML = options;
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      }
    });
  }

  // Carregar estados
  fetch(urlUF)
    .then(response => response.json())
    .then(data => {
      let options = '<option value="">Selecione um estado</option>';
      data.forEach(function (estado) {
        options += `<option value="${estado.sigla}">${estado.sigla}</option>`;
      });

      if (uf) uf.innerHTML = options;
    })
    .catch(error => {
      console.error('Erro ao carregar estados:', error);
    });

  // Função para validar o formato de um email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Função para validar os requisitos de uma senha
  function validatePassword(password) {
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    const lengthCheck = document.getElementById('lengthCheck');
    const upperCheck = document.getElementById('upperCheck');
    const numberCheck = document.getElementById('numberCheck');
    const specialCheck = document.getElementById('specialCheck');

    if (lengthCheck) lengthCheck.classList.toggle('valid', hasLength);
    if (upperCheck) upperCheck.classList.toggle('valid', hasUpper);
    if (numberCheck) numberCheck.classList.toggle('valid', hasNumber);
    if (specialCheck) specialCheck.classList.toggle('valid', hasSpecial);

    return hasLength && hasUpper && hasNumber && hasSpecial;
  }

  // Função para validar CPF
  function validateCPF(cpf) {
    cpf = String(cpf); // Garantir que o CPF seja tratado como string
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0, weight = 10;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * weight--;
    }
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;
    if (parseInt(cpf.charAt(9)) !== firstDigit) return false;

    sum = 0; weight = 11;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * weight--;
    }
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;
    return parseInt(cpf.charAt(10)) === secondDigit;
  }

  // Evento de envio do formulário de registro
  const formulario = document.getElementById('formulario-api');
  if (formulario) {
    formulario.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('fullname').value;
      const email = document.getElementById('email').value;
      const confirmEmail = document.getElementById('confirmEmail').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const cpf = document.getElementById('cpf').value || ''; // Garantir que o valor do CPF seja uma string
      const phone = document.getElementById('phone').value || '';
      const dob = document.getElementById('dob').value || '';
      const motherName = document.getElementById('motherName').value || '';
      const uf = document.getElementById('uf').value || '';
      const cidade = document.getElementById('cidade').value || '';

      let hasError = false;

      // Verificação de nome
      if (name.length < 3) {
        document.getElementById('nameError').style.display = 'block';
        hasError = true;
      } else {
        document.getElementById('nameError').style.display = 'none';
      }

      // Verificação de email
      if (!validateEmail(email)) {
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
      } else {
        document.getElementById('emailError').style.display = 'none';
      }

      // Verificação de confirmação de email
      if (email !== confirmEmail) {
        document.getElementById('confirmEmailError').style.display = 'block';
        hasError = true;
      } else {
        document.getElementById('confirmEmailError').style.display = 'none';
      }

      // Validação da senha
      const isPasswordValid = validatePassword(password);
      if (!isPasswordValid) {
        hasError = true;
      }

      // Verificação de confirmação de senha
      if (password !== confirmPassword) {
        document.getElementById('passwordError').style.display = 'block';
        hasError = true;
      } else {
        document.getElementById('passwordError').style.display = 'none';
      }

      // Verificação do CPF
      if (!validateCPF(cpf)) {
        document.getElementById('cpfError').style.display = 'block';
        hasError = true;
      } else {
        document.getElementById('cpfError').style.display = 'none';
      }

      // Se não houver erros, registrar usuário no Firebase Auth e salvar os dados no Firestore
      if (!hasError) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log('Usuário registrado:', user);

          // Salvar todos os dados do usuário no Firestore
          await setDoc(doc(db, "users", user.uid), {
            fullName: name,
            email: email,
            cpf: cpf,
            phone: phone,
            dob: dob,
            motherName: motherName,
            uf: uf,
            cidade: cidade,
            createdAt: new Date() // Adiciona a data de criação do usuário
          });

          // Exibir mensagem de sucesso e redirecionar
          document.getElementById('registerSuccess').style.display = 'block';
          setTimeout(() => {
            window.location.href = 'index.html';  // Redirecionar para uma página desejada
          }, 2000);
        } catch (error) {
          console.error("Erro ao registrar:", error.message);
          document.getElementById('registerSuccess').style.display = 'block';
        }
      } else {
        document.getElementById('registerSuccess').style.display = 'none';
      }
    });
  }
});
