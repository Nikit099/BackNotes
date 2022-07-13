document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "remove") {
    const id = e.target.dataset.id;
    remove(id).then(() => {
      e.target.closest("li").remove();
    });
  }
  if (e.target.dataset.type === "edit") {
    const id = e.target.dataset.id;
    const title = prompt();
    newNote = {
      title: title,
      id: id,
    };
    edit(id, JSON.stringify(newNote));
  }
  if (e.target.dataset.type === "update") {
  }
});
async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function edit(id, newNote) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: newNote,
  });
}
