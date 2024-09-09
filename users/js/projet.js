
const url = new URL(window.location.href);

// Récupérer les paramètres
const nomcommunaute = url.searchParams.get('nomcommunaute');
//ajouter dynamiquement le nom des communautés
// const communaute = ` <span>Communauté ${nomcommunaute} </span>`
// const creaction_affichage_activite = document.querySelector(".titre_texte")
// creaction_affichage_activite.insertAdjacentHTML("beforeend", communaute)


Afficher_liste_communautes_sur_nav_bar()
function Afficher_liste_communautes_sur_nav_bar() {
    fetch("http://localhost:3000/api/auth/Afficher_communaute")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_communaute");
            console.log(data);
            for (let i of data) {
                const creer = `
                   <li><a href="../Pages/activite_hommes.html?nomcommunaute=${i.nom_communaute.toUpperCase()}">${i.nom_communaute.toUpperCase()}</a></li>
                `
                const crocher_communaute = document.querySelector(".crocher_communaute")
                crocher_communaute.insertAdjacentHTML("beforeend", creer)

            }
        });

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
    const creer = `

                        <div class="project-item h-100 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="project-img">
                            <img src=" ${imag} " class="img-fluid w-100 rounded" alt="Image">
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
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}







//responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event) {
    console.log("oui crois");
    body.classList.toggle("open")
})