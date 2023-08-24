const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const container = document.querySelector(".container");

const tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

showAllTasks();

function deleteTask(index) {
  removeTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  showAllTasks();
}

function showAllTasks() {
  tasks.forEach((value, index) => {
    const outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "task");

    const innerDiv = document.createElement("div");
    outerDiv.append(innerDiv);

    const pEle = document.createElement("p");
    pEle.innerText = value.title;
    innerDiv.append(pEle);

    const spanEle = document.createElement("span");
    spanEle.innerText = value.description;
    innerDiv.append(spanEle);

    const deleteBtnEle = document.createElement("button");
    deleteBtnEle.setAttribute("id", "deleteBtn");
    deleteBtnEle.innerText = "-";

    deleteBtnEle.addEventListener("click", () => {
      deleteTask(index);
    });
    outerDiv.append(deleteBtnEle);
    container.append(outerDiv);
  });
}

function removeTasks() {
  tasks.forEach(() => {
    const div = document.querySelector(".task");
    div.remove();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeTasks();

  tasks.push({
    title: title.value,
    description: description.value,
  });
  title.value = "";
  description.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));
  showAllTasks();
});
