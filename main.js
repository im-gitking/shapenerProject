let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');

// form submit event
form.addEventListener('submit', addItem);
// delete event
itemList.addEventListener('click', removeItem);
// filter event
filter.addEventListener('keyup', filterItems);

// add item
function addItem(e) {
    e.preventDefault();

    // get input value
    let newItem = document.getElementById('item').value;
    // get input-2 value
    let newItem2 = document.getElementById('item-2').value;

    // create new li element
    let li = document.createElement('li');
    // add class
    li.className = 'list-group-item';
    // add text node with input value
    li.appendChild(document.createTextNode(newItem));
    let brElm = document.createElement('br');
    li.appendChild(brElm);
    li.appendChild(document.createTextNode(`${newItem2}`));

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

// filter items
function filterItems(e) {
    // convert text to lowcase
    let text = e.target.value.toLowerCase();
    // get lis
    let items = itemList.getElementsByTagName('li');
    // convert to an array
    Array.from(items).forEach(function(item) {
        let trdChild = item.children;
        let itemName = item.firstChild.textContent;
        let itemName2 = trdChild[2].textContent;
        if(itemName.toLowerCase().indexOf(text) != -1 || itemName2.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

}