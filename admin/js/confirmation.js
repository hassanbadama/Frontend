const token = localStorage.getItem("code")
if (!token) {
  document.location.href = `connecter.html`;
}

// Récupérer les paramètres
const url = new URL(window.location.href);
const mouvement = url.searchParams.get('mouvement');

const url_id = new URL(window.location.href);
const id_connecter = url_id.searchParams.get('id_user_connecter');
console.log("id_connecter");
console.log(id_connecter);
//ajouter dynamiquement sur le nom de mouvement sur la liste deroulante

Afficher_liste_des_mouvements()
function Afficher_liste_des_mouvements() {
    fetch("http://localhost:3000/api/auth/Afficher_communaute")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_communaute");
            console.log(data);
            for (let i of data) {
                const crocher_pour_naviguer =  `
                <li><a href="../Pages/mouvement.html?mouvement=${i.nom_communaute.toUpperCase()}">${i.nom_communaute.toUpperCase()}</a></li>
             `
             const crocher_pour_navigue = document.querySelector(".crocher_pour_naviguer")
             crocher_pour_navigue.insertAdjacentHTML("beforeend", crocher_pour_naviguer)

             const crocher_pour_navigueresponsable =  `
                <li><a href="../Pages/responsables_mouvement.html?mouvement=${i.nom_communaute.toUpperCase()}">${i.nom_communaute.toUpperCase()}</a></li>
             `
             const crocher_pour_navigue_responsable = document.querySelector(".crocher_pour_naviguer_responsable")
             crocher_pour_navigue_responsable.insertAdjacentHTML("beforeend", crocher_pour_navigueresponsable)
                
            }
        });

}



// //appel de la fonction afficher les responsables
Affiche_connecter()
//afficher activite
function Affiche_connecter() {
    console.log("id***");
    console.log(id_connecter);
    fetch(`http://localhost:3000/api/auth/Rechercher_admin/${id_connecter}`)
        .then((res) => res.json())
        .then((data) => {
            construction_affiche_admin(data.nom_user, data.file, data._id)
        });
}



function construction_affiche_admin(nom,imag, id_activite) {
    const creer = `
    	<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2> VOUS ETES CONNECTEZ EN TANT QUE ${nom.toUpperCase()} </b></h2>
						</div>
					</div>
					<div class="container">
						<div class="user_connecter">
							<img class="image_user_connecter" src="${imag}" alt="" srcset="">
						</div>
					</div>
			</div>
   
`
    const creaction_affichage_activite = document.querySelector(".crocher_user_connecter")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}



//les responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})