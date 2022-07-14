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
    edit(JSON.stringify(newNote));
  }
  if (e.target.dataset.type === "update") {
    e.target.style.display = "none";
    e.target.closest(".blockBtn").children[1].style.display = "none";
    e.target.closest(".blockBtn").children[2].style.display = "inline";
    e.target.closest(".blockBtn").children[3].style.display = "inline";
    e.target.closest("li").children[0].style.display = "none";
    e.target.closest("li").children[1].style.display = "inline";
  }
  if (e.target.dataset.type === "save") {
    const index = e.target.dataset.index;
    const title = e.target.closest("li").children[1].value;
    edit(JSON.stringify({ index: index, title: title }));

    e.target.style.display = "none";
    e.target.closest(".blockBtn").children[3].style.display = "none";
    e.target.closest(".blockBtn").children[1].style.display = "inline";
    e.target.closest(".blockBtn").children[0].style.display = "inline";
    e.target.closest("li").children[1].style.display = "none";
    e.target.closest("li").children[0].style.display = "inline";
  }
  if (e.target.dataset.type === "cancel") {
    e.target.style.display = "none";
    e.target.closest(".blockBtn").children[2].style.display = "none";
    e.target.closest(".blockBtn").children[1].style.display = "inline";
    e.target.closest(".blockBtn").children[0].style.display = "inline";
    e.target.closest("li").children[0].style.display = "inline";
    e.target.closest("li").children[1].style.display = "none";
  }
});
async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function edit(newTitle) {
  await fetch(`/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: newTitle,
  });
}
