const todoItems = document.querySelectorAll("li");

todoItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const tagName = event.target.tagName;
    if (tagName === "SPAN") {
      completeTodo(event);
    } else if (tagName === "I") {
      deleteTodo(event);
    }
  });
});

async function completeTodo(event) {
  const response = await fetch("/completeTodo", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todoName: event.target.textContent,
      isCompleted: true,
      isDeleted: false,
    }),
  });
  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    window.location.reload();
  }
}

async function deleteTodo(event) {
  const response = await fetch("/deleteTodo", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todoName: event.target.parentElement.children[0].textContent,
    }),
  });
  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    window.location.reload();
  }
}
