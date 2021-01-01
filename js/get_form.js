class ContactList{
    constructor(){
        this.contacts = Array();
        this.name = "default";
    }
    addContact(contact){
        this.contacts.push(contact)
    }
    removeContact(id){
        // var contact;
        for(var i = 0; i<this.contacts.length;i++){
            if(this.contacts[i].id == id){
                this.contacts.splice(this.contacts.indexOf(this.contacts[i]), 1)
                var row = document.getElementById(id);
                row.parentNode.removeChild(row);
                break;
            }
        }
    }
    editContact(id, newData){
        row = document.getElementsByTagName("tr"), i = 0;
        var cell;
        for(cell of newData){
            row[id-1].getElementsByTagName("td")[i] = cell
            i++;
        }
        var counter = 0;
        for(contact of this.contacts ){
            if(contact.id == id){
                this.contacts[counter] =newData;
            }
            counter++;
        }
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
var global_id = 0;
var table_rows = 0;

var submit = document.getElementById("submit");
submit.addEventListener("click", submit_);

function submit_(my_event){
    my_event.preventDefault()
   
    // <input type="image" id="" name="edit" width="50px" src="/icons/edit-icon.png" />
    var fname = document.getElementById("fname").value,
    email = document.getElementById("email").value,
    phone = document.getElementById("phone").value;
    htmlRow = ""

    if(validate(fname, email, phone)){
        let fnameArr = fname.split(" ")
        if(fnameArr.length > 1 && fnameArr[1].length>1){
            fnameArr = fnameArr[0][0]+"."+fnameArr[1];
        }
        else{
            fnameArr=fname;
        }
        let contact = new Contact(global_id++, fnameArr, email, phone);
        contactListObj.addContact(contact)
        create_row(contact.id, [contact.fname, contact.email, contact.phone])
        htmlRow=`
        <tr id="${contact.id}"> 
        <td>${contact.fname}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td> 
        `;
        // <td>
        // <button id="${contact.id}" name="remove" style="height:25px;width:25px; background-image: url(/icons/red-x.png);background-size: 100%">
        // <button id="${contact.id}" name="remove" style="height:25px;width:25px; background-image: url(/icons/edit-icon.jpg);background-size: 100%">
        // </td>
        // document.getElementById("contact_table").getElementsByTagName('tbody')[0].innerHTML += htmlRow;

        // btn_cell = document.createElement('td');
        // edit_btn = document.createElement('button');
        // edit_btn.id = contact.id;
        // edit_btn.name = "edit"
        // edit_btn.style = "height:25px;width:25px; background-image: url(/icons/edit-icon.jpg);background-size: 100%"
        // edit_btn.addEventListener("click", edit_);

        // remove_btn = document.createElement('button');
        // remove_btn.id = contact.id;
        // remove_btn.name = "edit"
        // remove_btn.style = "height:25px;width:25px; background-image: url(/icons/red-x.png);background-size: 100%"
        // remove_btn.addEventListener("click", edit_);

        // btn_cell.appendChild(edit_btn);
        // btn_cell.appendChild(remove_btn);

        // document.getElementById("contact_table").appendChild(btn_cell)
        // document.getElementById("contact_table").getElementsByTagName('tbody')[0].innerHTML += "</tr>";

        // buttons =  document.getElementsByTagName('button')
        // inputs = buttons.querySelectorAll('edit');
        // for (var i = 0; i < buttons.length; i++) {
        //     buttons[i].addEventListener("click", edit_);
        // }

        // var remButtons = div.querySelectorAll('remove');
        // for (var i = 0; i < remButtons.length; i++) {
        //     remButtons[i].addEventListener("click", remove_);
        // }

        // remove.addEventListener("click", remove_);
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
    edit_btn.style = "height:25px;width:25px; background-image: url(/icons/edit-icon.jpg);background-size: 100%"
    edit_btn.addEventListener("click", edit_);

    remove_btn = document.createElement('button');
    remove_btn.id = contactId;
    remove_btn.name = "remove"
    remove_btn.style = "height:25px;width:25px; background-image: url(/icons/red-x.png);background-size: 100%"
    remove_btn.addEventListener("click", remove_);

    btn_cell.appendChild(edit_btn);
    btn_cell.appendChild(remove_btn);
    row.appendChild(remove_btn)
    row.appendChild(edit_btn)
    document.getElementById("contact_table").appendChild(row)
}

function remove_(){
    console.log("remove:"+this.id)
    console.log(contactListObj.contacts[this.id]);
    contactListObj.removeContact(this.id)
}

function edit_(){
    console.log("EDIT:"+this.id)
    console.log(contactListObj.contacts[this.id]);
    contactListObj.editContact(this.id)
}

function update_html(all_contact){
    htmlRow="", row;
    for(row of all_contact){
        htmlRow=`<tr id="${row.id}"> <td>${row.name}</td><td>${row.email}</td><td>${row.phone}</td> <td><input type="image" id="${row.id}" name="remove" width="30px" src="/icons/red-x.png"/><input type="image" id="${row.id}" name="edit" width="30px" src="/icons/edit-icon.jpg"/></td> </tr>`;
    }
    document.getElementById("contact_table").getElementsByTagName('tbody')[0].innerHTML = htmlRow;
}

function validate(name,  email, phone){
    var allGood = true;
    document.getElementsByClassName("errors")[0].style.display="none";
    document.getElementById("error-messages").innerHTML = "";
    var errorString ="";
    if(!name){
        errorString+="<li>Name shouldn't be empty</li>"
    }
    if(phone.length != 11){
        errorString+="<li>Enter a valid phone.</li>"
    }
    if(!email.includes("@")){
        errorString+="<li>Enter a valid email.</li>"
    }
    if(errorString){
        document.getElementsByClassName("errors")[0].style.display="block";
        document.getElementById("error-messages").innerHTML=errorString
        console.log(errorString);
        allGood=false;
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


