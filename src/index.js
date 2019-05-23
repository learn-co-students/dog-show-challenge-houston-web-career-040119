const DOG_URL = "http://localhost:3000/dogs"
let litter = new AllDogs()

document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
})

//functions

function fetchDogs() {
  fetch(DOG_URL)
    .then((resp) => {return resp.json()})
    .then((data) => {
      data.forEach((dog) => {
        litter.all.push(dog)
        renderDog(dog)
      })
    })
}

function renderDog(dog) {
  let table = document.querySelector("#table-body")
  let tr = document.createElement('tr')
  let nameTag = document.createElement('td')
  nameTag.innerText = dog.name
  let breedTag = document.createElement('td')
  breedTag.innerText = dog.breed
  let sexTag = document.createElement('td')
  sexTag.innerText = dog.sex
  let button = document.createElement('button')
  button.innerText = "Edit"
  button.addEventListener('click',(e)=>{
    let name = e.target.parentElement.firstChild.innerText
    editDog(name)
  })
  tr.append(nameTag,breedTag,sexTag,button)
  table.append(tr)
}

function editDog(name) {
  let editForm = document.querySelector("#dog-form")
  let dog = litter.all.find((dog)=>{return dog.name == name})
  editForm.children[0].value = dog.name
  editForm.children[1].value = dog.breed
  editForm.children[2].value = dog.sex
  editForm.addEventListener("submit",(e)=>{
    e.preventDefault
    dog.name = e.target.children[0].value
    dog.breed = e.target.children[1].value
    dog.sex = e.target.children[2].value
    editDogEntry(dog)
  })
}

function editDogEntry(dog) {
  fetch(`${DOG_URL}/${dog.id}`,{
    method: 'PATCH',
    headers: {
      'content-type':'application/json'
    },
    body: JSON.stringify({
      "name":dog.name,
      "breed":dog.breed,
      "sex":dog.sex
    })
  })
}
