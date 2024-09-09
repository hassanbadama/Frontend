

// //appel de la fonction afficher activite
afficher_activite()
//afficher activite
function afficher_activite(){
//pour donner le noms des classes differents pour les affichage
  let tableau_jour = ["LUNDI","MARDI","MERCREDI","JEUDI","VENDREDI","SAMEDI","DIMANCHE"]
  fetch("http://localhost:3000/api/auth/Afficher_activites_jeunes")
  .then((res) => res.json())
  .then((data) => {
  console.log("Afficher jeune");
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
    const creaction_affichage_activite = document.querySelector(".justify-content-center")
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