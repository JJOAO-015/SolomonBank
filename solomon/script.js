const ulrUF ='https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const uf = document.getElementById("uf")
const cidade = document.getElementById("cidade")

uf.addEventListener('change', async function(){

   const urlCidades = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf.value+'/municipios'
    const request = await fetch(urlCidades)
    const response = await request.json()

    let options = ''
    response.forEach(function(cidades){
      options += '<option>' +cidades.nome+ '</option>'
    })
cidade.innerHTML = options

})

window.addEventListener('load', async () => {
    const request = await fetch(ulrUF)
    const response = await request.json()


    const options = document.createElement("optgroup")
    options.setAttribute('label', 'UFs')
    response.forEach(function(uf){
        options.innerHTML += '<option>' +uf.sigla+ '</option>'
    })

    uf.append(options)

   // response.sort((a, b) => (a.sigla > b.sigla ? 1 : -1))
})

const formEl = document.getElementById('formulario-api')

formEl.addEventListener('submit', evento => {
  evento.preventDefault(); 

  const formData = new FormData(formEl); 
  const data = Object.fromEntries(formData); 

  console.log(data)
})


function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  document.getElementById('lengthCheck').classList.toggle('valid', hasLength);
  document.getElementById('upperCheck').classList.toggle('valid', hasUpper);
  document.getElementById('numberCheck').classList.toggle('valid', hasNumber);
  document.getElementById('specialCheck').classList.toggle('valid', hasSpecial);

  return hasLength && hasUpper && hasNumber && hasSpecial;
}

