import './style.css';
import formFunctionality from'./form.js';


const form = document.querySelector(".formContainer")
const addNewProduct = document.querySelector(".addNewProduct")
const overLay = document.querySelector('#overLay')
const closeForm = document.querySelector('.closeForm');

const idInput = form.querySelector('.formID')
const nameInput = form.querySelector('.formName')
const weightInput = form.querySelector('.formWeight')
const priceInput = form.querySelector('.formPrice')
const inventoryInput = form.querySelector('.formInventory')
const modelInput = form.querySelector('.formModel')


const submit = document.querySelector(".submit");
const cardContainer = document.querySelector('.cardContainer')

const totalCards = document.querySelector(".totalProduct")



//realtime data collection
db.collection('products').orderBy('id').onSnapshot(snapshot => {

    let changes = snapshot.docChanges();
    changes.forEach(change => {

        console.log(change.doc.data())
            if(change.type == 'added'){
                displayArray(change.doc);
                let cardlist = document.querySelectorAll('.cards')
                totalCards.textContent = `Total: ${cardlist.length}`;
            } else if (change.type == 'removed'){
                let card = document.getElementById(change.doc.id);
                cardContainer.removeChild(card);
                let cardlist = document.querySelectorAll('.cards');
                totalCards.textContent = `Total: ${cardlist.length}`;

            } 
            else if (change.type == "modified"){
                let card = document.getElementById(change.doc.id);
                cardContainer.removeChild(card);
                displayArray(change.doc);
                let cardlist = document.querySelectorAll('.cards')
                totalCards.textContent = `Total: ${cardlist.length}`;
            }
    })

})



// functionality for add new product button, and closing form.
addNewProduct.addEventListener("click",()=>{
    submit.style.position = "relative"
    submit.style.transform = "scale(1)"
    openForm();
 })
 
 closeForm.addEventListener('click',()=>{
     closeFormFunction()
 });
 
 function openForm(){
     closeForm.classList.add("closeForm")
     closeForm.innerHTML="&times;"
     idInput.value=""
     nameInput.value=""
     weightInput.value=""
     priceInput.value=''
     inventoryInput.value=''
     modelInput.value=""
     submit.textContent="Add"
     form.classList.add("active")
     overLay.classList.add("active")
   
 }
 
 function closeFormFunction(){
     form.classList.remove("active")
     overLay.classList.remove("active")
 }
 


//functionality that will add new product to productList array
submit.addEventListener('click',(e)=>{
    e.preventDefault()

    //save new product to database
    let id = idInput.value;
    let name = nameInput.value;
    let weight = weightInput.value;
    let price = priceInput.value;
    let inventory = inventoryInput.value;
    let model = modelInput.value;
    db.collection('products').add({
        id:id,
        name:name,
        weight:weight,
        price:price,
        inventory:inventory,
        model:model,
    })

    form.reset()
    closeFormFunction()
     
});
  




//function to loop through the array and displays each product on the page
function displayArray(doc){
        const cardContainer = document.getElementById('cardContainer');
            const cards = document.createElement('div');
                const id = document.createElement('div');
                const name = document.createElement("div");
                const weight = document.createElement("div");
                const price = document.createElement("div");
                const inventory = document.createElement("div");
                const model = document.createElement("div");
                const cardButtons = document.createElement('div');
                const editCard = document.createElement('button');
                const removeCard = document.createElement('button');

        cards.classList.add('cards');
        cards.setAttribute('id', doc.id)
        id.classList.add('cardDetailName');
        name.classList.add('cardDetailId');
        weight.classList.add('cardDetailWeight');
        price.classList.add('cardDetailPrice');
        inventory.classList.add('cardDetailInventory');
        model.classList.add('cardDetailModel');
        cardButtons.classList.add('cardButtons')
        editCard.classList.add('editCard')
        removeCard.classList.add('removeCard')

        cardContainer.appendChild(cards)
        cards.append(id, name, weight, price, inventory, model)
        cards.appendChild(cardButtons)
        cardButtons.appendChild(editCard)
        cardButtons.appendChild(removeCard)

        id.textContent = `Product ID: ${doc.data().id}`
        name.textContent = `Product Name: ${doc.data().name}`
        weight.textContent = `Product Weight: ${doc.data().weight}g`
        price.textContent = `Product Price: ${doc.data().price}`
        inventory.textContent = `Inventory Level: ${doc.data().inventory}`
        model.textContent = `Model#: ${doc.data().model}`
        editCard.textContent = "Edit"
        removeCard.textContent="Remove"

        removeCard.addEventListener('click',()=> {
            let id = cards.getAttribute('id');
            db.collection('products').doc(id).delete();
        })


    
        editCard.addEventListener('click', (e)=>{
            e.preventDefault();
            const editButton = document.createElement('button')
            editButton.classList.add('submitEdit')
            editButton.textContent="Edit!"
            form.appendChild(editButton)

            submit.style.transform = "scale(0)"
            submit.style.position = "fixed"
            form.classList.add("active")
            overLay.classList.add("active");

            idInput.value=""
            nameInput.value=""
            weightInput.value=""
            priceInput.value=''
            inventoryInput.value=''
            modelInput.value=""

            closeForm.addEventListener('click',()=>{
                closeFormFunction()
                const editbuttons = document.querySelectorAll('.submitEdit')
                editbuttons.forEach(button => {
                form.removeChild(button)
                })
            });

            editButton.addEventListener('click', (e) => {
                e.preventDefault();
                form.removeChild(editButton)
                let id = cards.getAttribute('id');
                let editid = idInput.value;
                let editname = nameInput.value;
                let editweight = weightInput.value;
                let editprice = priceInput.value;
                let editinventory = inventoryInput.value;
                let editmodel = modelInput.value;
                
            
                db.collection('products').doc(id).update({
                    id:editid,
                    name:editname,
                    weight:editweight,
                    price:editprice,
                    inventory:editinventory,
                    model:editmodel,
                })

                const editbuttons = document.querySelectorAll('.submitEdit')
                    editbuttons.forEach(button => {
                    form.removeChild(button)
                })
                
                closeFormFunction()
                

            })
            
        })

        

}





formFunctionality();




