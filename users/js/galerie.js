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

Afficher_galerie()
//afficher activite
function Afficher_galerie() {
    fetch("http://localhost:3000/api/auth/Afficher_galerie")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher galerie");
            console.log(data);
            for (let i of data) {
                construction_affiche_projet(i.file)
            }
        });

}

function construction_affiche_projet( imag) {
    const creer = `

                    <div class="project-item h-100 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="project-img">
                            <img src=" ${imag} " class="img-fluid w-100 rounded image_galerie_grand" alt="Image">
                        </div>
                    </div>`
    const creaction_affichage_activite = document.querySelector(".crocher_galerie")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}







//responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event) {
    console.log("oui crois");
    body.classList.toggle("open")
})