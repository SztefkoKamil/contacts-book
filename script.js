$(document).ready(() => {
  const searchBtn = $('#search-button');
  const openBtn = $('#open-button');
  const addBtn = $('#add-button');
  const fullListBtn = $('#full-list-button');
  const formBtn = $('#form-button');

  const formName = $('#name');
  const formSurname = $('#surname');
  const formCity = $('#city');
  const formAddress = $('#address');
  const formZip = $('#zip');
  const formCountry = $('#country');
  const formPhone = $('#phone');
  const formEmail = $('#email');
  const formInfo = $('#info');
  const formInfoLabel = $('#info-label');

  let editBtn = null;
  let deleteBtn = null;

  const formContainer = $('#form-container');
  const form = $('#form');
  const resultContainer = $('#result-container');

  let fetchedContacts = null;
  let contactId = null;


  getFullList();

  actionBar();


// ===== FUNCTIONS DECLARATIONS =========================

  function actionBar(){ // ============================
    formInfo.hide();
    formInfoLabel.hide();

    searchBtn.on('click', () => {
      clearForm();
      showSearchForm();
    })  // ----- searchBtn listener ----------

    openBtn.on('click', () => {
      if(!openBtn.hasClass('open')){
        slideDownForm();
      }
      else {
        slideUpForm();
      }
    })  // ----- openBtn listener ---------

    addBtn.on('click', () => {
      clearForm();
      showAddNewForm();
    })  // ----- addBtn listener -------------

    fullListBtn.on('click', () => {
      slideUpForm();
      clearForm();
      getFullList();

    }); // ----- fullListBtn listener -----------


    formBtn.on('click', (event) => {
      event.preventDefault()

      if(form.hasClass('search')){
        searchContact();
      }
      else if(form.hasClass('add')){
        addNewContact();
      }
      else if(form.hasClass('edit')){
        editContact();
      }
    }); // ----- formBtn listener ----------

  } // ----- actionBar function ---------------------------------------


  function showSearchForm(){
    form.removeClass('add').removeClass('edit').addClass('search');
    formInfo.hide();
    formInfoLabel.hide();

    formBtn.text('ZNAJDŹ KONTAKT');

    if(!openBtn.hasClass('open')){
      slideDownForm();
    }
  } // ----- showSearchForm function ---------------

  function showAddNewForm(){
    form.removeClass('search').removeClass('edit').addClass('add');
    formInfo.show();
    formInfoLabel.show();

    formBtn.text('DODAJ KONTAKT');

    if(!openBtn.hasClass('open')){
      slideDownForm();
    }
  } // ----- showAddNewForm function ---------------

  function showEditForm(){
    form.removeClass('search').removeClass('add').addClass('edit');
    formInfo.show();
    formInfoLabel.show();

    formBtn.text('ZAPISZ ZMIANY');

    if(!openBtn.hasClass('open')){
      slideDownForm();
    }
  } // ----- showEditForm function ---------------


  function slideUpForm(){
    formContainer.slideUp(200, 'linear');
    openBtn.removeClass('open').text('OTWÓRZ PANEL');
  }
  function slideDownForm(){
    formContainer.slideDown(200, 'linear');
    openBtn.addClass('open').text('ZAMKNIJ PANEL');
  } // ----- slide Up/Down form functions ---------


  function getFullList(){
    $.get("php/getFullList.php", "null", (response) => {
      fetchedContacts = JSON.parse(response);
      showContacts(fetchedContacts);
    })
  } // ----- getFullList function --------------


  function getFormData(){
    const data = {
      name: formName.val(),
      surname: formSurname.val(),
      city: formCity.val(),
      address: formAddress.val(),
      zip: formZip.val(),
      country: formCountry.val(),
      phone: formPhone.val(),
      email: formEmail.val(),
      info: formInfo.val()
    };

    return data;

  } // ----- getFormData function ----------------

  function clearForm(){
    formName.val(''),
    formSurname.val(''),
    formCity.val(''),
    formAddress.val(''),
    formZip.val(''),
    formCountry.val(''),
    formPhone.val(''),
    formEmail.val(''),
    formInfo.val('')
  } // ----- clearForm function ------------------

  function searchContact(){
    $.post('php/searchContact.php', getFormData(), (response) => {
      fetchedContacts = JSON.parse(response);
      showContacts(fetchedContacts);
    })

  } // ----- searchContact function --------------

  function addNewContact(){
    $.post('php/addContact.php', getFormData(), (response) => {
      console.log(response);
      getFullList();
      clearForm();
    })

  } // ----- addNewContact function ---------------

  function editContact(){
    const data = getFormData();
    data.id = contactId;
    $.post('php/updateContact.php', data, (response) => {
      console.log(response);
      getFullList();
    })
  } // ----- editContact function ---------------------

  function deleteContact(data){
    const confirmed = confirm(`Czy napewno chcesz usunąć kontakt ${data.name} ${data.surname}?`);

    if(confirmed){
      $.post('php/deleteContact.php', data, (response) => {
        console.log(response);
      })
    }
  }


  function showContacts(contacts){  // =================
    let contact = '';
    
    contacts.sort((a, b) => {
      let x = a.surname.toLowerCase();
      let y = b.surname.toLowerCase();
      if(x < y){ return -1; }
      if(x > y){ return 1; }
      return  0;
    });
    
    resultContainer.empty();

    for(let i=0; i<contacts.length; i++){
      contact = `<div class="contact" data-id="${contacts[i].id}">
        <div class="contact-info">
          <span class="i-name">${contacts[i].surname}</span>
          <span class="i-surname">${contacts[i].name}</span>
          <span class="i-city">${contacts[i].city}</span>
          <span class="i-address">${contacts[i].address}</span>
          <span class="i-zip">${contacts[i].zip_code}</span>
          <span class="i-country">${contacts[i].country}</span>
          <span class="i-phone">${contacts[i].phone}</span>
          <span class="i-email">${contacts[i].email}</span>
          <span class="i-info">${contacts[i].info}</span>
        </div>
        <div class="contact-options">
          <button class="edit-button">EDYTUJ</button>
          <button class="delete-button">USUŃ</button>
        </div></div>`
      resultContainer.append(contact);
    }

    getButtons();
    
  } // ----- showContacts function ---------------

  function getButtons(){
    editBtn = $('.edit-button');
    deleteBtn = $('.delete-button');

    editBtn.on('click', function(){ // =======================
      contactId = this.parentNode.parentNode.getAttribute('data-id');

      showEditForm();

      for(let i of fetchedContacts){
        if(i.id == contactId){
          formName.val(i.name),
          formSurname.val(i.surname),
          formCity.val(i.city),
          formAddress.val(i.address),
          formZip.val(i.zip_code),
          formCountry.val(i.country),
          formPhone.val(i.phone),
          formEmail.val(i.email),
          formInfo.val(i.info)
        }
      }
    }); // ----- editBtn listener ---------------

    deleteBtn.on('click', function(){
      contactId = this.parentNode.parentNode.getAttribute('data-id');
      const contactData = { id: contactId};

      for(let i of fetchedContacts){
        if(i.id == contactId){
          contactData.name = i.name;
          contactData.surname = i.surname; 
        }
      }

      deleteContact(contactData);
    }); // ----- deleteBtn listener -----------

  } // ----- getButtons function --------------

})  // ----- main function ---------------------
