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
        localStorage.setItem("code", data.token)
        // document.location.href = `activites_hommes.html`;
      })
    })

// then((res) => {
//     if(res.ok){
//       return res.json() 
//     }
//   })