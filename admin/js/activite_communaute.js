

Afficher_liste_communautes_sur_formulaire()
function Afficher_liste_communautes_sur_formulaire() {
    fetch("http://localhost:3000/api/auth/Afficher_communaute")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_communaute");
            console.log(data);
            for (let i of data) {
               const creer =  `
					<option value="${i.nom_communaute}">${i.nom_communaute}</option>
                `
                const crocher_communaute = document.querySelector(".crocher_communaute")
                crocher_communaute.insertAdjacentHTML("beforeend", creer)
                const crocher_communaute_modifier = document.querySelector(".crocher_communaute_modifier")
                crocher_communaute_modifier.insertAdjacentHTML("beforeend", creer)
            }
        });

}



//cliquer pour ajouter
document.querySelector(".ajouter").addEventListener("click", function (event) {
    event.preventDefault()
    console.log("cliquer ajouter");
    const description = document.querySelector(".description")
    const date = document.querySelector(".date")
    const heure = document.querySelector(".heure")
    const jour = document.querySelector(".jour")
    const communaute = document.querySelector(".communaute")
    const fichier = document.querySelector(".file")
    if (description.value && communaute.value && fichier.files[0]) {
        activite_communaute(description, date,heure, fichier,jour, communaute)
    }
    else {
        document.querySelector(".champ_vid").textContent = " vous avez oublié certains champs qui ne sont pas encore rempli"
        document.querySelector(".champ_vide").textContent = "remplissez tous les champs s'il vous plait"

    }

})
//enregistrer activite_communaute
function activite_communaute(description, date,heure, fichier,jour, communaute) {
    let Formdata = new FormData()
    Formdata.append("jour", jour.value)
    Formdata.append("description", description.value)
    Formdata.append("date", date.value)
    Formdata.append("heure", heure.value)
    Formdata.append("communaute", communaute.value)
    Formdata.append("image", fichier.files[0])

    fetch("http://localhost:3000/api/auth/ajouter_activite_communaute", {
        method: 'POST',
        headers: { "Authorization": "Bearer" },
        body: Formdata
    }).then((res) => res.json())
        .then(data => {
            console.log("ajour ajouter_activite_communaute");
            console.log(data);
            document.location.href = `activite_communaute.html`;

        })

}




// //appel de la fonction afficher les responsables
Afficher_activite_communaute()
//afficher activite
function Afficher_activite_communaute() {
    fetch("http://localhost:3000/api/auth/Afficher_activite_communaute")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_activite_eglise");
            console.log(data);
            for (let i of data) {
                construction_affiche_activite_communaute(i.description, i.date, i.heure, i.file, i.jour, i.communaute,i._id)
            }
            Modifier_activite_communaute();
            supprimer_activite_communaute();
            new DataTable('#example', {
                responsive: true
            });
            
        });

}



function construction_affiche_activite_communaute(description, date, heure, imag,jour, communaute, id_activite) {
    const creer = `
    <tr>
        <td>
            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-value="${id_activite}"><i class="fa-solid fa-trash" data-value="${id_activite}"></i></a>
            <a href="#editEmployeeModal" class="edit" data-toggle="modal" data-value="${id_activite}"> <i class="fa-solid fa-pen-to-square" data-value="${id_activite}"></i></a> 
        </td>
        <td style="width:9%">${date}</td>
        <td style="width:9%">${heure}</td>
        <td style="width:9%">${jour}</td>
        <td style="width:9%">${description}</td>
        <td style="width:9%">${communaute}</td>
        <td style="width:9%"> <img class="admin" src="${imag}" alt="" srcset=""> </td>
    
   </tr>
`
    const creaction_affichage_activite_communaute = document.querySelector(".crocher_activite_communaute")
    creaction_affichage_activite_communaute.insertAdjacentHTML("beforeend", creer)
}

function supprimer_activite_communaute() {
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
                fetch(`http://localhost:3000/api/auth/suppression_activite_communaute/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": "Bearer" }
                })
                    .then((res) => res.json())
                    .then(data => {
                        console.log("oui supprimer avec succee")
                        console.log(data)
                        //redirection
                        document.location.href = `activite_communaute.html`;
                    })
            })

        })
    })

}


function Modifier_activite_communaute() {
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
            fetch(`http://localhost:3000/api/auth/Recherche_pour_modifier_activite_communaute/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("trouver user");
                    console.log(data);
                    const description = document.querySelector(".description_edit")
                    description.value = data.description
                    const date = document.querySelector(".date_edit")
                    date.value = data.date
                    const heure = document.querySelector(".heure_edit")
                    heure.value = data.heure
                    const jour = document.querySelector(".jour_edit")
                    jour.value = data.jour
                    const communaute = document.querySelector(".communaute_edit")
                    communaute.value = data.communaute
                });
        })
    })
    //valider la modifier de projet
    document.querySelector(".valider_modifier").addEventListener("click", function (event) {
        event.preventDefault()
        const description = document.querySelector(".description_edit")
        const date = document.querySelector(".date_edit")
        const heure = document.querySelector(".heure_edit")
        const jour = document.querySelector(".jour_edit")
        const communaute = document.querySelector(".communaute_edit")
        const fichier = document.querySelector(".file_edit");
        // console.log("cliquer ouiiii")
        console.log("clocker sur modifier");
        let Formdata = new FormData()
        Formdata.append("description", description.value)
        Formdata.append("date", date.value)
        Formdata.append("heure", heure.value)
        Formdata.append("jour", jour.value)
        Formdata.append("communaute", communaute.value)
        Formdata.append("image", fichier.files[0])

        fetch(`http://localhost:3000/api/auth/modifier_activite_communaute/${id}`, {
            method: 'put',
            headers: {
                "Authorization": "Bearer",
            },
            body: Formdata
        }).then((res) => res.json())
            .then((data) => {
                console.log("modifier avec succee");
                document.location.href = `activite_communaute.html`;
            })
    })
}

//les responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})