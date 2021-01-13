

class Wine {

  static all = []

  constructor(id, name, vintage, varietals) {
    this.id = id;
    this.name = name;
    this.vintage = vintage;
    this.varietals = varietals;
  }

  display() {
    
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    div2.setAttribute('wine-id', `${this.id}`)
    let h4 = document.createElement('h4');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    const i = document.createElement('i');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete Wine";
    deleteButton.id = this.id;
    deleteButton.setAttribute('class', 'btn');
    deleteButton.addEventListener('click', Wine.deleteWine);
    
    const editButton = document.createElement('button');
    editButton.innerText = "Edit Wine";
    editButton.id = this.id;
    editButton.setAttribute('class', 'btn');
    editButton.addEventListener('click', Wine.editWine);

    h4.innerText = this.name;
    p1.innerText = `vintage: ${this.vintage}`;
    p1.setAttribute('id', 'vintage');
    this.varietals.forEach(varietal => {
      p2.innerHTML += `varietal: ${varietal.name}`;
    });
    p2.setAttribute('id', 'varietal');
  
    i.setAttribute('class', 'material-icons');
    i.setAttribute('id', 'unliked');
    i.innerText = "mood";
    i.addEventListener('click', event => {
      if (event.target.id === 'unliked')
        i.setAttribute('id', 'liked')  
      else
        i.setAttribute('id', 'unliked') 
    });
  
    div2.setAttribute('class', 'col s4');
    div2.setAttribute('id', 'card');
    div2.appendChild(h4);
    div2.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(i);
    div2.appendChild(deleteButton);
    div2.appendChild(editButton);
    
  
    div1.setAttribute('class', 'row');
    div1.appendChild(div2);
  
    wineList().appendChild(div1);
    
  }
  
  static updateWine(e){
    e.preventDefault();
    const strongWineParams = {
      wine: {
        name: wineName().value, 
        vintage: wineVintage().value,
        varietal_ids: [varietalDropDown().value]
      }
    }

    

    fetch(baseUrl + '/wines/' + editedWineId, {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
          },
        body: JSON.stringify(strongWineParams)
    })
    .then(resp => resp.json())
    .then(function (data) {
        console.log(data);
        
        let div = document.getElementById(editedWineId).parentNode
        div.querySelector('h4').innerText = data.name;
        div.querySelector('p#vintage').innerText = `vintage: ${data.vintage}`;
        div.querySelector('p#varietal').innerHTML = ""
        data.varietals.forEach(varietal => {
          div.querySelector('p#varietal').innerHTML += `varietal: ${varietal.name}`;
        });
        resetInputs();
        editing = false;
        editedWineId = null;
        submitButton().value = "Create Wine";
      })
      form().classList.add("hidden")
      revealWineFormButton().innerText = "ADD NEW WINE"
  }

  static editWine(e) {
    editing = true;
    form().classList.remove("hidden");
    
    wineName().value = this.parentNode.querySelector('h4').innerText;
    wineVintage().value  = this.parentNode.querySelector('p#vintage').innerText.split(": ")[1];
    varietalDropDown().value = Varietal.findByName(this.parentNode.querySelector('p#varietal').innerText.split(": ")[1]).id;
    submitButton().value = "Update Wine"
    
    editedWineId = this.id;  
    
  }

  static createFromForm(e) {
    e.preventDefault();

    if (editing) {
      Wine.updateWine(e);
    }
    else {

    const strongWineParams = {
      wine: {
        name: wineName().value, 
        vintage: wineVintage().value,
        varietal_ids: [varietalDropDown().value]
      }
    }

      fetch(baseUrl + '/wines.json', {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(strongWineParams)
      })
        .then(resp => resp.json())
        .then(data => {
          let wine = Wine.create(data.id, data.name, data.vintage, data.varietals);
          wine.display();
        })
      resetInputs();
    }
    form().classList.add("hidden")
    revealWineFormButton().innerText = "ADD NEW WINE"
    
  }

  static createWines(winesData){
    winesData.forEach(data => Wine.create(data.id, data.name, data.vintage, data.varietals));
  }

  static create(id, name, vintage, varietals) {
    let wine = new Wine(id, name, vintage, varietals);

    Wine.all.push(wine);

    return wine;
  }

  
  static displayWines(){
    wineList().innerHTML = '';
    Wine.all.forEach(wine => wine.display())
  }

  static displayFilteredWines (winesData) {
    wineList().innerHTML = '';
    winesData.forEach(wine => wine.display())
  }
  
  static findById(id) {
      return this.all.find(wine => wine.id == id)
    }
    
  static deleteWine(e) {
      // 
    const deletedWineId = this.id 
    const wineDiv = this.parentNode.parentNode 
      
    fetch(baseUrl + '/wines/' + deletedWineId, {
      method: "delete"
    })
      .then(resp =>resp.json())
      .then(obj => {
        // 
        console.log(obj);
        alert('wine was deleted');
         // FOR WINE DELETE
        wineDiv.remove();
        Wine.all = Wine.all.filter(wine => wine.id !== deletedWineId);
        // Wine.displayWines();
      })

    }

  }

 
 