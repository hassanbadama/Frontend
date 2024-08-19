//les image qui seront defiler 
const slides = [
    {
        "image": "a1.jpeg"
    },
    {
        "image": "e.jpeg"
    },
    {
        "image": "image1.jpeg"
    },
    {
        "image": "image2.jpeg"
    },
    {
        "image": "a2.jpeg"
    },
    {
        "image": "a3.jpeg"
    },
    {
        "image": "a4.jpeg"
    }
]

const image = document.querySelector(".image_banner")
const droite = document.querySelector(".icone_droite");
//const teste = document.querySelector(".image_rigth")
const gauche = document.querySelector(".icone_gauche");
const dot = document.querySelector(".dots1")

const taille = length.slides;
let tab = []
let tabtaille = Object.values(slides);
console.log(tab)
//pour mettre le ronde 
for (let i = 0; i <= slides.length - 1; i++) {
    const div = document.createElement("div")
    div.classList.add("dot")
    console.log("tete " + i)
    dot.appendChild(div)
}

const dot1 = document.querySelectorAll(".dot")
console.log("--- p " + dot1)
let compteur = 0
dot1[compteur].classList.add("dot_selected")
//qui permet defiler lorsqu'on click a droite
droite.addEventListener("click", function () {
    dot1[compteur].classList.remove("dot_selected")
    compteur++
    if (compteur == slides.length) {
        compteur = 0
    }
    image.src = "../images/" + tabtaille[compteur].image
    dot1[compteur].classList.add("dot_selected")
})
//qui permet defiler lorsqu'on click a gauche
gauche.addEventListener("click", function () {
    console.log("cliquer gauche")
    dot1[compteur].classList.remove("dot_selected")
    compteur--
    if (compteur < 0) {
        compteur = slides.length-1
    }
    image.src = "../images/" + tabtaille[compteur].image
    dot1[compteur].classList.add("dot_selected")
})
//qui permet de defiler image chaque seconde
function incrementation(){
    dot1[compteur].classList.remove("dot_selected")
    compteur++
    if (compteur == slides.length) {
        compteur = 0
    }
    image.src = "../images/" + tabtaille[compteur].image
    dot1[compteur].classList.add("dot_selected")
}
setInterval(incrementation, 1000)

//responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})