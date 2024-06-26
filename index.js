const hamburger = document.querySelector('.hamburger'),
  menu = document.querySelector('.menu'),
  closeElem = document.querySelector('.menu__close')

hamburger.addEventListener('click', () => {
  menu.classList.add('active')
})

closeElem.addEventListener('click', () => {
  menu.classList.remove('active')
})

const counters = document.querySelectorAll('.skills__ratings-counter'),
  lines = document.querySelectorAll('.skills__ratings-line span')

counters.forEach((item, i) => {
  lines[i].style.width = item.innerHTML
})

const form = document.querySelector('.contacts__form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = document.querySelector('#name')
  const email = document.querySelector('#email')
  const text = document.querySelector('#text')
  const policy = document.querySelector('.contacts__policy input')

  if (name.value.trim() === '') {
    showError(name, 'Введите ваше имя')
  } else {
    hideError(name)
  }

  if (email.value.trim() === '' || !validateEmail(email.value)) {
    showError(email, 'Введите корректный адрес электронной почты')
  } else {
    hideError(email)
  }

  if (text.value.trim() === '') {
    showError(text, 'Введите ваше сообщение')
  } else {
    hideError(text)
  }

  if (!policy.checked) {
    showError(policy, 'Вы должны согласиться с политикой конфиденциальности')
  } else {
    hideError(policy)
  }

  if (isValidForm()) {
    sendDataToServer()
  }
})

const showError = (field, message) => {
  const errorElement = field.nextElementSibling
  errorElement.textContent = message
  errorElement.style.color = 'red'
  field.classList.add('error')
}

const hideError = (field) => {
  const errorElement = field.nextElementSibling
  errorElement.textContent = 'Заполненно'
  errorElement.style.color = 'black'
  field.classList.remove('error')
}

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

const isValidForm = () => {
  const name = document.querySelector('#name')
  const email = document.querySelector('#email')
  const text = document.querySelector('#text')
  const policy = document.querySelector('.contacts__policy input')

  return (
    name.classList.contains('error') === false &&
    email.classList.contains('error') === false &&
    text.classList.contains('error') === false &&
    policy.classList.contains('error') === false
  )
}

const sendDataToServer = () => {
  const formData = new FormData(form)
  const url = 'https://jsonplaceholder.typicode.com/posts'

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log('Form data sent successfully!', data))
    .catch((error) => console.error('Error sending form data:', error))
}
