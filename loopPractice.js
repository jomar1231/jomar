

let todoList = JSON.parse(localStorage.getItem('todolist'));

if(!todoList){
    todoList = [
    {
        name:'jomar', dueDate : '12/23/2004'
    },
    { 
        name: 'vergara', dueDate: '11/12/2004'
    }
];
}
function save(){
    localStorage.setItem('todolist', JSON.stringify(todoList));
}



render();


function render (){

    let todoHtml = '';
    todoList.forEach((todObject,index)=>{
        const {name, dueDate} = todObject;
        todoHtml += ` 
        <div>${name} </div>
        <div>${dueDate}</div>
        <button onclick = "
        todoList.splice(${index},1);
        render();
        ">Delete</button>
         `;
        document.querySelector('.IsName').innerHTML = todoHtml;
    });
    save();
    
}
function input(){
    const text = document.querySelector('.name');
    const nameInput = text.value;
    const due = document.querySelector('.due-date');
    const dueInput = due.value;
    todoList.push({
        name: nameInput,
        dueDate: dueInput
    });
    text.value = '';
    render();
    save();
}

const key = "EgoyMDI2MDEyOC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D";

async function getLocation() {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=Manila&key=${key}`
  );
  const data = await res.json();
  console.log(data);
}

getLocation();