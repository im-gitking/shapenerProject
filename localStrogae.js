let submitBtn = document.getElementById('formSubmit');
let outputList = document.getElementById('output');
// add User
submitBtn.addEventListener('submit', storeLocal);
// delet user
outputList.addEventListener('click', delUser);

function storeLocal(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;

    let userObj = {
        Name: name,
        Email: email,
        Phone: phone
    };
    let addtext = `${name}-${email}-${phone}`;
    console.log(addtext);
    
    // add new user in list
    let newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(addtext));
    // add delete button
    let delBtn = document.createElement('input');
    delBtn.setAttribute('type', 'button');
    delBtn.setAttribute('value', 'delete');
    delBtn.className = 'delete';
    // add edit button
    let editBtn = document.createElement('input');
    editBtn.setAttribute('type', 'button');
    editBtn.setAttribute('value', 'edit');
    editBtn.className = 'edit';
    
    newLi.appendChild(delBtn);
    newLi.appendChild(editBtn);
    outputList.appendChild(newLi);

    let userObjSerialized = JSON.stringify(userObj);
    localStorage.setItem(email, userObjSerialized);
}

function delUser(e) {
    // for delete action
    if(e.target.classList.contains('delete')) {
        let targetElm = e.target.previousSibling;
        let targetText = targetElm.nodeValue;
        let keyValue = '';
        let count = 0;
        for(let i = 0; i < targetText.length; i++) {
            if(targetText[i] == '-' && count == 1) {
                break;
            }
            else if(targetText[i] == '-') {
                count++;
                keyValue = '';
            }
            else {
                keyValue = keyValue + targetText[i];
            }
        }

        localStorage.removeItem(keyValue);
        targetElm.parentElement.remove();
    }
    
    // for edit action
    if(e.target.classList.contains('edit')) {
        let targetElm = e.target.previousSibling.previousSibling;
        let targetText = targetElm.nodeValue;
        let keyValue = '';
        let count = 0;
        for(let i = 0; i < targetText.length; i++) {
            if(targetText[i] == '-' && count == 0) {
                document.getElementById('name').value = keyValue;
                count++;
                keyValue = '';
            }
            else if(targetText[i] == '-' && count == 1) {
                email = keyValue;
                document.getElementById('email').value = keyValue;
                count++;
                keyValue = '';
            }
            else{
                keyValue = keyValue + targetText[i];
            }
            
        }
        document.getElementById('phone').value = keyValue;
        
        localStorage.removeItem(email);
        targetElm.parentElement.remove();
    }
}