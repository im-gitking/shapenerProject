let submitBtn = document.getElementById('formSubmit');
let outputList = document.getElementById('output');
// add User
submitBtn.addEventListener('submit', storeLocal);
// delet user
outputList.addEventListener('click', delUser);

window.addEventListener('DOMContentLoaded', () => {
    // getting stored data using GET
    axios.get('https://crudcrud.com/api/7e0b32e145a4482ea745d009dab10cdf/appointmentData')
    .then((response) => {
        console.log(response); 
        
        // show the GET rqquest results
        for( let person in response.data) {
            console.log(response.data[person]);
            showOutput(response.data[person]);
        }
    })
    .catch((error) => {
        console.log(error);    
    })
});

function storeLocal(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;

    // when all fields are filled
    if (name != '' && phone != '' && email != '') {

        let userObj = {
            Name: name,
            Email: email,
            Phone: phone
        };
        let addtext = `${name}-${email}-${phone}`;
        console.log(userObj);

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

        // let userObjSerialized = JSON.stringify(userObj);
        // localStorage.setItem(email, userObjSerialized);

        // POST data in JSON to CrudCrud.com via AXIOS
        axios.post("https://crudcrud.com/api/7e0b32e145a4482ea745d009dab10cdf/appointmentData", userObj)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
}

function delUser(e) {
    // for delete action
    if (e.target.classList.contains('delete')) {
        let targetElm = e.target.previousSibling;
        let targetText = targetElm.nodeValue;
        let keyValue = '';
        let count = 0;
        for (let i = 0; i < targetText.length; i++) {
            if (targetText[i] == '-' && count == 1) {
                break;
            }
            else if (targetText[i] == '-') {
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
    if (e.target.classList.contains('edit')) {
        let targetElm = e.target.previousSibling.previousSibling;
        let targetText = targetElm.nodeValue;
        let keyValue = '';
        let count = 0;
        for (let i = 0; i < targetText.length; i++) {
            if (targetText[i] == '-' && count == 0) {
                document.getElementById('name').value = keyValue;
                count++;
                keyValue = '';
            }
            else if (targetText[i] == '-' && count == 1) {
                email = keyValue;
                document.getElementById('email').value = keyValue;
                count++;
                keyValue = '';
            }
            else {
                keyValue = keyValue + targetText[i];
            }

        }
        document.getElementById('phone').value = keyValue;

        localStorage.removeItem(email);
        targetElm.parentElement.remove();
    }
}

function showOutput(person){
    document.getElementById('output').innerHTML += `<li>${person.Name}-${person.Email}-${person.Phone}<input type="button" value="delete" class="delete"><input type="button" value="edit" class="edit"></li>`;
}
