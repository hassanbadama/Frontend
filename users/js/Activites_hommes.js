
//fonction pour construire affichage des activites
function construction_affiche_activite(jour,image,tab,date,idnom) {
    const creer = `<div class="affiche_programme_semaine fermer_affecher">
    <p class="titre">ACTIVITEs DES HOMMES  ${jour} LE ${date} </p>
    <div class="cards_flex ${idnom}">

      </div>
    </div> `
    const creaction_affichage_activite = document.querySelector(".crocher")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
    construire_nom_heure(tab, image,idnom)
}

function construire_nom_heure(tableau_activite,image,idnom) {
  for (let j = 0; j <= tableau_activite.length - 1; j++) {
    //construction de activite a savoir  heure nom actvite theme de actvite
    if (tableau_activite[j]) {
      if (tableau_activite[j][1]&&tableau_activite[j][0]) {
      const creer = `       
       <div class="card">
          <div> <img src="${image}" alt="" srcset=""> </div>
          <div class="heure"><span>HEURE: <span>${tableau_activite[j][1]}</span> </span></div>
          <div><span>${tableau_activite[j][0]}</span></div>
       </div> `
      const creaction_affichage_activite = document.querySelector("."+idnom)
      creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
      }
    }
  } 
}
// //appel de la fonction afficher_programme_semaine pour afficher le programme de la semaine
afficher_programmes_semaine()
//Afficher programme de la semaine
function afficher_programmes_semaine(){
  //pour donner le noms des classes differents pour les affichage
   let idnom = 0
    let tableau_jour = ["LUNDI","MARDI","MERCREDI","JEUDI","VENDREDI","SAMEDI","DIMANCHE"]
    fetch("http://localhost:3000/api/auth/Afficher_activites_hommes")
    .then((res) => res.json())
    .then((data) => {
    console.log("Afficher_programme_semaine");
    console.log(data);
    for (let k = 0; k <= tableau_jour.length - 1; k++) {
        for (let i of data) {
          //condition pour generer les activité par ordre du jour (du genre lundi a dimanche)
            if (tableau_jour[k] == i.jour_activite) {
              idnom = "idnom"+idnom + 1
              //appel
              construction_affiche_activite(i.jour_activite, i.file, i.tableau_activite, i.date_activite,idnom)
            }
        }
    }
 });
}
