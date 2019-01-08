$(document).ready(() => {
  const searchBtn = $('#search-button');
  const openBtn = $('#open-button');
  const addBtn = $('#add-button');

  const formContainer = $('#form-container');
  const searchForm = $('#search-form');
  const addForm = $('#add-form');


  actionBar();


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

  } // ----- actionBar function -----------

  function slideUpForm(){
    formContainer.slideUp(200, 'linear');
    openBtn.removeClass('open').text('OPEN');
  }
  function slideDownForm(){
    formContainer.slideDown(200, 'linear');
    openBtn.addClass('open').text('HIDE');
  }

})  // ----- main function ---------------------
