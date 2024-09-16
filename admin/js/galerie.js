const token = localStorage.getItem("code")
if (!token) {
  document.location.href = `connecter.html`;
}

// Récupérer les paramètres
const url = new URL(window.location.href);
const mouvement = url.searchParams.get('mouvement');
console.log("mouvement");
console.log(mouvement);
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



document.querySelector(".ajouter").addEventListener("click", function (event) {
    event.preventDefault()
    console.log("cliquer galerie");
    const fichier = document.querySelector(".file")
        galerie(fichier)
})

function galerie(fichier) {
    let Formdata = new FormData()
    Formdata.append("image", fichier.files[0])
    fetch("http://localhost:3000/api/auth/ajouter_galerie", {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}` },
        body: Formdata
    }).then((res) => res.json())
        .then(data => {
            console.log("ajouter  galerie");
            console.log(data);
            document.location.href = `galerie.html`;

        })
}




// //appel de la fonction afficher les responsables
Afficher_galerie()
//afficher activite
function Afficher_galerie() {
    fetch("http://localhost:3000/api/auth/Afficher_galerie")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_galerie");
            console.log(data);
            for (let i of data) {
                construction_affiche_projet(i.file, i._id)
            }
            Modifier_galerie()
            supprimer_galerie()
            new DataTable('#example', {
                responsive: true
            });
        });

}



function construction_affiche_projet(imag, id_activite) {
    const creer = `
    <tr>
        <td>
            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-value="${id_activite}"><i class="fa-solid fa-trash" data-value="${id_activite}"></i></a>
            <a href="#editEmployeeModal" class="edit" data-toggle="modal" data-value="${id_activite}"> <i class="fa-solid fa-pen-to-square" data-value="${id_activite}"></i></a> 
        </td>
        
        <td> <img class="admin" src="${imag}" alt="" srcset=""> </td>
   </tr>
`
    const creaction_affichage_activite = document.querySelector(".crocher_affichage_admin")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
}

function supprimer_galerie() {
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

                fetch(`http://localhost:3000/api/auth/suppression_galerie/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then((res) => res.json())
                    .then(data => {
                        console.log("oui supprimer avec succee")
                        console.log(data)
                        //redirection
                        document.location.href = `galerie.html`;
                    })
            })

        })
    })

}


function Modifier_galerie() {
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
            fetch(`http://localhost:3000/api/auth/Recherche_pour_modifier_galerie/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("trouver Afficher_galerie");
                    console.log(data);
                   // const description = document.querySelector(".nom_edit")
                   // description.value = data.description

                });
        })
    })
    //valider la modifier de galerie
    document.querySelector(".valider_modifier").addEventListener("click", function (event) {
        event.preventDefault()
        const ficher = document.querySelector(".file_edit")
        // console.log("cliquer ouiiii")
        console.log("clocker sur modifier");
        let Formdata = new FormData()
        Formdata.append("image", ficher.files[0])

        fetch(`http://localhost:3000/api/auth/modifier_galerie/${id}`, {
            method: 'put',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: Formdata
        }).then((res) => res.json())
            .then((data) => {
                console.log("modifier avec succee");
                document.location.href = `galerie.html`;
            })
    })
}


//les responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})