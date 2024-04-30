import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting ={
    databaseURL: "https://myrealdb2-project-default-rtdb.firebaseio.com/"
}

const app =initializeApp(appSetting)
const database =getDatabase(app)
const itemsInDb=ref(database,"items")

let inputEl =document.getElementById("input-el")
let addBtnEl =document.getElementById("addBtn-el")
let shopingListEl =document.getElementById("shopingList-el")
let clearEl =document.getElementById("clear-btn-el")

//fetch from db
onValue(itemsInDb, function(snapshot){
    if(snapshot.exists()){
        let itemsArray =Object.entries(snapshot.val())//snopshot.val  -->only render outs objects
        shopingListEl.innerHTML =""
        for(let i =0; i<itemsArray.length; i++){
            let currentItem =itemsArray[i]
            let currentItemId =currentItem[0]
            let currentItemValue =currentItem[1]
            renderItemsFromDb(currentItem)
        }
    }
    else{
        shopingListEl.innerHTML ="<h4>No products here</h4>"
    }
}) 

addBtnEl.addEventListener("click",function(){
    let valueFromInput =inputEl.value;
    push(itemsInDb,valueFromInput)
    //Appendhtml(valueFromInput)
    removePlaceholder() //delete what we write after finishing
}) 

function renderItemsFromDb(item){
    // shopingListEl.innerHTML +=`<li>${items}</li>` //if we use this mehtod we can't 
    let itemId =item[0]
    let itemValue =item[1]
    let newEl =document.createElement("li") //1.create new element
    newEl.innerText =itemValue    //2.put value
    shopingListEl.append(newEl) //3.append to parent element

    newEl.addEventListener("dblclick",function(){
        let exactLocationOfItemInDb =ref(database, `items/${itemId}`)
        remove(exactLocationOfItemInDb)
    })
}

clearEl.addEventListener("click", function(){
    let exactLocationOf_All_ItemInDb =ref(database,"items")
    remove(exactLocationOf_All_ItemInDb)
    shopingListEl.innerHTML ="<h4>No cart yet </h4>"
})
//should use parameter unless it doesn't work properly
// function Appendhtml(input){
//     valueFromInputEl.innerHTML +=`<li>${input}</li>`
// }

function removePlaceholder(){
    inputEl.value =""
}
