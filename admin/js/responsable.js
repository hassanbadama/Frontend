const token = localStorage.getItem("code")
if (!token) {
  document.location.href = `connecter.html`;
}


Afficher_liste_des_mouvements()
function Afficher_liste_des_mouvements() {
    fetch(`${process.env.url_backend}/api/auth/Afficher_communaute`)
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

document.querySelector(".ajouter").addEventListener("click", function (event) {
    event.preventDefault()
    console.log("cliquer ajouter");
    const nom = document.querySelector(".nom")
    const prenom = document.querySelector(".prenom")
    const quartier = document.querySelector(".quartier")
    const contact = document.querySelector(".contact")
    const fonction = document.querySelector(".fonction")
    const fichier = document.querySelector(".file")
    if (nom.value && prenom.value && fichier.files[0] && quartier.value && contact.value && fonction.value) {
        responsables_eglise(nom, prenom, fichier, contact, quartier, fonction)
    }
    else {
        document.querySelector(".champ_vid").textContent = " vous avez oublié certains champs qui ne sont pas encore rempli"
        document.querySelector(".champ_vide").textContent = "remplissez tous les champs s'il vous plait"

    }

})
//enregistrer responsables
function responsables_eglise(nom, prenom, fichier, contact, quartier, fonction) {
    let Formdata = new FormData()
    Formdata.append("nom", nom.value)
    Formdata.append("prenom", prenom.value)
    Formdata.append("contact", contact.value)
    Formdata.append("fonction", fonction.value)
    Formdata.append("quartier", quartier.value)
    Formdata.append("image", fichier.files[0])

    fetch(`${process.env.url_backend}/api/auth/ajouter_responsable_eglise`, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}`},
        body: Formdata
    }).then((res) => res.json())
        .then(data => {
            console.log("ajour responsables_eglise");
            console.log(data);
            document.location.href = `responsables_eglise.html`;

        })

}

// //appel de la fonction afficher les responsables
Afficher_responsable_eglise()
//afficher activite
function Afficher_responsable_eglise() {
    fetch(`${process.env.url_backend}/api/auth/Afficher_responsable_eglise`)
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_responsable_eglise");
            console.log(data);
            for (let i of data) {
                construction_affiche_admin(i.nom, i.prenom, i.file, i.fonction, i.contact, i.quartier, i._id)
            }
            Modifier_responsable()
            supprimer_responsable_eglise()
            new DataTable('#example', {
                responsive: true
            });
        });

}



function construction_affiche_admin(nom, prenom, imag, fonction, contact, quartier, id_activite) {
    const creer = `
    <tr>
     <td>
        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-value="${id_activite}"><i class="fa-solid fa-trash" data-value="${id_activite}"></i></a>
        <a href="#editEmployeeModal" class="edit" data-toggle="modal" data-value="${id_activite}"> <i class="fa-solid fa-pen-to-square" data-value="${id_activite}"></i></a> 
    </td>
    <td>${nom}</td>
    <td>${prenom}</td>
    <td>${fonction}</td>
    <td>${contact}</td>
    <td>${quartier}</td>
    <td> <img class="admin" src="${imag}" alt="" srcset=""> </td>
</tr>
`
    const creaction_affichage_activite = document.querySelector(".crocher_affichage_admin")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}

function supprimer_responsable_eglise() {
    const supprimer = document.querySelectorAll(".delete")
    supprimer.forEach((el) => {
        console.log("element");
        el.addEventListener("click", function (event) {
            let id = event.target.getAttribute("data-value")
            console.log("teste id");
            console.log(id);
            //clique sur oui pour valider la suppression de admin
            document.querySelector(".supprimer_admin").addEventListener("click", function (event) {
                console.log("oui cliquer sur suppppp");
                event.preventDefault()

                fetch(`${process.env.url_backend}/api/auth/suppression_responsable_eglise/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization":`Bearer ${token}`}
                })
                    .then((res) => res.json())
                    .then(data => {
                        console.log("oui supprimer avec succee")
                        console.log(data)
                        //redirection
                        document.location.href = `responsables_eglise.html`;
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
        console.log("element");
        el.addEventListener("click", function (event) {
            event.preventDefault()

            console.log("element");
            id = event.target.getAttribute("data-value")
            console.log(id);
            fetch(`${process.env.url_backend}/api/auth/Recherche_pour_modifier_responsable_eglise/${id}`)
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
        const fichier = document.querySelector(".file_edit");
        // console.log("cliquer ouiiii")
        console.log("clocker sur modifier");
        let Formdata = new FormData()
        Formdata.append("nom", nom.value)
        Formdata.append("prenom", prenom.value)
        Formdata.append("contact", contact.value)
        Formdata.append("fonction", fonction.value)
        Formdata.append("quartier", quartier.value)
        Formdata.append("image", fichier.files[0])

        fetch(`${process.env.url_backend}/api/auth/modifier_responsable_eglise/${id}`, {
            method: 'put',
            headers: {
                "Authorization":`Bearer ${token}`,
            },
            body: Formdata
        }).then((res) => res.json())
            .then((data) => {
                console.log("modifier avec succee");
                document.location.href = `responsables_eglise.html`;
            })
    })
}


//les responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})



