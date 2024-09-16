const token = localStorage.getItem("code")
if (!token) {
  document.location.href = `connecter.html`;
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
                
            }
        });

}


document.querySelector(".creer").addEventListener("click", function (event) {
    event.preventDefault()
    console.log("cliquer connecter");
    const user = document.querySelector(".user")
    const mdp = document.querySelector(".mdp")
    const fichier = document.querySelector(".file")
    if (user.value && mdp.value && fichier.files[0]) {
        enregistrement_admin(user,mdp, fichier)
    }
    else{
        document.querySelector(".champ_vid").textContent = " vous avez oublié certains qui ne sont pas encore rempli"
        document.querySelector(".champ_vide").textContent = "remplissez tous les champs s'il vous plait"
        
    }

})
function enregistrement_admin(user,mdp,fichier) {
    let Formdata = new FormData()
    Formdata.append("nom_user", user.value)
    Formdata.append("mdp_user", mdp.value)
    Formdata.append("image", fichier.files[0])

    fetch("http://localhost:3000/api/auth/ajouter_admin", {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}`  },
        body: Formdata
    }).then((res) => res.json())
        .then(data => {
            console.log("ajour usr");
            console.log(data);
            document.location.href = `creer_compte.html`;

        })
    
}




// //appel de la fonction afficher activite
afficher_admin()
//afficher activite
function afficher_admin() {
    fetch("http://localhost:3000/api/auth/afficher_admin")
        .then((res) => res.json())
        .then((data) => {
            console.log("Afficher_afficher_admin");
            console.log(data);
            for (let i of data) {
                construction_affiche_admin(i.nom_user, i.mdp_user, i.file, i._id)
            }
            new DataTable('#admin', {
                responsive: true
            });
        });
}



function construction_affiche_admin(usr, mdp, imag, id_activite) {
    const creer = `
    <tr>
        <td>
            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-value="${id_activite}"><i class="fa-solid fa-trash" data-value="${id_activite}"></i></a>
        </td>
        <td>${usr}</td>
        <td> <img class="admin" src="${imag}" alt="" srcset=""> </td>
    </tr>
 `
    const creaction_affichage_activite = document.querySelector(".crocher_affichage_admin")
    creaction_affichage_activite.insertAdjacentHTML("beforeend", creer)
    supprimer_admin()
}

function supprimer_admin() {
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
                
                fetch(`http://localhost:3000/api/auth/suppression_admin/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then((res) => res.json())
                    .then(data => {
                        console.log("oui supprimer avec succee")
                        console.log(data)
                        //redirection
                        document.location.href = `creer_compte.html`;
                    })
            })

        })
    })

}

//les responsive
const toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
toggle.addEventListener("click", function (event){
  body.classList.toggle("open")
})