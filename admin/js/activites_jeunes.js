//gestion de clik quand on clique sur plus pour ajouter de nouveau champ
let compteur_nombre_champs = 0
document.querySelector(".clique_ajouter_formulaire_saisir").addEventListener("click", function (event){
  compteur_nombre_champs = compteur_nombre_champs+1
  construction_de_formulaire(compteur_nombre_champs,1)
 
})
//ajouter des champs lorsque on est sur  phase  de modification
let compteur_nombre_champs_modifier=0
document.querySelector(".ajouter").addEventListener("click", function (event){
  
  construction_de_formulaire(compteur_nombre_champs_modifier,2)
  compteur_nombre_champs_modifier = compteur_nombre_champs_modifier+1
})

//fonction est appele lorsqu'on click sur plus pour ajouter de nouveau champ
//k ici permet de faire la distinction entre ajouter champs de saisir etant sur la page de modification ou sur la page enregistrer activite
function construction_de_formulaire(i,k) {
  let ajouter_champ = `
  <textarea class="champ_saisi champ_saisi_nom${i} champ_modifier_nom${i}" name="nom" id="" cols="30" rows="10" placeholder="SAISISSEZ LE NOM DE L'ACTIVITE ICI"></textarea>
  <input type="time" class="champ_saisi_heure champ_saisi_heure${i} champ_modifier_heure${i}" name="nom_1" id="" placeholder="heure">
  <button class="moins${i} supprimer_champ moins" cacher="${i}">-</button>
  `
  const ajout = document.querySelector(".formulaire_saire"+k)
  ajout.insertAdjacentHTML("beforeend", ajouter_champ)
  supprimer_champ(i)
}



//clik pour enregistre une actvité
document.querySelector(".enregistrer").addEventListener("click", function (event){
  let tableau = []
  let indice = 0
  //validation pour les champs
  let validation = true;
  for (let k = 0; k <= compteur_nombre_champs; k++) {
    //tester si nom de classe existe
    if (document.querySelector(".champ_saisi_nom"+k)) {
      //Recuperer valeurs
      const nom = document.querySelector(".champ_saisi_nom"+k)
      const heure = document.querySelector(".champ_saisi_heure"+k)
      //valeurs recuperer
      let nom_activite = nom.value
      let heure_activite = heure.value
      //tester si le champ est non vider
      if (heure_activite && nom_activite) {
          //tableau pour stocker nom_activite,theme_activite,heure_activite pour une date et une journee
          tableau[indice] = [nom_activite,heure_activite] 
          indice = indice + 1
      }
      else{
          //alerte lorsque le champ heure est vide
          document.querySelector(".champ_vide").style.display = "block"
          document.querySelector(".recommence").addEventListener("click", function (event){ 
          document.querySelector(".champ_vide").style.display = "none"})
          validation = false
      }
      
    }

  }
  const date = document.querySelector(".champ_saisi_date")
  //converture date
  const [annee, mois, jour] = date.value.split('-');
  const date_activite =`${jour}-${mois}-${annee}`;
  const jour_activite = document.querySelector(".champ_jour")
  const image = document.querySelector(".file")
  //tester il ya pas de champs vide
  if (validation) {
    if (image.files[0] && jour_activite.value ) {
      // appel fonction pour enregistrer une activite
     Enregistrer_activite(tableau, jour_activite.value,date_activite, image.files[0])  
     console.log("oui");
   }
   else{
     //alerte lorsqu'on n'a pas ajouter ajouter image pour une activité
     document.querySelector(".champ_vide").style.display = "block"
     document.querySelector(".recommence").addEventListener("click", function (event){ 
     document.querySelector(".champ_vide").style.display = "none"
     
     })
   }
  }
  else{
    document.querySelector(".champ_vide").style.display = "block"
    document.querySelector(".recommence").addEventListener("click", function (event){ 
    document.querySelector(".champ_vide").style.display = "none"
    validation = true
    })
  }
})
//fonction pour ajouter une activité
function Enregistrer_activite(tableau, jour_activite,date_activite, image) {
  
    let Formdata = new FormData()
    Formdata.append("jour_activite",jour_activite)
    Formdata.append("date_activite",date_activite)
    Formdata.append("tableau_activite",JSON.stringify(tableau))
    Formdata.append("image",image)
    console.log(tableau);
    console.log(jour_activite);
  fetch("http://localhost:3000/api/auth/activites_jeunes", {
      method: 'POST',
      headers: {  "Authorization":"Bearer"},
      body: Formdata
    }).then((res) => res.json()) 
    .then((data) =>{
    document.location.href = `activites_jeunes.html`;
      // document.querySelector(".fermer_ajouter").style.display ="block"
  })
  
}

//fonction pour construire affichage des activites
function construction_affiche_activite(jour,image,tab,date,id_activite,idheure,idnom) {
  const construire = `<div class="affiche_programme_semaine fermer_affecher">
  <p class="titre">ACTIVITES DES JEUNES DU ${jour} LE ${date} </p>
  <div class="disposition_afficher">
      <div class="affiche_programmess_jour_image">
         <div class="jour_image">
          <span class="jour_date_heure">HEURES</span>
          <span class="nom_theme">NOMS DES ACTIVITE</span>
          <span class="jour_date_heure">IMAGES</span>
          <span class="jour_date_heure modifier_entete">MODIFIER</span>
          <span class="jour_date_heure supprimer_entete">SUPPRIMER</span>
         </div>
         <div class="tableau">
              <div class="crocher_heure ${idheure}">
                
              </div>
              <div class="tableau_nom_them jour_image crocher_nom_activite ${idnom}">
                
              </div>
              <div class="jour_date_image crocher_image"><img src="${image}" alt=""></div>
              <div class="jour_date_image modifier crocher_modifier" > <span class="jour_date_heure" data-value="${id_activite}"> MODIFIER </span></div>
              <div class="jour_date_image supprimer crocher_supprimer"> <span class="jour_date_heure" data-value="${id_activite}"> SUPPRIMER </span></div>
            </div>
              
         </div>
      </div>
  </div>
</div>`
    const ajouter = document.querySelector(".teste")
    ajouter.insertAdjacentHTML("beforeend",construire )
    // appel de fonction construire_nom_theme_heure pour afficher une activite
    construire_nom_theme_heure(tab,idheure,idnom)
  
}


function construire_nom_theme_heure(tableau_activite,idheure,idnom) {
  for (let j = 0; j <= tableau_activite.length - 1; j++) {
    //construction de activite a savoir  heure nom actvite theme de actvite
    if (tableau_activite[j]) {
      if (tableau_activite[j][1]&&tableau_activite[j][0]) {
        const heure = ` <span class="jour_date_heure">${tableau_activite[j][1]}</span>`
      const crocher_heure = document.querySelector("."+idheure)
      crocher_heure.insertAdjacentHTML("beforeend", heure)
  
      const crocher_nom_activite = `<span class="nom_theme">${tableau_activite[j][0]}</span>`
      const nom_activite = document.querySelector("."+idnom)
      nom_activite.insertAdjacentHTML("beforeend", crocher_nom_activite)
  
   
      }
    }

}
  
}

   

// //appel de la fonction afficher_programme_semaine pour afficher le programme de la semaine
Afficher_activites_hommes()

//Afficher programme de la semaine
function Afficher_activites_hommes(){
  //pour donner le noms des classes differents pour les affichage
   let idheure = 0
   let idnom = 0

    let tableau_jour = ["LUNDI","MARDI","MERCREDI","JEUDI","VENDREDI","SAMEDI","DIMANCHE"]
    fetch("http://localhost:3000/api/auth/Afficher_activites_jeunes")
    .then((res) => res.json())
    .then((data) => {
    console.log("Afficher_programme_semaine");
    console.log(data);
    for (let k = 0; k <= tableau_jour.length - 1; k++) {
        for (let i of data) {
          //condition pour generer les activité par ordre du jour (du genre lundi a dimanche)
            if (tableau_jour[k] == i.jour_activite) {
              
              idheure = "idheure"+idheure + 1
              idnom = "idnom"+idnom + 1
              //appel
              construction_affiche_activite(i.jour_activite,i.file,i.tableau_activite,i.date_activite,i._id, idheure,idnom)
                
            }
           
        }

    }

    suppression_activites_jeunes() 
    modifier_activites_jeunes()
    supprimer_champ()
});

}

//supprimer le programme de la semaine
function suppression_activites_jeunes() {
    const supprimer = document.querySelectorAll(".supprimer")
    supprimer.forEach((el)=>{
    console.log("element");
    el.addEventListener("click", function (event){
        let id = event.target.getAttribute("data-value")
        document.querySelector(".confiermer_supprimer").style.display = "block"
        //clique sur oui pour valider la suppression de programme de lasemaine
       document.querySelector(".oui").addEventListener("click", function (event){ 
            fetch(`http://localhost:3000/api/auth/suppression_activites_jeunes/${id}`, {
                method: "DELETE",
                headers: {  "Authorization":"Bearer"}
                 })
                  .then((res) => res.json())
                  .then(data => {
                  //  document.querySelector(".information_sur_validation").innerHTML = "confirmeee"
                         console.log("oui supprimer avec succee")
                         console.log(data)
                         //redirection
                         document.location.href = `activites_jeunes.html`;
                    })
       })
       
    })
  })
  //annuller la suppression de programme de lasemaine
  document.querySelector(".non").addEventListener("click", function (event){ 
    document.querySelector(".confiermer_supprimer").style.display = "none"

 })
    
}

//modifier le programme de la semaine
function modifier_activites_jeunes() {
  //id pour le valeur de modification
    let id
    const modifier = document.querySelectorAll(".modifier")
    modifier.forEach((el)=>{
    el.addEventListener("click", function (event){
        event.preventDefault()
        id = event.target.getAttribute("data-value")
        //confirmer la modification de programme de la semaine
       document.querySelector(".confiermer_modifier").style.display = "block"
        //pour chercher activié a pour modifier
       document.querySelector(".oui_modifier").addEventListener("click", function (event){
          document.querySelector(".modifier_activite").style.display = "block"
           document.querySelector(".confiermer_modifier").style.display = "none"
            fetch(`http://localhost:3000/api/auth/Recherche_pour_supprimer_activites_jeunes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                 compteur_nombre_champs_modifier = data.tableau_activite.length
                 if (data.tableau_activite.length>=2) {
                  //generer le formulaire
                  for (let i = 1; i < data.tableau_activite.length; i++) {
                    if (data.tableau_activite[i]) {
                      construction_de_formulaire(i,2)
                    }
                  }
                  for (let k = 0;k < data.tableau_activite.length; k++) {
                    //ajouter des valeurs dans les champs pour modifier
                    if (data.tableau_activite[k]) {
                      const nom = document.querySelector(".champ_modifier_nom"+k)
                      const heure = document.querySelector(".champ_modifier_heure"+k) 
                      nom.value = data.tableau_activite[k][0]
                      heure.value = data.tableau_activite[k][1]
                      
                    }

                  }
                  const date = document.querySelector(".champ_modifier_date")
                  //conversion de date
                  const [jour, mois, annee] = data.date_activite.split('-');
                  const date_activite =`${annee}-${mois}-${jour}`;
                  date.value = date_activite
                  const jour_activite = document.querySelector(".champ_modifier")
                  jour_activite.value = data.jour_activite
                  
                  
                 }
                 else{
                  const nom = document.querySelector(".champ_modifier_nom0")
                  const heure = document.querySelector(".champ_modifier_heure0") 
                  const date = document.querySelector(".champ_modifier_date")
                  const jour_activite = document.querySelector(".champ_modifier")

                  //conversion de date
                  const [jour, mois, annee] = data.date_activite.split('-');
                  const date_activite =`${annee}-${mois}-${jour}`;
                  date.value = date_activite
                  nom.value = data.tableau_activite[0][0]
                  heure.value = data.tableau_activite[0][1]
                  jour_activite.value = data.jour_activite
                 }
           }); 

       })

    })
  })
  //annuller la modification de programme de la semaine
  document.querySelector(".non_modifier").addEventListener("click", function (event){ 
    document.querySelector(".confiermer_modifier").style.display = "none"

  })
  //fermer le formulaire de modification
  // document.querySelector(".annuller_modification").addEventListener("click", function (event){ 
  //   document.querySelector(".modifier_activite").style.display = "none"

  // })
//valider modification
 document.querySelector(".valider_modification").addEventListener("click", function (event){
    event.preventDefault()
    let indice_nouveau_tableau_mise_jour = 0
    let tableau_modifier = []
    let validation_modification = true
    for (let k = 0;k < compteur_nombre_champs_modifier; k++) {
      //tester  les champ est vide on ne peut pas mettre le champ å vide
      if (document.querySelector(".champ_modifier_nom"+k)) {
         //recuperer le valeurs
        const nom = document.querySelector(".champ_modifier_nom"+k).value;
        const heure = document.querySelector(".champ_modifier_heure"+k).value;
        if (nom && heure) {
          //tableau pour stocker nom_activite,theme_activite,heure_activite pour une date et une journee
          tableau_modifier[indice_nouveau_tableau_mise_jour] = [nom,heure] 
          indice_nouveau_tableau_mise_jour = indice_nouveau_tableau_mise_jour+1
        }
        else{
          validation_modification = false
        }
      }
    }
    const date = document.querySelector(".champ_modifier_date")
    const jour_activite = document.querySelector(".champ_modifier")
   
    const [annee, mois, jour] = date.value.split('-');
    const date_activite =`${jour}-${mois}-${annee}`;
    
    const image = document.querySelector(".fil")
    let Formdata = new FormData()
    Formdata.append("jour_activite",jour_activite.value)
    Formdata.append("date_activite",date_activite)
    Formdata.append("tableau_activite",JSON.stringify(tableau_modifier))
    Formdata.append("image",image.files[0])
    //si les champs de modifications des activites sont bien remplire
    if (validation_modification) {
      fetch(`http://localhost:3000/api/auth/modifier_activites_jeunes/${id}`, { 
        method: 'put',
        headers: {
          "Authorization": "Bearer",
        },
        body: Formdata
      }).then((res) => res.json())
        .then((data) => {
          console.log("modifier avec succee");
          // hipoppe_modifier.style.display = "none";
           document.location.href = `activites_jeunes.html`;
        })
    }
    else{
      document.querySelector(".champ_vide").style.display = "block"
      document.querySelector(".recommence").addEventListener("click", function (event){ 
      document.querySelector(".champ_vide").style.display = "none"
      })
    }
  })
}


//fonction pour sur supprimer les champs
function supprimer_champ(i) {
    const cacher_champ  = document.querySelectorAll(".supprimer_champ")
    cacher_champ.forEach((el)=>{
      el.addEventListener("click", function (event){
        event.preventDefault()
        let id = event.target.getAttribute("cacher")
        //mettre de vide dans le cacher 
        document.querySelector(".moins"+id).remove()
        document.querySelector(".champ_saisi_heure"+id).remove()
        document.querySelector(".champ_saisi_nom"+id).remove()
      
      })
    })

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