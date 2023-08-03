const todoItems = document.querySelectorAll("li");

todoItems.forEach((item) => {
  item.addEventListener("click", completeTodo);
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
  let responseData;
  if (response.ok) {
    responseData = await response.json();
    console.log(responseData);
    window.location.reload();
  }
}
