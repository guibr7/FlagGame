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
    console.log(ResponseAPI)
    displayFlag(ResponseAPI);
}

const divFlag = document.querySelector("#flag")

function displayFlag(ResponseAPI){
  country = ResponseAPI[Math.floor(Math.random()*250)];
  console.log(country.translations.por.common);
  languageCountry = (country.translations.por.common).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  flag = country.flags.png;
  divFlag.setAttribute("src",flag);
}

document.querySelector("#form").addEventListener("submit",function(event){

  let responsev1  = responseInput.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")

  if(responsev1 == languageCountry){
    responseInput.value = ''
    confirm('correto');
    pontuacao.acertos+=1;
    acerto.innerHTML = pontuacao.acertos;
    getCountry();
  } else {
    responseInput.value = country.translations.por.common
  }
 })

 document.querySelector("#skipButton").addEventListener("click",(event)=>{
    responseInput.value = ''
    pontuacao.erros+=1
    erro.innerHTML = pontuacao.erros
    getCountry()
 })
