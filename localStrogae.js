let submitBtn = document.getElementById('formSubmit');
let outputDiv = document.getElementById('output');

submitBtn.addEventListener('submit', storeLocal);

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
    
    let newDiv = document.createElement('div');
    newDiv.appendChild(document.createTextNode(addtext));
    outputDiv.appendChild(newDiv);

    let userObjSerialized = JSON.stringify(userObj);
    localStorage.setItem(email, userObjSerialized);
}