let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementsByName('filter');

// form submit event
form.addEventListener('submit', addItem);
// delete event
itemList.addEventListener('click', removeItem);

// add item
function addItem(e) {
    e.preventDefault();

    // get input value
    let newItem = document.getElementById('item').value;

    // create new li element
    let li = document.createElement('li');
    // add class
    li.className = 'list-group-item';
    // add text node with input value
    li.appendChild(document.createTextNode(newItem));

    // create del button element
    let deleteBtn = document.createElement('button');
    // add class to del button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    // append text node in del
    deleteBtn.appendChild(document.createTextNode('X'));

    // create edit button
    let editBtn = document.createElement('button');
    // add class to edit button
    editBtn.className = 'btn btn-warning mx-1 btn-sm float-right edit';
    // add text node
    editBtn.appendChild(document.createTextNode('Edit'));


    li.appendChild(editBtn);

    li.appendChild(deleteBtn);


    itemList.appendChild(li);

}

// Remove Item
function removeItem(e) {
    if(e.target.classList.contains('delete')) {
        if(confirm('Ary you Sure?')) {
            let li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}
