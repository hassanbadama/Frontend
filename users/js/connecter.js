document.querySelector(".connecter").addEventListener("click", function (event){
    event.preventDefault()
    console.log("cliquer connecter");
    const user = document.querySelector(".user")
    const mdp = document.querySelector(".mdp")
    console.log(user.value);
    console.log(mdp.value);
})