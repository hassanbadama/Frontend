Afficher_liste_communautes_sur_nav_bar()
function Afficher_liste_communautes_sur_nav_bar() {
    fetch("http://localhost:3000/api/auth/Afficher_communaute")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_communaute");
            console.log(data);
            for (let i of data) {
               const creer =  `
                   <li><a href="../Pages/activite_mouvement.html?nomcommunaute=${i.nom_communaute.toUpperCase()}">${i.nom_communaute.toUpperCase()}</a></li>
                `
                const crocher_communaute = document.querySelector(".crocher_communaute")
                crocher_communaute.insertAdjacentHTML("beforeend", creer)

                const pied_page =  `
                 <a href="../Pages/activite_mouvement.html?nomcommunaute=${i.nom_communaute.toUpperCase()}"><i class="fas fa-angle-right me-2"></i> ${i.nom_communaute.toUpperCase()}</a>
             `
             const pied_pages = document.querySelector(".crocher_pied_page")
             pied_pages.insertAdjacentHTML("beforeend", pied_page)
                
            }
        });

}


Afficher_galerie()
function Afficher_galerie() {
    fetch("http://localhost:3000/api/auth/Afficher_galerie")
        .then((res) => res.json())
        .then((slides) => {
            console.log("Afficher_galerie");
            console.log(slides);
            Images_banner(slides)
        });
}
//fonction pour defiler les images
function Images_banner(slides) {
    const image = document.querySelector(".image_banner")
    const droite = document.querySelector(".icone_droite");
    //const teste = document.querySelector(".image_rigth")
    const gauche = document.querySelector(".icone_gauche");
    const dot = document.querySelector(".dots1")

    const taille = length.slides;
    for (let i = 0; i <= slides.length - 1; i++) {
        const div = document.createElement("div")
        div.classList.add("dot")
        console.log("tete " + i)
        dot.appendChild(div)
    }
   //let tabtaille = Object.values(slides);
   let tabtaille = slides;
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
        image.src = tabtaille[compteur].file
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
        image.src =  tabtaille[compteur].file
        dot1[compteur].classList.add("dot_selected")
    })

    
    function incrementation(){
        dot1[compteur].classList.remove("dot_selected")
        compteur++
        if (compteur == slides.length) {
            compteur = 0
        }
        image.src = tabtaille[compteur].file
        dot1[compteur].classList.add("dot_selected")
    }
    setInterval(incrementation, 3000)
    
}


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



// //appel de la fonction afficher activite
afficher_activite()
//afficher activite
function afficher_activite(){
//pour donner le noms des classes differents pour les affichage
  let tableau_jour = ["LUNDI","MARDI","MERCREDI","JEUDI","VENDREDI","SAMEDI","DIMANCHE"]
  fetch("http://localhost:3000/api/auth/Afficher_programmes_semaine")
  .then((res) => res.json())
  .then((data) => {
  console.log("Afficher choralee");
  console.log(data);
  for (let k = 0; k <= tableau_jour.length - 1; k++) {
      for (let i of data) {
        //condition pour generer les activité par ordre du jour (du genre lundi a dimanche)
          if (tableau_jour[k] == i.jour_activite) {
            //appel
            construction_affiche_activite(i.tableau_activite,i.file,i.jour_activite)
          }
      }
  }
});
}



function construction_affiche_activite(tableau_activite,image,jour) {
for (let j = 0; j <= tableau_activite.length - 1; j++) {
  //construction de activite a savoir  heure nom actvite theme de actvite
  if (tableau_activite[j]) {
    if (tableau_activite[j][1]&&tableau_activite[j][0]) {
    const creer = `
    <div class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
    <div class="service-item bg-light rounded">
        <div class="service-img">
            <img src="${image}" class="img-fluid w-100 rounded-top" alt="">
        </div>
        <div class="service-content text-center p-4">
            <div class="service-content-inner">
                <a href="#" class="h4 mb-4 d-inline-flex text-start"> <i class="fa-solid fa-book-open-reader me-2"></i>  ${jour}</a><br>
                <span class="heure" >HEURE: ${tableau_activite[j][1]}</span>
                <p class="mb-4">${tableau_activite[j][0]}
                </p>
               
            </div>
        </div>
    </div>
</div>
    
   `
    const creaction_affichage_activite = document.querySelector(".crocher_programme_semaine")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
    }
  }
} 
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