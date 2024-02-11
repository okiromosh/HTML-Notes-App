const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i "),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),

addBtn = popupBox.querySelector("button");

const months=["January", "February", "March", "April", "May", "June", "July", "August", "September",        "October", "November", "December"];

// getting local storage and parsing to js ojects, else parsing empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
// updating notes
let  isUpdate = false, updateId;


// activate popup for add note //
addBox.addEventListener("click", () => {
    titleTag.focus()
    popupBox.classList.add("show")
});


// close popup //
closeIcon.addEventListener("click", () => {
    isUpdate = false;

    titleTag.value = "";
    descTag.value = "";

    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add new Note";

    popupBox.classList.remove("show")
});

// display stored data
function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, index) => {
       // console.log(note);
       let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <hr>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li><i onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="uil uil-pen">Edit</i></li>
                                    <li><i onclick="deleteNote(${index})" class="uil uil-trash">Delete</i></li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();

// logic for ellipsis(menu ...)
function showMenu(elem) {
    // showing menu
    elem.parentElement.classList.add("show");
    document.addEventListener("click",  e => {
        // removing menu
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show")
        }
    });
}

// logic for delete note
function deleteNote(noteId) {
    //comfirmation
    let confirmDel = confirm("Are you sure you want to delete this note ?");
    if(!confirmDel) return;
    // console.log(noteId);
    notes.splice(noteId, 1); // remove selected id from array
    // updating  local storage
    localStorage.setItem("notes", JSON.stringify(notes))
    // refresh page
    showNotes();
}

//logic for edit 
function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    // autofill fields
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note"
    console.log(noteId,  title, desc);
}

// register button click event //
addBtn.addEventListener("click", e => {
    e.preventDefault();
    // assign values to title and description variables
    let noteTitle = titleTag.value, noteDesc = descTag.value;

    // check execptions
    if (noteTitle || noteDesc) {
        // adding date created //
        let dateObj = new Date(),
        month = months[dateObj.getMonth()], 
        day = dateObj.getDate(), 
        year = dateObj.getFullYear();

        // creating a object containing title, dec, date
        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }   


        // creating storage for created objects

        if(!isUpdate) {
            notes.push(noteInfo); // adding a new note
        } else{
            isUpdate = false;
            notes[updateId] = noteInfo; // updating specific note
        }


        
        
        // saving to local storage
        localStorage.setItem("notes", JSON.stringify(notes))
        closeIcon.click();
        showNotes();

    }

    
});

