class Varietal {

    static all = []

    constructor(id, name, wine_id) {
      this.id = id;
      this.name = name;
      this.wine_id = wine_id;
    }

    static findByName(name) {
      return this.all.find(varietal => varietal.name == name)
    }

addToVarietalDropDown() {
  let varietalOption = document.createElement('option')
  varietalOption.setAttribute('value', `${this.id}`)
  varietalOption.setAttribute('id', `${this.name}`)
  varietalOption.innerText = this.name
  varietalDropDown().appendChild(varietalOption)
}

static create(id, name, wine_id) {
  let varietal = new Varietal(id, name, wine_id);

  Varietal.all.push(varietal);

  return varietal;
}

static createVarietals(varietalsData){
  varietalsData.forEach(data => Varietal.create(data.id, data.name, data.wine_id));
}

static displayVarietals(){
  Varietal.all.forEach(varietal => varietal.addToVarietalDropDown())
}

}