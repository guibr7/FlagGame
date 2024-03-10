let responseInput = document.querySelector("#responseInput");
let country;
let flag;
let pontuacao = { acertos:0,erros:0,pulos:0}
let acerto = document.querySelector("#acerto");
let erro = document.querySelector("#erro");
let pulo = document.querySelector('#jump');

getCountry()
async function getCountry(){
    const request = await fetch("https://restcountries.com/v3.1/all");
    const ResponseAPI = await request.json();
    console.log(ResponseAPI);
    displayFlag(ResponseAPI);
}

let divFlag = document.getElementById('flag')

function displayFlag(ResponseAPI){
  responseInput.style.color="#000000";
  country = ResponseAPI[Math.floor(Math.random()*250)];
  console.log(country.translations.por.common); //resposta
  languageCountry = (country.translations.por.common).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  flag = country.flags.png;
  console.log(flag)
  divFlag.style.backgroundImage = `url(${flag})`
}

document.querySelector("#skipButton").addEventListener("click",(event)=>{ restartGame()})

document.querySelector("#form").addEventListener("submit",function(event){
  let responsev1  = responseInput.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")

  if(responsev1 == languageCountry){ //resposta certa
    pontuacao.acertos+=1;
    acerto.innerHTML = pontuacao.acertos;
    responseInput.value = 'CORRETO!'
    responseInput.style.color="#00d857";
    document.querySelector("#skipButton").setAttribute('disabled','')
    responseInput.setAttribute('disabled','')
    setTimeout(()=>{
      responseInput.value = ''
      document.querySelector("#skipButton").removeAttribute('disabled');
      responseInput.removeAttribute('disabled');
      getCountry()
    },1200)
  }

  else if(responsev1 == ''){restartGame()}

  else if(responsev1 != languageCountry) { //resposta errada
    pontuacao.erros+=1;
    erro.innerHTML = pontuacao.erros;
    document.querySelector("#skipButton").setAttribute('disabled','')
    responseInput.setAttribute('disabled','')
    responseInput.value = (`Resposta correta: ${country.translations.por.common}`)
    setTimeout(()=>{
      responseInput.value = ''
      document.querySelector("#skipButton").removeAttribute('disabled');
      responseInput.removeAttribute('disabled');
      getCountry()
    },3000)
  } 
})

async function restartGame(){
  responseInput.style.color="#2470eb";
  responseInput.value = (`Resposta correta: ${country.translations.por.common}`);
  document.querySelector("#skipButton").setAttribute('disabled','');
  responseInput.setAttribute('disabled','');
  pontuacao.pulos+=1;
  pulo.innerHTML = pontuacao.pulos;
  setTimeout(()=>{
    responseInput.value = '';
    document.querySelector("#skipButton").removeAttribute('disabled');
    responseInput.removeAttribute('disabled');
    getCountry()
  },3000)
}


