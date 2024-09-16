const token = localStorage.getItem("code")
if (!token) {
  document.location.href = `connecter.html`;
}

document.querySelector(".ajouter").addEventListener("click", function (event) {
    event.preventDefault()
    console.log("cliquer ajouter");
    const nom = document.querySelector(".nom")
    if (nom.value) {
        liste_communautes(nom)
    }
    else {
        document.querySelector(".champ_vid").textContent = " vous avez oublié certains champs qui ne sont pas encore rempli"
        document.querySelector(".champ_vide").textContent = "remplissez tous les champs s'il vous plait"

    }

})
//enregistrer responsables
function liste_communautes(nom) {
    let Formdata = new FormData()
    Formdata.append("nom", nom.value)
    fetch("http://localhost:3000/api/auth/ajouter_communaute", {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}` },
        body: Formdata
    }).then((res) => res.json())
        .then(data => {
            console.log("ajour ajouter_communaute");
            console.log(data);
            document.location.href = `liste_communaute.html`;

        })

}



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

             construction_affiche_liste_communautes(i.nom_communaute, i._id)
                
            }
            Modifier_liste_communautes()
            supprimer_liste_communautes()
            new DataTable('#example', {
                responsive: true
            });
        });

}




function construction_affiche_liste_communautes(nom,id_activite) {
    const creer = `
    <tr>
    <td>${nom}</td>
    <td>
        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-value="${id_activite}"><i class="fa-solid fa-trash" data-value="${id_activite}"></i></a>
        <a href="#editEmployeeModal" class="edit" data-toggle="modal" data-value="${id_activite}"> <i class="fa-solid fa-pen-to-square" data-value="${id_activite}"></i></a> 
    </td>
</tr>
`
    const creaction_affichage_activite = document.querySelector(".crocher_affichage_admin")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}

function supprimer_liste_communautes() {
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

                fetch(`http://localhost:3000/api/auth/suppression_communaute/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then((res) => res.json())
                    .then(data => {
                        console.log("oui supprimer avec succee")
                        console.log(data)
                        //redirection
                        document.location.href = `liste_communaute.html`;
                    })
            })

        })
    })

}


function Modifier_liste_communautes() {
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
            fetch(`http://localhost:3000/api/auth/Recherche_pour_modifier_communaute/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("trouver communaute");
                    console.log(data);
                    const nom = document.querySelector(".nom_edit")
                    nom.value = data.nom_communaute

                });
        })
    })
    //valider la modifier de projet
    document.querySelector(".valider_modifier").addEventListener("click", function (event) {
        event.preventDefault()
        const nom = document.querySelector(".nom_edit")
        // console.log("cliquer ouiiii")
        console.log("clocker sur modifier");
        let Formdata = new FormData()
        Formdata.append("nom", nom.value)

        fetch(`http://localhost:3000/api/auth/modifier_communaute/${id}`, {
            method: 'put',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: Formdata
        }).then((res) => res.json())
            .then((data) => {
                console.log("modifier avec succee");
               document.location.href = `liste_communaute.html`;
            })
    })
}


//les responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})