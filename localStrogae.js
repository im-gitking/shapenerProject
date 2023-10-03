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
    let addtext = `${name} - ${email} - ${phone}`;
    console.log(addtext);
    
    // add new user in list
    let newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(addtext));
    // add delete button
    let delBtn = document.createElement('input');
    delBtn.setAttribute('type', 'button');
    delBtn.setAttribute('value', 'delete');
    delBtn.className = 'delete';
    
    newLi.appendChild(delBtn);
    outputList.appendChild(newLi);

    let userObjSerialized = JSON.stringify(userObj);
    localStorage.setItem(name, userObjSerialized);
}

function delUser(e) {
    if(e.target.classList.contains('delete')) {
        let targetElm = e.target.previousSibling;
        let targetText = targetElm.nodeValue;
        let keyValue = '';
        for(let i = 0; i <= targetText.length; i++) {
            if(targetText[i] == '-') {
                break;
            }
            keyValue = keyValue + targetText[i]
        }
        keyValue = keyValue.slice(0, -1);
        localStorage.removeItem(keyValue);

        targetElm.parentElement.remove();
    }
}