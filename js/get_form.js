class ContactList{
    constructor(){
        this.contacts = Array();
        this.name = "default";
    }
    addContact(contact){
        this.contacts.push(contact)
    }
    removeContact(id){
        for(var i in this.contacts){
            if(this.contacts[i].id == id){
                this.contacts.splice(this.contacts.indexOf(this.contacts[i]), 1)
                var row = document.getElementById(id);
                row.parentNode.removeChild(row);
                break;
            }
        }
    }

    editContact(id, newData){
        row = document.getElementById(id), i = 0;
 
        for(var i=0; i<row.childNodes.length-2;i++){
            row.childNodes[i].textContent = newData[i+1];
        }


        for(var i = 0; i<this.contacts.length;i++){
            if(this.contacts[i].id == id){            
                this.contacts[this.contacts.indexOf(this.contacts[i])].id =parseInt(newData[0])
                this.contacts[this.contacts.indexOf(this.contacts[i])].fname = newData[1]
                this.contacts[this.contacts.indexOf(this.contacts[i])].email = newData[2]
                this.contacts[this.contacts.indexOf(this.contacts[i])].phone = newData[3]
                break;
            }
        }

        submit.value = "Submit"
    }
}

class Contact {
    constructor(id, fname, email, phone){
        this.id=id;
        this.fname = fname;
        this.email = email;
        this.phone = phone;
    }
}

let contactListObj = new ContactList();
var global_id = 0, edit_id;
var table_rows = 0;

var submit = document.getElementById("submit");
submit.addEventListener("click", submit_);

function submit_(my_event){
    my_event.preventDefault()
    var fname = document.getElementById("fname").value,
    email = document.getElementById("email").value,
    phone = document.getElementById("phone").value;

    if(validate(fname, email, phone)){
        let fnameArr = fname.split(" ")
        if(fnameArr.length > 1 && fnameArr[1].length>1){
            fnameArr = fnameArr[0][0]+"."+fnameArr[1];
        }
        else{
            fnameArr=fname;
        }
        let contact = new Contact(global_id++, fnameArr, email, phone);
        if(submit.value === "Submit"){
            contactListObj.addContact(contact)
            create_row(contact.id, [contact.fname, contact.email, contact.phone])
                }
        else {
            contactListObj.editContact(edit_id,  [edit_id, contact.fname, contact.email, contact.phone])
        }
        document.getElementById("fname").value=""
        document.getElementById("email").value=""
        document.getElementById("phone").value=""
    }
}


function create_row(contactId, contactArr){
    row = document.createElement('tr');
    row.id = contactId;
    var cell;
    for(cell of contactArr){
        my_cell = document.createElement('td');
        my_cell.innerHTML = cell;
        row.appendChild(my_cell);
    }

    btn_cell = document.createElement('td');
    edit_btn = document.createElement('button');
    edit_btn.id = contactId;
    edit_btn.name = "edit"
    edit_btn.style = "height:25px;width:25px; background-image: url(icons/edit-icon.jpg);background-size: 100%"
    edit_btn.addEventListener("click", edit_);

    remove_btn = document.createElement('button');
    remove_btn.id = contactId;
    remove_btn.name = "remove"
    remove_btn.style = "height:25px;width:25px; background-image: url(icons/red-x.png);background-size: 100%"
    remove_btn.addEventListener("click", remove_);

    btn_cell.appendChild(edit_btn);
    btn_cell.appendChild(remove_btn);
    row.appendChild(remove_btn)
    row.appendChild(edit_btn)
    document.getElementById("contact_table").appendChild(row)
}

function remove_(){
    contactListObj.removeContact(this.id)
}

function edit_(){
    submit.value = "Edit"

    edit_id  =this.id
    for(var i = 0; i<contactListObj.contacts.length;i++){
        if(contactListObj.contacts[i].id == edit_id){
            document.getElementById("fname").value = contactListObj.contacts[contactListObj.contacts.indexOf(contactListObj.contacts[i])].fname
            document.getElementById("email").value = contactListObj.contacts[contactListObj.contacts.indexOf(contactListObj.contacts[i])].email
            document.getElementById("phone").value = contactListObj.contacts[contactListObj.contacts.indexOf(contactListObj.contacts[i])].phone
            break;
        }
    }
}

function update_html(all_contact){
    htmlRow="", row;
    for(row of all_contact){
        htmlRow=`<tr id="${row.id}"> <td>${row.name}</td><td>${row.email}</td><td>${row.phone}</td> <td><input type="image" id="${row.id}" name="remove" width="30px" src="icons/red-x.png"/><input type="image" id="${row.id}" name="edit" width="30px" src="icons/edit-icon.jpg"/></td> </tr>`;
    }
    document.getElementById("contact_table").getElementsByTagName('tbody')[0].innerHTML = htmlRow;
}

function validate(name,  email, phone){
    var allGood = true;
    if(!name){
        document.getElementById("error_name").innerHTML="<label style='color: red;'>  * Name empty";
        allGood=false;
    }
    else{
        document.getElementById("error_name").innerHTML="";
    }
    if(phone.length != 11){
        document.getElementById("error_phone").innerHTML="<label style='color: red;'>  * Enter a valid phone";
        allGood=false;
    }
    else{
        document.getElementById("error_phone").innerHTML="";
    }
    if(!email.includes("@")){
        document.getElementById("error_email").innerHTML="<label style='color: red;'>  * Enter a valid email";
        allGood=false;
    }
    else{
        document.getElementById("error_email").innerHTML="";
    }
    return allGood;
}

function save(){
// will add the data to an array
}

function update(){
// will get the index of the array and then edit it
}

function delete_row(){
// will remove the 
}

/**
 *  reference:
 * Lab notes
 * https://stackoverflow.com/questions/9507774/how-to-make-background-image-shrink-proportionally-to-fit-button-size-in-javascr/9507844
 * https://stackoverflow.com/questions/8683528/embed-image-in-a-button-element
 * https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript
 * https://www.w3schools.com/jsref/jsref_forof.asp
 * adding buttons automatically without query selector:
 *  https://stackoverflow.com/questions/30025645/addeventlistener-does-not-work-on-dynamically-created-button
*/
