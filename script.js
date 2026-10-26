const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}

function addDeleteIcons() {
    let allNotes = document.querySelectorAll(".input-box");

    allNotes.forEach(note => {
        if (!note.querySelector("img")) {
            let img = document.createElement("img");
            img.src = "images/delete.png";
            img.alt = "Delete note";
            note.appendChild(img);
        }
    });

    updateStorage();
}

showNotes();
addDeleteIcons();


function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    img.src = "images/delete.png";
    img.onerror = () => alert("Delete image load nahi hui!");
    img.style.display = "block";
    img.alt = "Delete note";

    notesContainer.appendChild(inputBox);
    inputBox.appendChild(img);

    updateStorage();
});

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage()
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})
