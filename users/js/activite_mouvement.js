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


const url = new URL(window.location.href);

// Récupérer les paramètres
const nomcommunaute = url.searchParams.get('nomcommunaute');
//ajouter dynamiquement le nom des communautés
const communaute = ` <span>COMMUNAUTE ${nomcommunaute} </span>`
const creaction_affichage_activite = document.querySelector(".titre_texte")
creaction_affichage_activite.insertAdjacentHTML("beforeend", communaute)


Afficher_responsable_communaute()
//afficher activite
function Afficher_responsable_communaute() {
    fetch("http://localhost:3000/api/auth/Afficher_responsable_communaute")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_responsable_communaute");
            console.log(data);
            for (let i of data) {
                if (i.communaute.toUpperCase() == nomcommunaute) {
                  console.log("ou ouiii");
                  
                  construction_affiche_responsable(i.nom, i.prenom, i.file, i.fonction)
                }
            }     
        });

}

function construction_affiche_responsable(nom, prenom, imag, fonction) {
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
                                <h5 class="text-white">${nom}</h5>
                                <h5 class="text-white">${prenom}</h5>
                               
                            </div>
                        </div>
                    </div>
                </div>
`
    const creaction_affichage_activite = document.querySelector(".crocher_responsable")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}





// //appel de la fonction afficher les responsables
Afficher_activite_communaute()
//afficher activite
function Afficher_activite_communaute() {
    fetch("http://localhost:3000/api/auth/Afficher_mouvements")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_activite_eglise");
            console.log(data);
            for (let i of data) {
                if (i.mouvement.toUpperCase() == nomcommunaute) {
                    console.log("oui biennn");
                    console.log(data);
                    
                    construction_affiche_activite_communaute(i.tableau_activite, i.file, i.jour_activite)
                }
            } 
        });

}



function construction_affiche_activite_communaute(tableau_activite,image,jour) {
    for (let j = 0; j <= tableau_activite.length - 1; j++) {
        if (tableau_activite[j]) {
          if (tableau_activite[j][1] && tableau_activite[j][0]) {
            console.log("oui biennn arrr");
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
            const creaction_affichage_activite = document.querySelector(".activites")
            creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
           
          }
        }
    
      }
}






//responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
    console.log("oui crois");
  body.classList.toggle("open")
})