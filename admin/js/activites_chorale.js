//clique pour ajour que le formulaire ajouter activite ouvre
document.querySelector(".ajouter_activite_btn").addEventListener("click", function (event) {
  document.querySelector(".formulaire_saire_enregistrement").style.display = "block"
})
//gestion de clik quand on clique sur plus pour ajouter de nouveau champ
let compteur_nombre_champs = 0
document.querySelector(".clique_ajouter_formulaire_saisir").addEventListener("click", function (event) {
  compteur_nombre_champs = compteur_nombre_champs + 1
  construction_de_formulaire(compteur_nombre_champs, 1)

})
//ajouter des champs lorsque on est sur  phase  de modification
let compteur_nombre_champs_modifier = 0
document.querySelector(".ajouter").addEventListener("click", function (event) {

  construction_de_formulaire(compteur_nombre_champs_modifier, 2)
  compteur_nombre_champs_modifier = compteur_nombre_champs_modifier + 1
})

//fonction est appele lorsqu'on click sur plus pour ajouter de nouveau champ
//k ici permet de faire la distinction entre ajouter champs de saisir etant sur la page de modification ou sur la page enregistrer activite
function construction_de_formulaire(i, k) {
  let ajouter_champ = `
  <textarea class="champ_saisi champ_saisi_nom${i} champ_modifier_nom${i}" name="nom" id="" cols="30" rows="10" placeholder="SAISISSEZ LA DESCRIPTION DE L'ACTIVITE ICI"></textarea>
  <input type="time" class="champ_saisi_heure champ_saisi_heure${i} champ_modifier_heure${i}" name="nom_1" id="" placeholder="heure">
  <button class="moins${i} supprimer_champ moins" cacher="${i}">-</button>
  `
  const ajout = document.querySelector(".formulaire_saire" + k)
  ajout.insertAdjacentHTML("beforeend", ajouter_champ)
  supprimer_champ(i)
}



//clik pour enregistre une actvité
document.querySelector(".enregistrer").addEventListener("click", function (event) {
  let tableau = []
  let indice = 0
  //validation pour les champs
  let validation = true;
  for (let k = 0; k <= compteur_nombre_champs; k++) {
    //tester si nom de classe existe
    if (document.querySelector(".champ_saisi_nom" + k)) {
      //Recuperer valeurs
      const nom = document.querySelector(".champ_saisi_nom" + k)
      const heure = document.querySelector(".champ_saisi_heure" + k)
      //valeurs recuperer
      let nom_activite = nom.value
      let heure_activite = heure.value
      //tester si le champ est non vider
      if (heure_activite && nom_activite) {
        //tableau pour stocker nom_activite,theme_activite,heure_activite pour une date et une journee
        tableau[indice] = [nom_activite, heure_activite]
        indice = indice + 1
      }
      else {
        validation = false
      }

    }

  }
  const date = document.querySelector(".champ_saisi_date")
  //converture date
  const [annee, mois, jour] = date.value.split('-');
  const date_activite = `${jour}-${mois}-${annee}`;
  const jour_activite = document.querySelector(".champ_jour")
  const image = document.querySelector(".file")
  //tester il ya pas de champs vide
  if (validation) {
    if (image.files[0] && jour_activite.value) {
      // appel fonction pour enregistrer une activite
      Enregistrer_activite(tableau, jour_activite.value, date_activite, image.files[0])
      console.log("oui");
    }
    else {
      //alerte lorsqu'on n'a pas ajouter image pour une activité
      Gestion_des_erreur_champs_vides( "AJOUTER PHOTO", "", "")
      document.querySelector(".champ_vide").style.display = "block"
      document.querySelector(".recommence").addEventListener("click", function (event) {
        document.querySelector(".champ_vide").style.display = "none"
        document.querySelector(".alerte_champ_vide").remove()

      })
    }
  }
  else {
    //alerte
    Gestion_des_erreur_champs_vides( "DESCRIPTION", "OU", "HEURE")
    document.querySelector(".champ_vide").style.display = "block"
    document.querySelector(".recommence").addEventListener("click", function (event) {
      document.querySelector(".champ_vide").style.display = "none"
      document.querySelector(".alerte_champ_vide").remove()
      validation = true
    })
  }
})


//fonction pour ajouter une activité
function Enregistrer_activite(tableau, jour_activite, date_activite, image) {

  let Formdata = new FormData()
  Formdata.append("jour_activite", jour_activite)
  Formdata.append("date_activite", date_activite)
  Formdata.append("tableau_activite", JSON.stringify(tableau))
  Formdata.append("image", image)
  console.log(tableau);
  console.log(jour_activite);
  fetch("http://localhost:3000/api/auth/activites_chorale", {
    method: 'POST',
    headers: { "Authorization": "Bearer" },
    body: Formdata
  }).then((res) => res.json())
    .then((data) => {
      if (data.erreur) {
        console.log("*****erreur******");
        Gestion_des_erreur_duplication_de_meme_jour(jour_activite)
        document.querySelector(".champ_vide").style.display = "block"
        document.querySelector(".recommence").addEventListener("click", function (event) {
          document.querySelector(".champ_vide").style.display = "none"
          document.querySelector(".alerte_champ_vide").remove()
        })
      }
      else {
        document.location.href = `activites_chorale.html`;
        console.log("*****BONNNNNNN******");
      }
    })

}

// //appel de la fonction pour afficher activites
Afficher_activites_chorale()

//Afficher  activite
function Afficher_activites_chorale() {
  //pour donner le noms des classes differents pour les affichage
  let idheure = 0
  let idnom = 0

  let tableau_jour = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"]
  fetch("http://localhost:3000/api/auth/Afficher_activites_chorale")
    .then((res) => res.json())
    .then((data) => {
      console.log("Afficher_chorale");
      console.log(data);
      for (let k = 0; k <= tableau_jour.length - 1; k++) {
        for (let i of data) {
          //condition pour generer les activité par ordre du jour (du genre lundi a dimanche)
          if (tableau_jour[k] == i.jour_activite) {

            idheure = "idheure" + idheure + 1
            idnom = "idnom" + idnom + 1
            //appel
            construction_affiche_activite(i.jour_activite, i.file, i.tableau_activite, i.date_activite, i._id, idheure, idnom)

          }

        }

      }

      suppression_activites_chorale()
      modifier_activites_chorale()
      supprimer_champ()
    });

}

//fonction pour construire affichage des activites
function construction_affiche_activite(jour, image, tab, date, id_activite, idheure, idnom) {
  const construire = `<div class="affiche_programme_semaine fermer_affecher">
  <p class="titre"> <span> ACTIVITES DE CHORALE POUR LA JOURNEE DU ${jour} ${date=="undefined-undefined-"?"":date}  </span> <span class ="edith modifier" data-value="${id_activite}"> <i class="fa-solid fa-pen-to-square" data-value="${id_activite}"></i></span>  <span class ="delete supprimer" data-value="${id_activite}"> <i class="fa-solid fa-trash" data-value="${id_activite}"></i> </span>     </p>
  <div class="disposition_afficher">
      <div class="affiche_programmess_jour_image">
         <div class="jour_image">
          <span class="jour_date">HEURES</span>
          <span class="description_activite">DESCRIPTION DES ACTIVITE</span>
          <span class="modifier_supprimer">IMAGES</span>
         
         </div>
         <div class="tableau">
              <div class="crocher_heure ${idheure}">
                
              </div>
              <div class="tableau_nom_them crocher_nom_activite ${idnom}">
                
              </div>
              <div class="jour_date_image crocher_image"><img src="${image}" alt=""></div>
              
            </div>
              
         </div>
      </div>
  </div>
</div>`
  const ajouter = document.querySelector(".crocher_affichage")
  ajouter.insertAdjacentHTML("beforeend", construire)
  // appel de fonction construire description et heure pour afficher une activite
  construire_description_heure(tab, idheure, idnom)

}

//fonction pour construire affichage description et heure
function construire_description_heure(tableau_activite, idheure, idnom) {
  for (let j = 0; j <= tableau_activite.length - 1; j++) {
    if (tableau_activite[j]) {
      if (tableau_activite[j][1] && tableau_activite[j][0]) {
        const heure = ` <span class="jour_date_heure">${tableau_activite[j][1]}</span>`
        const crocher_heure = document.querySelector("." + idheure)
        crocher_heure.insertAdjacentHTML("beforeend", heure)

        const crocher_nom_activite = `<span class="nom_theme">${tableau_activite[j][0]}</span>`
        const nom_activite = document.querySelector("." + idnom)
        nom_activite.insertAdjacentHTML("beforeend", crocher_nom_activite)
      }
    }

  }

}



//supprimer activite
function suppression_activites_chorale() {
  const supprimer = document.querySelectorAll(".supprimer")
  supprimer.forEach((el) => {
    console.log("element");
    el.addEventListener("click", function (event) {
      let id = event.target.getAttribute("data-value")
      document.querySelector(".confiermer_supprimer").style.display = "block"
      //clique sur oui pour valider la suppression de activité
      document.querySelector(".oui").addEventListener("click", function (event) {
        fetch(`http://localhost:3000/api/auth/suppression_activites_chorale/${id}`, {
          method: "DELETE",
          headers: { "Authorization": "Bearer" }
        })
          .then((res) => res.json())
          .then(data => {
            // document.querySelector(".information_sur_validation").innerHTML = "confirmeee"
            console.log("oui supprimer avec succee")
            console.log(data)
            //redirection
           document.location.href = `activites_chorale.html`;
          })
      })

    })
  })
  //annuller la suppression de activité
  document.querySelector(".non").addEventListener("click", function (event) {
    document.querySelector(".confiermer_supprimer").style.display = "none"

  })

}

//modifier activite
function modifier_activites_chorale() {
  //id pour le valeur de modification
  let id
  const modifier = document.querySelectorAll(".modifier")
  modifier.forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault()
      id = event.target.getAttribute("data-value")
      // alerte pour confirmer la modification des actives
      document.querySelector(".confiermer_modifier").style.display = "block"
      //pour chercher activié a modifier
      document.querySelector(".oui_modifier").addEventListener("click", function (event) {
        document.querySelector(".modifier_activite").style.display = "block"
        document.querySelector(".confiermer_modifier").style.display = "none"
        //fermulaire d'enregistrement
        document.querySelector(".formulaire_saire_enregistrement").style.display = "none"
        //fermer affichage des activite
        document.querySelector(".crocher_affichage").style.display = "none"
        fetch(`http://localhost:3000/api/auth/Recherche_pour_supprimer_activites_chorale/${id}`)
          .then((res) => res.json())
          .then((data) => {
            compteur_nombre_champs_modifier = data.tableau_activite.length
            if (data.tableau_activite.length >= 2) {
              //generer le formulaire
              for (let i = 1; i < data.tableau_activite.length; i++) {
                if (data.tableau_activite[i]) {
                  construction_de_formulaire(i, 2)
                }
              }
              for (let k = 0; k < data.tableau_activite.length; k++) {
                //ajouter des valeurs dans les champs pour modifier
                if (data.tableau_activite[k]) {
                  const nom = document.querySelector(".champ_modifier_nom" + k)
                  const heure = document.querySelector(".champ_modifier_heure" + k)
                  nom.value = data.tableau_activite[k][0]
                  heure.value = data.tableau_activite[k][1]

                }

              }
              const date = document.querySelector(".champ_modifier_date")
              //conversion de date
              const [jour, mois, annee] = data.date_activite.split('-');
              const date_activite = `${annee}-${mois}-${jour}`;
              date.value = date_activite
              const jour_activite = document.querySelector(".champ_modifier")
              jour_activite.value = data.jour_activite


            }
            else {
              const nom = document.querySelector(".champ_modifier_nom0")
              const heure = document.querySelector(".champ_modifier_heure0")
              const date = document.querySelector(".champ_modifier_date")
              const jour_activite = document.querySelector(".champ_modifier")

              //conversion de date
              const [jour, mois, annee] = data.date_activite.split('-');
              const date_activite = `${annee}-${mois}-${jour}`;
              date.value = date_activite
              nom.value = data.tableau_activite[0][0]
              heure.value = data.tableau_activite[0][1]
              jour_activite.value = data.jour_activite
            }
          });

      })

    })
  })
  //annuller la modification de activite
  document.querySelector(".non_modifier").addEventListener("click", function (event) {
    document.querySelector(".confiermer_modifier").style.display = "none"

  })
  //valider la modification pour modifier activite dans bd
  document.querySelector(".valider_modification").addEventListener("click", function (event) {
    event.preventDefault()
    let indice_nouveau_tableau_mise_jour = 0
    let tableau_modifier = []
    let validation_modification = true
    for (let k = 0; k < compteur_nombre_champs_modifier; k++) {
      //tester si classe existe
      if (document.querySelector(".champ_modifier_nom" + k)) {
        //recuperer le valeurs
        const nom = document.querySelector(".champ_modifier_nom" + k).value;
        const heure = document.querySelector(".champ_modifier_heure" + k).value;
        if (nom && heure) {
          //tableau pour stocker description activite ,heure_activite pour une date et une journee
          tableau_modifier[indice_nouveau_tableau_mise_jour] = [nom, heure]
          indice_nouveau_tableau_mise_jour = indice_nouveau_tableau_mise_jour + 1
        }
        else {
          validation_modification = false
        }
      }
    }
    const date = document.querySelector(".champ_modifier_date")
    const jour_activite = document.querySelector(".champ_modifier")

    const [annee, mois, jour] = date.value.split('-');
    const date_activite = `${jour}-${mois}-${annee}`;

    const image = document.querySelector(".fil")
    let Formdata = new FormData()
    Formdata.append("jour_activite", jour_activite.value)
    Formdata.append("date_activite", date_activite)
    Formdata.append("tableau_activite", JSON.stringify(tableau_modifier))
    Formdata.append("image", image.files[0])
    //si les champs de modifications des activites sont bien rempli
    if (validation_modification) {
      fetch(`http://localhost:3000/api/auth/modifier_activites_chorale/${id}`, {
        method: 'put',
        headers: {
          "Authorization": "Bearer",
        },
        body: Formdata
      }).then((res) => res.json())
        .then((data) => {
          console.log("modifier avec succee");
          document.location.href = `activites_chorale.html`;
        })
    }
    else {
      //appel de fonction qui permet afficher le message d'alerte lors que il ya probleme
      Gestion_des_erreur_champs_vides( "DESCRIPTION OU HEURE", "POUR LA MISE A JOUR DE CET ACTIVITE DU",jour_activite.value )
      document.querySelector(".champ_vide").style.display = "block"
      document.querySelector(".recommence").addEventListener("click", function (event) {
        document.querySelector(".champ_vide").style.display = "none"
        document.querySelector(".alerte_champ_vide").remove()
      })
    }
  })
}


//fonction pour sur supprimer les champs lorsqu'on sur moins(*)
function supprimer_champ(i) {
  const cacher_champ = document.querySelectorAll(".supprimer_champ")
  cacher_champ.forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault()
      let id = event.target.getAttribute("cacher")
        document.querySelector(".moins" + id).remove()
        document.querySelector(".champ_saisi_heure" + id).remove()
        document.querySelector(".champ_saisi_nom" + id).remove()
    })
  })

}


function Gestion_des_erreur_champs_vides(erreur1,concatenation, erreur2) {
  let champs_vide = `
  <div class="alerte_champ_vide">
     <span> VEILLEZ REMPLIRE BIEN LES CHAMPS S'IL VOUS PLAIT  </span>
     <span>REGARDEZ BIEN LES CHAMPS ${erreur1} ${concatenation} ${erreur2} </span>
     <span>CLIQUEZ SUR OK POUR COMPLETER  </span>
     <p> <span class="recommence">OK</span> </p>
  </div>
  `
  const ajout = document.querySelector(".champ_vide")
  ajout.insertAdjacentHTML("beforeend", champs_vide)
}

function Gestion_des_erreur_duplication_de_meme_jour(jour) {
  let champs_vide = `
  <div class="alerte_champ_vide">
     <span>LA JOURNE DE ${jour} A DEJA ENREGISTRER AVEC DES ACTIVITES</span>
     <span>SI VOUS VOULEZ AJOUTER DES ACTIVITE A CETTE DE ${jour} VEILLEZ CLIQUER</span>
     <span>SUR LA MODIFICATION DE CE JOUR</span>
     <span>CLIQUEZ SUR OK  POUR FERMER CETTE PAGE</span>
     <p> <span class="recommence">OK</span> </p>
  </div>
  `
  const ajout = document.querySelector(".champ_vide")
  ajout.insertAdjacentHTML("beforeend", champs_vide)
}


//gestion de l'image pour apparaitre dans le formulaire
let image = document.querySelector("#image_ajouter")
let input = document.querySelector(".file")
input.onchange = function () {
  image.src = URL.createObjectURL(input.files[0])
}

//gestion de l'image pour apparaitre dans le formulaire de modification
let image1 = document.querySelector("#image_ajouter1")
let input1 = document.querySelector(".fil")
input1.onchange = function () {
  image1.src = URL.createObjectURL(input1.files[0])
}

//grstion de mobile
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})


