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
setInterval(incrementation, 3000)




// //appel de la fonction afficher les responsables
Afficher_responsable_eglise()
//afficher activite
function Afficher_responsable_eglise() {
    fetch("http://localhost:3000/api/auth/Afficher_responsable_eglise")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_responsable_eglise");
            console.log(data);
            for (let i of data) {
                construction_affiche_responsables(i.nom, i.prenom, i.file, i.fonction, i.contact, i.quartier, i._id)
            }
        });

}

function construction_affiche_responsables(nom, prenom, imag, fonction, contact, quartier, id_activite) {
    const creer = `
     <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="team-item rounded">
                        <div class="team-img">
                            <img src="${imag}" class="img-fluid w-100 rounded-top responsable" alt="Image">
                            <div class="team-icon">
                                <a class="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href=""><i
                                        class="fas fa-share-alt"></i></a>
                                <div class="team-icon-share">
                                    <a class="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href=""><i
                                            class="fab fa-facebook-f"></i></a>
                                    <a class="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href=""><i
                                            class="fab fa-twitter"></i></a>
                                    <a class="btn btn-primary btn-sm-square text-white rounded-circle mb-0" href=""><i
                                            class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="team-content bg-dark text-center rounded-bottom p-4">
                            <div class="team-content-inner rounded-bottom">
                            <p class="text-muted mb-0">${fonction}</p>
                                <h4 class="text-white">${nom}</h4>
                                <p class="text-muted mb-0">${prenom}</p>
                            </div>
                        </div>
                    </div>
                </div>
`
    const creaction_affichage_activite = document.querySelector(".crocher_responsable")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}



Afficher_projet()
//afficher activite
function Afficher_projet() {
    fetch("http://localhost:3000/api/auth/Afficher_projet")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher projet");
            console.log(data);
            for (let i of data) {
                construction_affiche_projet(i.description, i.file)
            }
        });

}

function construction_affiche_projet(descriptionom, imag) {
    const Afficher_projets = `

                        <div class="project-item h-100 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="project-img">
                            <img src=" ${imag} " class="img-fluid w-100 rounded image_projet_grand" alt="Image">
                        </div>
                        <div class="project-content bg-light rounded p-4">
                            <div class="project-content-inner">
                                <div class="project-icon mb-3"><i class="fas fa-chart-line fa-4x text-primary"></i></div>
                                <a href="#" class="h4"> ${descriptionom}</a>
                                <div class="pt-4">
                                    <img src="${imag}" class="img-fluid w-100 rounded image_projet" alt="Image">
                                </div>
                            </div>
                        </div>
                    </div>`
    const creaction_affichage_activite = document.querySelector(".crocher_projet")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", Afficher_projets)
}






//responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})