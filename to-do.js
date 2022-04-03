
let form = document.querySelector('form');
let input= document.querySelector("#txtTaskName");
let btnDeleteAll=document.querySelector('#btnDeleteAll');
let taskList= document.querySelector('#task-list');
let hobbies;

eventListeners();
loadItems();



function loadItems(){

hobbies = gethobbiesFromLS();    
hobbies.forEach(function(item){

    createItem(item);
})


}

function gethobbiesFromLS() {

    if(localStorage.getItem('hobbies')===null){

        hobbies=[];

    }else{
        hobbies=JSON.parse(localStorage.getItem('hobbies'));
    }
    return hobbies;
}

function sethobbiesToLS(text){

    hobbies= gethobbiesFromLS();
    hobbies.push(text);
    localStorage.setItem('hobbies',JSON.stringify(hobbies));

}

function deleteFromLS(text){

    hobbies= gethobbiesFromLS();
    hobbies.forEach(function(item,index){
        if(item===text){
            hobbies.splice(index,1);
        }
    });
    localStorage.setItem('hobbies',JSON.stringify(hobbies));

}

function eventListeners() {
    form.addEventListener("submit", newItem );
    taskList.addEventListener("click",deleteItem);
    btnDeleteAll.addEventListener("click", deleteAll);
}


function createItem(text){

    const li = document.createElement('li');
    li.className="list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));
    
    const a= document.createElement('a');
    a.setAttribute('href','#');
    a.classList='float-right delete-item';
    a.innerHTML='<i class="fas fa-times"></i>';
    
    li.appendChild(a);
    taskList.appendChild(li);
}


function newItem(e){

    if(input.value ==""){
        alert('Lütfen bir değer giriniz...');
    }

    createItem(input.value);
    sethobbiesToLS(input.value);

    input.value="";


    e.preventDefault();
}

function deleteItem(e){
 
    if(e.target.className==="fas fa-times"){
        if(confirm('Silmek istediğinize emin misiniz?')){
        e.target.parentElement.parentElement.remove()

        deleteFromLS();  
         
    }
}
   e.preventDefault();
}

function deleteAll(e){

    /*while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    } */

    if(confirm('Silmek istediğinize emin misiniz?')){

        taskList.childNodes.forEach(function(item){

        if(item.nodeType===1){
            item.remove();
        }
    });
 }
    localStorage.clear();
    

    e.preventDefault();
}


