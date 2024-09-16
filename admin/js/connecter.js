document.querySelector(".connecter").addEventListener("click", function (event){
    event.preventDefault()
    console.log("cliquer connecter");
    const user = document.querySelector(".user")
    const mdp = document.querySelector(".mdp")
    console.log(user.value);
    console.log(mdp.value);

    const data = {
        nom_user:user.value,
        mdp_user:mdp.value
      }
     fetch("http://localhost:3000/api/auth/connexion", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then((res) => res.json())
      .then((data) => {
        console.log("connecter");
        console.log(data);
        if (data.message == "utilisateur inconnu") {
          console.log("inconnu");
          
           document.querySelector(".erreur_user").textContent = "utilisateur inconnu"
          
        }
        else if (data.message == "mot de passe incorrect") {
          console.log(" mdp inconnu");
           document.querySelector(".erreur_mdp").textContent = "mot de passe incorrect"
        }
        else{
          localStorage.setItem("code", data.token)
          document.location.href = `confirmation.html?id_user_connecter=${data.userId}`;
        }
       
      })
    })

// then((res) => {
//     if(res.ok){
//       return res.json() 
//     }
//   })


//creation de compte
document.querySelector(".creer").addEventListener("click", function (event) {
  event.preventDefault()
  console.log("cliquer connecter nouve");
  const user = document.querySelector(".user_creer")
  const mdp = document.querySelector(".mdp_creer")
  const fichier = document.querySelector(".file_creer")
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
      headers: { "Authorization": "Bearer" },
      body: Formdata
  }).then((res) => res.json())
      .then(data => {
          console.log("ajour usr");
          console.log(data);
          document.location.href = `connecter.html`;

      })
  
}
