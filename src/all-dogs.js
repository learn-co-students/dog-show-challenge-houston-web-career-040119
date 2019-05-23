class AllDogs {
  constructor() {
    this.all = []
  }

  addDog(id,name,breed,sex){
    let newDog = new Dog(id,name,breed,sex)
    this.all.push(newDog)
  }

}
