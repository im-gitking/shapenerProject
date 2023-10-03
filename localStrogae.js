let submitBtn = document.getElementById('formSubmit');

submitBtn.addEventListener('submit', storeLocal);

function storeLocal(e) {
    e.preventDefault();
    let fName = document.getElementById('fname').value;
    let lName = document.getElementById('lname').value;

    let userObj = {
        firstName: fName,
        lastName: lName
    };

    let userObjSerialized = JSON.stringify(userObj);
    localStorage.setItem('user', userObjSerialized);
}