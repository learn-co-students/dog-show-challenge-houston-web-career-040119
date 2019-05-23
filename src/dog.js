class Dog {
  constructor(id,name,breed,sex){
    this._id = id
    this.name = name
    this.breed = breed
    this.sex = sex
  }

  get id() {
    return this._id
  }

}
