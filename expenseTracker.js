const form = document.getElementById('formId');
const fullList = document.querySelector('.fullList');


// add event to from after submission
form.addEventListener('submit', formEvent);
// add event to delet item
fullList.addEventListener('click', deleteLi);
// add event to edit item
fullList.addEventListener('click', editLi);

// form events
function formEvent(e) {
    e.preventDefault();
    
    const expense = document.getElementById('expense').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    
    // only submit if all input fields are filled
    if(expense != '' && description != '' && category != '') {
        // create elements
        const li = document.createElement('li');
        const texts = document.createTextNode(`${expense}-${category}-${description}`);
        const span = document.createElement('span');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');
        editBtn.appendChild(document.createTextNode('Edit Expense'));
        deleteBtn.appendChild(document.createTextNode('Delete Expense'));
        
        // add to item lists to display
        span.appendChild(texts);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        fullList.appendChild(li);

        // store in local storage
        const myObj = {
            expense: expense,
            category: category,
            description: description
        };
        const myObjSerialized = JSON.stringify(myObj);
        localStorage.setItem(expense, myObjSerialized);
        
        // clear fields
        document.getElementById('expense').value = '';
        document.getElementById('description').value = '';
        
    }
}

// for delete event
function deleteLi(e) {
    // active event when delete button is clicked only
    if(e.target.textContent === 'Delete Expense' && e.target.tagName === 'BUTTON') {
        // grab the key from text
        const li = e.target.parentElement;
        const texts = li.children[0].textContent;
        let keyName = '';
        for(let i = 0; i<texts.length; i++) {
            if(texts[i] === '-') {
                break;
            }
            keyName = keyName + texts[i];

        }

        // remove from display and storage
        li.remove();
        localStorage.removeItem(keyName);
    }
}

// for edit event
function editLi(e) {
    // active event when edit button is clicked only
    if(e.target.textContent === 'Edit Expense' && e.target.tagName === 'BUTTON') {
        // grab the key from text
        const li = e.target.parentElement;
        const texts = li.children[0].textContent;
        let keyName = '';
        for(let i = 0; i<texts.length; i++) {
            if(texts[i] === '-') {
                break;
            }
            keyName = keyName + texts[i];

        }

        // set values to input field for furthur editing
        let myObj = localStorage.getItem(keyName);
        myObj = JSON.parse(myObj);
        document.getElementById('expense').value = myObj.expense;
        document.getElementById('description').value = myObj.description;
        document.getElementById('category').value = myObj.category;

        // remove from display and storage
        li.remove();
        localStorage.removeItem(keyName);
    }
}
