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


  getFullList();

  actionBar();


// ===== FUNCTIONS DECLARATIONS =========================

  function actionBar(){
    formInfo.hide();
    formInfoLabel.hide();

    searchBtn.on('click', () => {
      form.removeClass('add').removeClass('edit').addClass('search');
      formInfo.hide();
      formInfoLabel.hide();

      formBtn.text('ZNAJDŹ KONTAKT');

      if(!openBtn.hasClass('open')){
        slideDownForm();
      }
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
      form.removeClass('search').removeClass('edit').addClass('add');
      formInfo.show();
      formInfoLabel.show();

      formBtn.text('DODAJ KONTAKT');

      if(!openBtn.hasClass('open')){
        slideDownForm();
      }
    })  // ----- addBtn listener -------------

    fullListBtn.on('click', () => {
      getFullList();
    });


    formBtn.on('click', (event) => {
      event.preventDefault()

      if(form.hasClass('search')){
        searchContact();
      }
      else if(form.hasClass('add')){
        addNewContact();
      }
      else if(form.hasClass('edit')){
        // editContact();
      }
    }); // ----- formBtn listener ----------

  } // ----- actionBar function -----------


  function slideUpForm(){
    formContainer.slideUp(200, 'linear');
    openBtn.removeClass('open').text('OPEN');
  }
  function slideDownForm(){
    formContainer.slideDown(200, 'linear');
    openBtn.addClass('open').text('HIDE');
  }


  function getFullList(){
    console.log('get full list');

    $.get("php/getFullList.php", "null", (response) => {
      console.log(JSON.parse(response));
      showContacts(JSON.parse(response));
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

  function searchContact(){
    $.post('php/searchContact.php', getFormData(), (response) => {
      console.log(JSON.parse(response));
      showContacts(JSON.parse(response));
    })

  } // ----- searchContact function --------------

  function addNewContact(){
    $.post('php/addContact.php', getFormData(), (response) => {
      console.log(response);
    })

  } // ----- addNewContact function ---------------

  function editContact(){
    console.log('edit contact');
  }

  function deleteContact(){
    console.log('delete contact');
  }


  function showContacts(contacts){
    let contact = '';

    resultContainer.empty();

    for(let i=0; i<contacts.length; i++){
      contact = `<div class="contact" data-id="${contacts[i].id}">
        <div class="contact-info">
          <span>${contacts[i].name}</span>
          <span>${contacts[i].surname}</span>
          <span>${contacts[i].city}</span>
          <span>${contacts[i].address}</span>
          <span>${contacts[i].zip_code}</span>
          <span>${contacts[i].country}</span>
          <span>${contacts[i].phone}</span>
          <span>${contacts[i].email}</span>
          <span>${contacts[i].info}</span>
        </div>
        <div class="contact-options">
          <button class="edit-button">EDYTUJ</button>
          <button>USUŃ</button>
        </div></div>`
      resultContainer.append(contact);
    }

    getButtons();
    
  } // ----- showContacts function ---------------

  function getButtons(){
    editBtn = $('.edit-button');
    // deleteBtn = $('.delete-button');
    console.log($('.edit-button'));
    editBtn.on('click', function(){
      console.log(this.parentNode.parentNode.getAttribute('data-id'));
    });
  }

})  // ----- main function ---------------------
