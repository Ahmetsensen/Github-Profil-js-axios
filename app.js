
const API_URL =`https://api.github.com/users/`

const form= document.getElementById("form")
const search = document.getElementById("search")
const main = document.getElementById("main")

async function getUser(username){
    try{
        const {data} = await axios(API_URL + username)
        //console.log(data)
        createUserCard(data)
        getRepos(username)
    }catch(err){
        if(err.response.status == 404){
            createErrorCard(`Es wurden keine mit deiner Suchanfrage gefunden.`)
        }
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const user = search.value
    if(user){
        getUser(user)
        search.value= ``
    }
})

function createUserCard(user){

    const userName= user.name || user.login
    const userBio= user.bio ? `<p> ${user.bio} </p>` : " "

    const cardHTML= `
    <div class="card">
    <img
    class="user-image"
    src=${user.avatar_url}
    alt=${user.username}
  />

  <div class="user-info">
    <div class="user-name">
        <h2>${userName} </h2>
        <small>${user.login} </small>
    </div>
  </div>

  <p> ${userBio} </p>
</div>
<ul>
    <li>
        <i class="fa-solid fa-user-group"> </i> ${user.followers} <strong>followers</strong>
    </li>
    <li> ${user.following} <strong>Following</strong></li>
    <li><i class="fa-solid fa-bookmark"></i> ${user.public_repos} <strong>Repository</strong></li>
</ul>

<div class="repos" id="repos"> </div>
    `

    main.innerHTML = cardHTML
}

function createErrorCard(msg){
    const cardErrorHTML= `
    <div class="card">
    <h2> ${msg} <h2>
    </div
    `

    main.innerHTML= cardErrorHTML
}

async function getRepos(username){
    try {
        const {data}= await axios(API_URL + username + "/repos")
        //console.log(data)
        addReposToCard(data)
    }catch(err){
        //console.log(err)
        createErrorCard("Upps ein Fehler")
    }
}

function addReposToCard(repos){
    const reposEl = document.getElementById("repos")

    repos.slice(0,3).forEach((repo) =>{
        const reposLink= document.createElement(`a`)
        reposLink.href= repo.html_url
        reposLink.target= "_blank"
        reposLink.innerHTML= `<i class="fa-solid fa-book-bookmark"></i> ${repo.name}`

        reposEl.appendChild(reposLink)
    })
}