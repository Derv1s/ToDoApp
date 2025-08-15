//= Todo Eleman Ekleme

//* Eleman Seçimi
const 
    form = document.querySelector("form"),
    input = document.querySelector("#txtTaskName"),
    btnAddNewTask = document.querySelector("#btnAddNewTask"),
    btnDeleteAll = document.querySelector("#btnDeleteAll"),
    taskList = document.querySelector("#task-list");

let todos;

//* Load Items Fonksiyonu
function loadItems() {
    todos = getItemsFromLS();
    todos.forEach((item) => {
        createItem(item);
    });
}

function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

//* Local storage a veri gönderme
function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener("submit", addNewItem);

    // delete event
    taskList.addEventListener("click", deleteItem);

    // delete all event
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

//* Ekleme Fonksiyonu
function addNewItem(e) {
    if (input.value === "") {
        alert("Add new item!");
        // console.log("submit");
    } else {
        createItem(input.value);
        setItemToLS(input.value);
        input.value = "";
    }

    e.preventDefault();
}

//* Silme Fonksiyonu
function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz?")) {
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(
                e.target.parentElement.parentElement.textContent
            );
        }
    }

    e.preventDefault();
}

//* Local storage'dan eleman silme
function deleteTodoFromStorage(deletetodo) {
    let todos = getItemsFromLS();
    todos.forEach((todo, index) => {
        if (todo === deletetodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

//* Delete All Fonksiyonu
function deleteAllItems(e) {
    if (confirm("Hepsini silmek istediğinize emin misiniz?")) {
        //* yöntem - 1
        // taskList.childNodes.forEach((item)=>{
        //     if(item.nodeType === 1){
        //         item.remove();
        //     }
        // })

        //* yöntem - 2
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        //* yöntem - 3
        // taskList.innerHTML = "";
        localStorage.clear();
    }
}

//* Elaman Oluşturma
function createItem(newTodo) {
    // li oluşturma
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(newTodo));

    // a tagi oluşturmak
    const a = document.createElement("a");
    a.classList = "text-danger float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);
}
