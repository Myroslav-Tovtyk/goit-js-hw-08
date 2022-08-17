import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const savedMsg = JSON.parse(localStorage.getItem(STORAGE_KEY));

let formData = savedMsg ?? {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
 const message = JSON.stringify(formData);  
  localStorage.setItem(STORAGE_KEY, message);
};

function populateTextarea() {
  if (savedMsg) {      
    refs.form.elements.message.value = savedMsg.message;    
    refs.form.elements.email.value = savedMsg.email;
  };
};

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
} = e.currentTarget; 
  if (email.value ==='' || message.value === '') {
    alert('Please, fill the form');
    return;
  };

  console.log(formData);
  formData = {};
  e.currentTarget.reset();  
  localStorage.removeItem(STORAGE_KEY);
};



