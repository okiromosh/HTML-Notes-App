const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector("header i "),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),

addBtn = popupBox.querySelector("button");

const months=["January", "February", "March", "April", "May", "June", "July", "August", "September",        "October", "November", "December"];

// getting local storage and parsing to js ojects, else parsing empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");


// activate popup for add note //
addBox.addEventListener("click", () => {
    popupBox.classList.add("show")
});


// close popup //
closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show")
});

// register button click event //
addBtn.addEventListener("click", e => {
    e.preventDefault();
    // assign values to title and description variables
    let noteTitle = titleTag.value, noteDesc = descTag.value;

    // check execptions
    if (noteTitle || noteDesc) {
        // adding date created //
        let dateObj = new Date(),
        month = months[dateObj.getMonth()], day = dateObj.getDate(), year = dateObj.getFullYear();

        // creating a object containing title, dec, date
        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }   

        console.log(noteInfo);

        // creating storage for created objects
        
        notes.push(noteInfo); // adding a new note
        // saving to local storage
        localStorage.setItem("notes", JSON.stringify(notes))
    }

    
});

