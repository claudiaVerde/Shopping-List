
let list = [];

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today = new Date().toLocaleDateString("en-UK", options);

let date = document.querySelector(".date");
date.innerHTML = today;

let parentUl = document.querySelector("#item-list");

let addButton = document.querySelector("#add-new");
addButton.addEventListener("click", storeInput);

let clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", clear);

class Item {
    constructor(options = {}) {
        this.quantity = options.quantity;
        this.unit = options.unit;
        this.itemName = options.itemName; 
        this.done = options.done;
    }
} 

function getInfoFromLocal() {
    let local = localStorage.getItem("items");
 
    if(local) {
        let itemsToJSON = JSON.parse(local);
       
        for( let i = 0; i < itemsToJSON.length; i++){
            let objFromLocal = itemsToJSON[i];

            const obj = new Item ({
                quantity: objFromLocal.quantity,
                unit: objFromLocal.unit,
                itemName: objFromLocal.itemName, 
                done: objFromLocal.done
            });
            
            addItemToHtml(obj);
            list.push(obj);
        }
    }
};

getInfoFromLocal();

function storeInput() {

    let inputItemName = document.getElementById("item");
    let inputItemNameValue = inputItemName.value;

    let inputUnit = document.getElementById("unit");
    let inputUnitValue = inputUnit.value;

    let inputQuantity = document.getElementById("quantity");
    let inputQuantityValue = inputQuantity.value;

    if(inputItemNameValue.length && inputQuantityValue.length && !isNaN(inputQuantityValue)) {
        const item = new Item ({
            quantity: inputQuantityValue,
            unit: inputUnitValue, 
            itemName: inputItemNameValue,
            done: false
        });
    
        addItemToHtml(item);

        list.push(item);
        console.log(list)

        localStorage.setItem("items", JSON.stringify(list));

        inputItemName.value = "";
        inputQuantity.value = "";

    } else if (isNaN(inputQuantityValue)){
        alert("Item quantity must be a number");

    } else {
        inputItemName.style.border = "1px red solid";
        inputQuantity.style.border = "1px red solid";
    }
}

function addItemToHtml(item) {
    let listedItem = document.createElement("li");
    
    if (item.done){
        listedItem.classList.add("checked");
    }

    listedItem.innerHTML = `<span> ${item.quantity} </span><span> ${item.unit} </span>
                            <span> ${item.itemName} </span>
                            <button class="btn"><i class="fas fa-trash"></button>`;
    
    listedItem.addEventListener("click", () => {
        listedItem.classList.toggle("checked")
        
        if (listedItem.classList.contains("checked")){
            item.done = true;
            localStorage.setItem("items", JSON.stringify(list));

        }else if(!listedItem.classList.contains("checked")){
            item.done = false;
            localStorage.setItem("items", JSON.stringify(list))
        }
    })
        
    var deleteBtn = listedItem.querySelector(".btn");
    deleteBtn.addEventListener("click", deleteItem);
    
    parentUl.appendChild(listedItem);
}

function deleteItem() {
    list.pop();
    this.parentElement.remove();
    localStorage.setItem("items", JSON.stringify(list));
}

function clear() {
    parentUl.innerHTML = "";
    list = [];
    localStorage.clear();
}

