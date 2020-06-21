var input = document.querySelector("#newTodo");
var addBtn = document.querySelector("#addTodo");
var todoList = document.querySelector("#todoList");
var taskCount = document.querySelector("#taskCount");
var clearTask = document.querySelector("#clearTask");
var cardFooter = document.querySelector(".card-footer");
var doneTask = document.querySelector("#doneTask");
var undoneTask = document.querySelector("#undoneTask");

// 資料定義
var data = [];
// 新增資料
function addTodoList() {
    data.push({
        text: input.value,
        isDone: false
    });
    console.log('click', data);
    render();
}
// 刪除該資料
function removeTodoList(e) {
    var thisIndex = e.target.attributes[2].nodeValue;
    data.splice(thisIndex, 1);
    render();
}

// 刪除全部
function removeAll() {
    data.splice(0, data.length);
    render();
}

// checkbox 資料 
function checkTodoList(e) {
    var checkboxIndex = e.id.replace('check', '')
    if (e.checked) {
        data[checkboxIndex].isDone = true;

    } else {
        data[checkboxIndex].isDone = false;
    }
    checkDoneTask();
}


//新增 todolist 事件綁定
addBtn.addEventListener('click', addTodoList);
//刪除全部 事件綁定
clearTask.addEventListener('click', removeAll);

//渲染todoList
function render() {
    //清除畫面
    todoList.innerHTML = '';
    //重渲染todoList Data
    data.forEach((item, index) => {
        todoList.innerHTML = `<li class="list-item">
                    <div class="d-flex">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" onclick="checkTodoList(this)" class="custom-control-input" ${item['isDone'] ? 'checked' : ''} id="check${index}" >
                            <label class="custom-control-label" for="check${index}">${item.text}
                            </label>
                        </div>
                        <button type="button" class="close ml-auto" aria-label="Close">
                            <span aria-hidden="true" data-action="remove" data-id="${index}">×</span>
                        </button>
                    </div>
                </li>` + todoList.innerHTML;
    })


    //刪除 todolist 事件綁定
    var removeBtn = document.querySelectorAll(".close");
    removeBtn.forEach((btn) => {
        btn.addEventListener('click', removeTodoList);
    })

    //清空input
    input.value = "";
    //count 任務數量
    taskCount.innerText = data.length;

    //判斷顯示下方
    if (data.length == 0) {
        cardFooter.style.display = "none";
    } else {
        cardFooter.style.display = "flex";
    }

    //完成 未完成 清單
    checkDoneTask();
};

//渲染完成/未完成數量 
function checkDoneTask() {
    var doneTaskArray = data.filter(data => data.isDone);
    var doneNum = doneTaskArray.length;
    doneTask.innerText = doneNum;
    undoneTask.innerText = data.length - doneNum;
}