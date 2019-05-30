document.addEventListener('DOMContentLoaded', () => 
{
    const dogsURL = `http://localhost:3000/dogs`
    const dogForm = document.getElementById('dog-form')
    let dogTable = document.getElementById("table-body")
    let dogs = []
    let dogId;
    




function fetchDogs()
{
    fetch(dogsURL)
    .then(res => res.json())
    .then(data => 
        {
            dogs = data
            dogs.forEach(dogs => renderDogs(dogs))
        })
}

function renderDogs(dogs)
{
    
    let tr = document.createElement('tr')
     tr.id = dogs.id
    let td1 = document.createElement('td')
     td1.innerText = dogs.name
    let td2 = document.createElement('td')
     td2.innerText = dogs.breed
    let td3 = document.createElement('td')
     td3.innerText = dogs.sex
    let btn = document.createElement('button')
     btn.innerText = "Edit Dog"
    //  btn.setAttribute("data-id", dogs.id)
     btn.addEventListener('click', (e) => 
     {
        e.preventDefault()
        dogId = dogs.id
        // dogTr = e.target.parentElement
        console.log(e.target)
        dogForm[0].value = dogs.name
        dogForm[1].value = dogs.breed
        dogForm[2].value = dogs.sex
        dogForm.addEventListener('submit', (e) => {
            e.preventDefault()
            updateDog(dogs.id)
        })

     })
    
    tr.append(td1, td2, td3, btn)
    dogTable.append(tr)
}

//find a dog by ID
// function findDog(id) 
// {
//     return dogs.find( dog => dog.id === id );
// }

function updateDog(dogId){
    
    // let dogTable = document.getElementById("table-body")
    fetch(`http://localhost:3000/dogs/${dogId}`, 
    {
        method: 'PATCH',
        headers: 
            {
                "Content-Type": "application/json"
            },
        body: JSON.stringify(
            {
                "name": dogForm[0].value,
                "breed": dogForm[1].value,
                "sex": dogForm[2].value
            })
    })
        .then(() => 
        {
            dogTable.innerHTML = ''
            fetchDogs()
        })
        // .then(obj => 
        //     {
        //         console.log(obj)
        //         let dog = findDog(dogId)
        //         dog.name = e.target[0].value,
        //         dog.breed = e.target[1].value,
        //         dog.sex = e.target[2].value,
        //         dogTr.children[0].innerText = obj.name,
        //         dogTr.children[1].innerText = obj.breed,
        //         dogTr.children[2].innerText = obj.sex,
        //         dogForm.reset()
                
        //     })
    
}


fetchDogs()
})