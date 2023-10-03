// TRAVERSING DOM
let itemsList = document.querySelector('#items');

// parentNode
console.log(itemsList.parentNode);
itemsList.parentNode.style.backgroundColor = '#f4f4f4';
console.log(itemsList.parentNode.parentNode);
console.log(itemsList.parentNode.parentNode.parentNode);

// parentElement
console.log(itemsList.parentElement);
itemsList.parentElement.style.backgroundColor = '#f4f4f4';
console.log(itemsList.parentNode.parentElement);
console.log(itemsList.parentNode.parentElement.parentElement);

// children
console.log(itemsList.children);
// op: it doesn't add 'text' like childNode

// background color 2nd child yellow
itemsList.children[1].style.backgroundColor = 'yellow';

// first child
console.log(itemsList.firstChild);

// first Element child
console.log(itemsList.firstElementChild);

// lastChild
console.log(itemsList.lastChild);

// lastElementChild
console.log(itemsList.lastElementChild);

// nextSibling
console.log(itemsList.nextSibling);

// nextElementSibling
console.log(itemsList.nextElementSibling);

// previousSibling
console.log(itemsList.previousSibling);

// previousElementSibling
console.log(itemsList.previousElementSibling);

// createElement
let newDiv = document.createElement('div');
// op: craetes a empty div '<div></div>', and stores in newDiv 

// add Class
newDiv.className = 'hello';
// op: <div class="hello"></div>

// add id
newDiv.id = 'hello1';
// op: <div class="hello" id="hello1"></div>

// add attr
newDiv.setAttribute('title', 'hello div');
// op: <div class="hello" id="hello1" title="hello div"></div>

// create text node
let newDivText = document.createTextNode('Hello World');

// add text to div
newDiv.appendChild(newDivText);
// op: <div class="hello" id="hello1" title="hello div">Hello World</div>

// add style css
newDiv.style.fontSize = '30px';

// position where to insert the newDiv

/* <header id="main-header" class="bg-success text-white p-4 mb-3">
    <div class="container">
        <!--- WE WILL INSERT newDiv HERE ---->
        <h1 id="header-title">Item Lister <span style="display:none">123</span></h1>
    </div>
</header> */

let container = document.querySelector('header .container');
let h1 = document.querySelector('header h1');

// parent.insertBefore(element to add, next sibling)
container.insertBefore(newDiv, h1);