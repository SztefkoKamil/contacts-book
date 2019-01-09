$(document).ready(() => {
  const searchBtn = $('#search-button');
  const openBtn = $('#open-button');
  const addBtn = $('#add-button');
  const fullListBtn = $('#full-list-button');
  const searchContactBtn = $('#search-contact-button');
  const addContactBtn = $('#add-contact-button');

  const formContainer = $('#form-container');
  const searchForm = $('#search-form');
  const addForm = $('#add-form');
  const resultContainer = $('#result-container');


  getFullList();
  actionBar();
  
  searchContactBtn.on('click', (event) => {
    event.preventDefault()
    searchContact();
  });

  addContactBtn.on('click', (event) => {
    event.preventDefault()
    addNewContact();
  });


// ===== FUNCTIONS DECLARATIONS =========================

  function actionBar(){
    addForm.hide();

    searchBtn.on('click', () => {
      if(!openBtn.hasClass('open') && addForm.hasClass('shown')){
        addForm.hide().removeClass('shown');
        searchForm.show().addClass('shown');
        slideDownForm();
      }
      else if(openBtn.hasClass('open') && addForm.hasClass('shown')){
        addForm.fadeOut(100, 'linear').removeClass('shown');
        setTimeout(() => {
          searchForm.fadeIn(100, 'linear').addClass('shown');
        }, 200);
      }
      else if(!openBtn.hasClass('open')){
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
      if(!openBtn.hasClass('open')){
        searchForm.hide().removeClass('shown');
        addForm.show().addClass('shown');
        slideDownForm();
      }
      else if(openBtn.hasClass('open') && searchForm.hasClass('shown')){
        searchForm.fadeOut(100, 'linear').removeClass('shown');
        setTimeout(() => {
          addForm.fadeIn(100, 'linear').addClass('shown');
        }, 200);
      }
    })  // ----- addBtn listener -------------

    fullListBtn.on('click', () => {
      getFullList();
    });

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
  }

  function searchContact(){
    console.log('search contact');
  }

  function addNewContact(){
    console.log('add new contact');
  }

  function deleteContact(){
    console.log('delete contact');
  }


  function showContacts(contacts){
    let contact = '';

    for(let i=0; i<contacts.length; i++){
      contact = `<div class="contact">
        <span>${contacts[i].name}</span>
        <span>${contacts[i].surname}</span>
        <span>${contacts[i].city}</span>
        <span>${contacts[i].addres}</span>
        <span>${contacts[i].zip_code}</span>
        <span>${contacts[i].country}</span>
        <span>${contacts[i].phone}</span>
        <span>${contacts[i].email}</span>
        <span>${contacts[i].info}</span></div>`;
      resultContainer.append(contact);
    }

  }

})  // ----- main function ---------------------
