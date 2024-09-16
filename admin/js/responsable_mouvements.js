const token = localStorage.getItem("code")
if (!token) {
  document.location.href = `connecter.html`;
}


// Récupérer les paramètres
const url = new URL(window.location.href);
const mouvement = url.searchParams.get('mouvement');
//ajouter dynamiquement sur le nom de mouvement sur la liste deroulante
const creer =  `
<option value="${mouvement.toUpperCase()}">${mouvement.toUpperCase()}</option>
`
const crocher_communaute = document.querySelector(".crocher_communaute")
crocher_communaute.insertAdjacentHTML("beforeend", creer)


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

             const modifier =  `
               <option value="${i.nom_communaute.toUpperCase()}">${i.nom_communaute.toUpperCase()}</option>
          `
            const crocher_communaute = document.querySelector(".crocher_communaute_modifier")
            crocher_communaute.insertAdjacentHTML("beforeend", modifier)
                
            }
        });

}

//cliquer pour ajouter
document.querySelector(".ajouter").addEventListener("click", function (event) {
    event.preventDefault()
    console.log("cliquer ajouter");
    const nom = document.querySelector(".nom")
    const prenom = document.querySelector(".prenom")
    const quartier = document.querySelector(".quartier")
    const contact = document.querySelector(".contact")
    const fonction = document.querySelector(".fonction")
    const communaute = document.querySelector(".communaute")
    const fichier = document.querySelector(".file")
    if (nom.value && prenom.value && fichier.files[0] && quartier.value && contact.value && fonction.value && communaute.value) {
        responsables_communaute(nom, prenom, fichier, contact, quartier, fonction, communaute)
    }
    else {
        document.querySelector(".champ_vid").textContent = " vous avez oublié certains champs qui ne sont pas encore rempli"
        document.querySelector(".champ_vide").textContent = "remplissez tous les champs s'il vous plait"

    }

})
//enregistrer responsables
function responsables_communaute(nom, prenom, fichier, contact, quartier, fonction, communaute) {
    let Formdata = new FormData()
    Formdata.append("nom", nom.value)
    Formdata.append("prenom", prenom.value)
    Formdata.append("contact", contact.value)
    Formdata.append("fonction", fonction.value)
    Formdata.append("quartier", quartier.value)
    Formdata.append("communaute", communaute.value)
    Formdata.append("image", fichier.files[0])

    fetch("http://localhost:3000/api/auth/ajouter_responsable_communaute", {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}`},
        body: Formdata
    }).then((res) => res.json())
        .then(data => {
            console.log("ajour responsables_eglise");
            console.log(data);
            document.location.href = `responsables_mouvement.html?mouvement=${mouvement}`;

        })

}




// //appel de la fonction afficher les responsables
Afficher_responsable_communaute()
//afficher activite
function Afficher_responsable_communaute() {
    fetch("http://localhost:3000/api/auth/Afficher_responsable_communaute")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_responsable_eglise");
            console.log(data);
            for (let i of data) {
                if (i.communaute.toUpperCase() == mouvement) {
                    construction_affiche_responsable(i.nom, i.prenom, i.file, i.fonction, i.contact, i.quartier, i._id, i.communaute)

                }

            }
            Modifier_responsable();
            supprimer_responsable_communaute();
            new DataTable('#example', {
                responsive: true
            });
            
        });

}



function construction_affiche_responsable(nom, prenom, imag, fonction, contact, quartier, id_activite, communaute) {
    const creer = `
    <tr>
    <td>
        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-value="${id_activite}"><i class="fa-solid fa-trash" data-value="${id_activite}"></i></a>
        <a href="#editEmployeeModal" class="edit" data-toggle="modal" data-value="${id_activite}"> <i class="fa-solid fa-pen-to-square" data-value="${id_activite}"></i></a> 
    </td>
    <td style="width:9%">${nom}</td>
    <td style="width:9%">${prenom}</td>
    <td style="width:9%">${fonction}</td>
     <td style="width:9%">${communaute}</td>
    <td style="width:9%">${contact}</td>
    <td style="width:9%">${quartier}</td>
    <td style="width:9%"> <img class="admin" src="${imag}" alt="" srcset=""> </td>
    
</tr>
`
    const creaction_affichage_activite = document.querySelector(".crocher_affichage_admin")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}

function supprimer_responsable_communaute() {
    const supprimer = document.querySelectorAll(".delete")
    supprimer.forEach((el) => {
        console.log("element supp");
        el.addEventListener("click", function (event) {
            event.preventDefault()
            let id = event.target.getAttribute("data-value")
            console.log("teste id");
            console.log(id);
            //clique sur oui pour valider la suppression de admin
            document.querySelector(".supprimer_admin").addEventListener("click", function (event) {
                console.log("oui cliquer sur suppppp");
                event.preventDefault()
                fetch(`http://localhost:3000/api/auth/suppression_responsable_communaute/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then((res) => res.json())
                    .then(data => {
                        console.log("oui supprimer avec succee")
                        console.log(data)
                        //redirection
                        document.location.href = `responsables_mouvement.html?mouvement=${mouvement}`;
                    })
            })

        })
    })

}


function Modifier_responsable() {
    let id
    const modifier = document.querySelectorAll(".edit")

    console.log("elt a modifier");
    console.log(modifier);
    modifier.forEach((el) => {
        console.log("elements--");
        el.addEventListener("click", function (event) {
            console.log("***element id**");
            event.preventDefault();

            console.log("***element id**");
            id = event.target.getAttribute("data-value")
            console.log(id);
            fetch(`http://localhost:3000/api/auth/Recherche_pour_modifier_responsable_communaute/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("trouver user");
                    console.log(data);
                    const nom = document.querySelector(".nom_edit")
                    nom.value = data.nom
                    const prenom = document.querySelector(".prenom_edit")
                    prenom.value = data.prenom
                    const fonction = document.querySelector(".fonction_edit")
                    fonction.value = data.fonction
                    const contact = document.querySelector(".contact_edit")
                    contact.value = data.contact
                    const quartier = document.querySelector(".quartier_edit")
                    quartier.value = data.quartier
                    const communaute = document.querySelector(".communaute_edit")
                    communaute.value = data.communaute
                });
        })
    })
    //valider la modifier de projet
    document.querySelector(".valider_modifier").addEventListener("click", function (event) {
        event.preventDefault()
        const nom = document.querySelector(".nom_edit")
        const prenom = document.querySelector(".prenom_edit")
        const fonction = document.querySelector(".fonction_edit")
        const contact = document.querySelector(".contact_edit")
        const quartier = document.querySelector(".quartier_edit")
        const communaute = document.querySelector(".communaute_edit")
        const fichier = document.querySelector(".file_edit");
        // console.log("cliquer ouiiii")
        console.log("clocker sur modifier");
        let Formdata = new FormData()
        Formdata.append("nom", nom.value)
        Formdata.append("prenom", prenom.value)
        Formdata.append("contact", contact.value)
        Formdata.append("fonction", fonction.value)
        Formdata.append("quartier", quartier.value)
        Formdata.append("communaute", communaute.value)
        Formdata.append("image", fichier.files[0])

        fetch(`http://localhost:3000/api/auth/modifier_responsable_communaute/${id}`, {
            method: 'put',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: Formdata
        }).then((res) => res.json())
            .then((data) => {
                console.log("modifier avec succee");
                document.location.href = `responsables_mouvement.html?mouvement=${mouvement}`;
            })
    })
}

//les responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})