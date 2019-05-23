class Dog {
  constructor(id,name,breed,sex) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
  }

  render(tbody) {
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    tdName.innerText = this.name;
    let tdBreed = document.createElement("td");
    tdBreed.innerText = this.breed;
    let tdSex = document.createElement("td");
    tdSex.innerText = this.sex;
    let tdBtn = document.createElement("td");
    let btn = document.createElement("button");
    btn.innerText = "Edit";
    btn.setAttribute("data-id",this.id);
    tdBtn.append(btn);
    tr.append(tdName,tdBreed,tdSex,tdBtn);
    tbody.append(tr);
  }

  update(tr) {
    tr.children[0].innerText = this.name;
    tr.children[1].innerText = this.breed;
    tr.children[2].innerText = this.sex;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const dogURL = "http://localhost:3000/dogs";
  const dogsList = [];
  const dogsTbody = document.querySelector("#table-body");
  const editForm = document.querySelector("#dog-form");
  let editDogID;
  let editDogTR;

  

  fetch(dogURL)
  .then( res => res.json() )
  .then( data => {
    data.forEach( elem => {
      let dog = new Dog(elem.id,elem.name,elem.breed,elem.sex);
      dogsList.push(dog);
      dog.render(dogsTbody);
    });
  });

  function findDog(id) {
    return dogsList.find( dog => dog.id===id );
  }

  dogsTbody.addEventListener( "click", e => {
    if(e.target.tagName === "BUTTON") {
      editDogTR = e.target.parentElement.parentElement;
      editDogID = parseInt(e.target.getAttribute("data-id"));
      let dog = findDog(editDogID);
      editForm[0].value = dog.name;
      editForm[1].value = dog.breed;
      editForm[2].value = dog.sex;
    }
  });

  editForm.addEventListener("submit", e => {
    e.preventDefault();
    if( (!!editDogID) && (!!editDogTR) ) {
      fetch(`${dogURL}/${editDogID}`, {
        method: "PATCH",
        headers: {"Content-Type":"application/json",
                  "Accept":"application.json"},
        body: JSON.stringify(
          { name: editForm[0].value,
            breed: editForm[1].value,
            sex: editForm[2].value
          }
        )
      })
      .then( res => res.json() )
      .then( data => {
        let dog = findDog(editDogID);
        dog.name = editForm[0].value;
        dog.breed = editForm[1].value;
        dog.sex = editForm[2].value;
        dog.update(editDogTR);
        editForm.reset();
        editDogID = undefined;
        editDogTR = undefined;
      });
    }
  });

})