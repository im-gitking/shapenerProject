let submitBtn = document.getElementById('formSubmit');

submitBtn.addEventListener('submit', storeLocal);

function storeLocal(e) {
    e.preventDefault();
    let fName = document.getElementById('fname').value;
    let lName = document.getElementById('lname').value;

    console.log(fName);
    console.log(lName);

    localStorage.setItem(fName, lName);
}