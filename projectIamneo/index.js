let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let todoUsertitle = document.getElementById("todoUsertitle");
let todousertext = document.getElementById("todousertext");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("mani");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todolist = getTodoListFromLocalStorage();

let count = null;

if (todolist.length === 0) {
    count = 0;
} else {
    count = todolist[todolist.length - 1].uniqueNo;
}


saveTodoButton.onclick = function() {
    localStorage.setItem("mani", JSON.stringify(todolist));
};

function deletetodo(todoId) {
    let todoEl = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoEl);

    let deleteItemIndex = todolist.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueNo;
        if (todoId === eachtodoId) {
            return true;
        } else {
            return false;
        }
    });

    todolist.splice(deleteItemIndex, 1);
}

function changeTitle(changedTitlevalue, todoId) {
    let changetitleIndex = todolist.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueNo;
        if (todoId === eachtodoId) {
            return true;
        } else {
            return false;
        }
    });

    todolist[changetitleIndex].title = changedTitlevalue;

}

function changeText(changeTextValue, todoId) {
    let changeTextIndex = todolist.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueNo;
        if (todoId === eachtodoId) {
            return true;
        } else {
            return false;
        }
    });

    todolist[changeTextIndex].text = changeTextValue;
}


function createTodoElement(todo) {
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container");
    let todoId = "todo" + todo.uniqueNo;
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let titleDeletecontainer = document.createElement("div");
    titleDeletecontainer.classList.add("d-flex", "flex-row");
    todoElement.appendChild(titleDeletecontainer);

    let titlecontainer = document.createElement("div");
    titlecontainer.classList.add("todo-title-container");
    titleDeletecontainer.appendChild(titlecontainer);
    let todotitle = document.createElement("input");
    todotitle.classList.add("todo-saved-title");
    todotitle.value = todo.title;
    todotitle.addEventListener("change", function(event) {
        let changedTitlevalue = event.target.value;
        changeTitle(changedTitlevalue, todoId);
    });
    titlecontainer.appendChild(todotitle);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    titleDeletecontainer.appendChild(deleteIconContainer);
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        deletetodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);

    let usertext = document.createElement("textarea");
    usertext.classList.add("todo-saved-title", "todo-saved-text");
    usertext.setAttribute("rows", "3");
    usertext.value = todo.text;
    usertext.addEventListener("change", function(event) {
        let changeTextValue = event.target.value;
        changeText(changeTextValue, todoId);
    });
    todoElement.appendChild(usertext);
}


for (let todo of todolist) {
    createTodoElement(todo);
}

addTodoButton.addEventListener("click", function() {
    let titleValue = todoUsertitle.value;
    let textVlaue = todousertext.value;

    if (titleValue === "" & textVlaue === "") {
        alert("Enter Vaild Input");
        return;
    }
    count = count + 1;

    let new_todo = {
        title: titleValue,
        text: textVlaue,
        uniqueNo: count
    };

    todolist.push(new_todo);

    createTodoElement(new_todo);
    todoUsertitle.value = "";
    todousertext.value = "";
})