
// import { initFormPreview } from './_initFormPreview.js';
// import { sendFormData } from './_sendFormData.js';
// import { initSelectCrafted } from './_initSelectCrafted.js';
// initSelectCrafted();


export const initValidateForm = (formId, previewConfig = null, sendConfig = null) => {
  // ------------------------------------


  //------------------------------------

  const validationRules = {
    required: (value) => value.trim() !== '',
    email: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value),
    checkbox: (checked) => checked
  };

  const form = document.getElementById(formId);

  if (!form) {
    console.error(`Form with id "${formId}" not found`);
    return;
  }


  form.addEventListener('submit', formSend);

  //<<<<<<<НЕОБЯЗАТЕЛЬНЫЕ ВВЕДЕНИЯ ("ВТОРОЙ ШАНС")
  form.addEventListener('input', handleInput);
  form.addEventListener('change', handleChange);
  //>>>>>>>НЕОБЯЗАТЕЛЬНЫЕ ВВЕДЕНИЯ ("ВТОРОЙ ШАНС")


  // Инициализация предпросмотра, если настройки предоставлены
  if (previewConfig) {
    if (previewConfig.argFormImage && previewConfig.argFormPreview) {
      const { argFormImage, argFormPreview } = previewConfig;
      initFormPreview(argFormImage, argFormPreview);
    }
  }


  // --------------------------------------------------------------

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    if (error === 0) {
      form.classList.add('_sending');

      /* //# - Форма будет отправлятьсяя на сервер ?.
      let formData = new FormData(form);
      try {
        const result = await sendFormData(formData, sendConfig);
        alert(result.message);
        form.reset();
        if (previewConfig.previewId) {
          document.getElementById(previewConfig.previewId).innerHTML = '';
        }
      } catch (error) {
        alert(error.message);
      } finally {
        form.classList.remove('_sending');
      }
       */

      setTimeout(() => {
        if (previewConfig) {
          if (argFormPreview) {
            const clearFormPreview = document.getElementById(argFormPreview);
            clearFormPreview.innerHTML = 'jpg, png, gif';
          }
        }
        form.reset();
        form.classList.remove('_sending');
      }, 2000);


    } else {
      alert('Заполните обязательные поля');
    }
  }


  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      // ----------------CHECK EMAIL
      if (input.classList.contains('_email')) {
        if (!validationRules.email(input.value)) {

          formAddError(input);
          error++;
        }
        // ----------------CHECK CHECKBOX
      } else if (input.getAttribute('type') === 'checkbox' && !validationRules.checkbox(input.checked)) {
        formAddError(input);
        error++;
        // ----------------Check any fields (на заполнения)
      } else {
        if (!validationRules.required(input.value)) {
          formAddError(input);
          error++;
        }

      }
    }

    return error; // ВЕРНУТЬ ЗНАЧЕНИЕ
  }

  // --------------------------------------------------------------
  //НЕОБЯЗАТЕЛЬНЫЕ ВВЕДЕНИЯ ("ВТОРОЙ ШАНС")

  function handleInput(e) {
    const input = e.target;
    if (input.classList.contains('_req')) {
      if (input.classList.contains('_email')) {
        if (validationRules.email(input.value)) {
          formRemoveError(input);
        }
      } else {
        formRemoveError(input);
      }
    }
  }

  function handleChange(e) {
    const input = e.target;
    if (input.type === 'checkbox' && input.classList.contains('_req')) {
      if (validationRules.checkbox(input.checked)) {
        formRemoveError(input);
      }
    }
  }

  // ---------------------------------------------------------------

  // ДОБАВИТЬ КЛАСС
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  // УБРАТЬ КЛАСС
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }



}


/*
Использование : 

import { initValidateForm } from './formValidator.js';
----------------------------------------
  initValidateForm('myFormId', {
    imageInputId: 'formImage',
    previewId: 'formPreview'
  }, {
    url: 'https://your-server-url.com/submit',
    method: 'POST'
  });
----------------------------------------

- HTML 
  - Элементы которые будут проверятся должны иметь класс: "_req"
  - input type='email' Должен иметь класс "_email" (для дополнительной проверки регулярным выражением)
  - Элементам будут добавлен вард "_error" который говорит что в поле ошибка (стилизуй его как захочется)

- Доп.Описание:
  - "ВТОРОЙ ШАНС" означент что если пользователь будет исправлять ошибку (незаполненые поля) в этот же момент будет удален "_error"
  - Если форма планируется к отправке уже есть готовые кусочки например "Форма будет отправлятьсяя на сервер ? "

*/