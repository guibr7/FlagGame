
let responseInput = document.querySelector("#responseInput");
let country;
let flag;
let pontuacao = { acertos:0,erros:0 }
let acerto = document.querySelector("#acerto");
let erro = document.querySelector("#erro");


getCountry()

async function getCountry(){
    const request = await fetch("https://restcountries.com/v3.1/all");
    const ResponseAPI = await request.json();
    displayFlag(ResponseAPI);
}

const divFlag = document.querySelector("#flag")

function displayFlag(ResponseAPI){

    country = ResponseAPI[Math.floor(Math.random()*250)];
    console.log(country.translations.por.common);
    languageCountry = country.translations.por.common;
    flag = country.flags.png;
    divFlag.setAttribute("src",flag);
}

document.querySelector("#form").addEventListener("submit",function(event){
  if(responseInput.value.toLowerCase() === languageCountry.toLowerCase()){
    confirm('correto');
    pontuacao.acertos+=1
    acerto.innerHTML = pontuacao.acertos
    getCountry();
    responseInput.value = ''
  }
 })

 document.querySelector("#skipButton").addEventListener("click",(event)=>{
    event.this
    pontuacao.erros+=1
    erro.innerHTML = pontuacao.erros
    getCountry()
 })
