document.querySelector(".ajouter").addEventListener("click", function (event) {
    event.preventDefault()
    console.log("cliquer ajouter");
    const description = document.querySelector(".nom")
    const fichier = document.querySelector(".file")
    if (description.value) {
        projet(description,fichier)
    }
    else {
        document.querySelector(".champ_vid").textContent = " vous avez oublié certains champs qui ne sont pas encore rempli"
        document.querySelector(".champ_vide").textContent = "remplissez tous les champs s'il vous plait"

    }

})
//enregistrer responsables
function projet(description, fichier) {
    let Formdata = new FormData()
    Formdata.append("description", description.value)
    Formdata.append("image", fichier.files[0])
    fetch("http://localhost:3000/api/auth/ajouter_projet", {
        method: 'POST',
        headers: { "Authorization": "Bearer" },
        body: Formdata
    }).then((res) => res.json())
        .then(data => {
            console.log("ajouter projet");
            console.log(data);
            document.location.href = `projets.html`;

        })

}




// //appel de la fonction afficher les responsables
Afficher_projet()
//afficher activite
function Afficher_projet() {
    fetch("http://localhost:3000/api/auth/Afficher_projet")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_communaute");
            console.log(data);
            for (let i of data) {
                construction_affiche_projet(i.description, i.file, i._id)
            }
            Modifier_projet()
            supprimer_projet()
            new DataTable('#example', {
                responsive: true
            });
        });

}



function construction_affiche_projet(description,imag, id_activite) {
    const creer = `
    <tr>
        <td>
            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-value="${id_activite}"><i class="fa-solid fa-trash" data-value="${id_activite}"></i></a>
            <a href="#editEmployeeModal" class="edit" data-toggle="modal" data-value="${id_activite}"> <i class="fa-solid fa-pen-to-square" data-value="${id_activite}"></i></a> 
        </td>
        <td>${description}</td>
        <td> <img class="admin" src="${imag}" alt="" srcset=""> </td>
   </tr>
`
    const creaction_affichage_activite = document.querySelector(".crocher_affichage_admin")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}

function supprimer_projet() {
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

                fetch(`http://localhost:3000/api/auth/suppression_projet/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": "Bearer" }
                })
                    .then((res) => res.json())
                    .then(data => {
                        console.log("oui supprimer avec succee")
                        console.log(data)
                        //redirection
                        document.location.href = `projets.html`;
                    })
            })

        })
    })

}


function Modifier_projet() {
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
            fetch(`http://localhost:3000/api/auth/Recherche_pour_modifier_projet/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("trouver communaute");
                    console.log(data);
                    const description = document.querySelector(".nom_edit")
                    description.value = data.description

                });
        })
    })
    //valider la modifier de projet
    document.querySelector(".valider_modifier").addEventListener("click", function (event) {
        event.preventDefault()
        const description = document.querySelector(".nom_edit")
        const ficher = document.querySelector(".file_edit")
        // console.log("cliquer ouiiii")
        console.log("clocker sur modifier");
        let Formdata = new FormData()
        Formdata.append("description", description.value)
        Formdata.append("image", ficher.files[0])

        fetch(`http://localhost:3000/api/auth/modifier_projet/${id}`, {
            method: 'put',
            headers: {
                "Authorization": "Bearer",
            },
            body: Formdata
        }).then((res) => res.json())
            .then((data) => {
                console.log("modifier avec succee");
               document.location.href = `projets.html`;
            })
    })
}


//les responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})