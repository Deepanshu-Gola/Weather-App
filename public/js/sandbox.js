const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',e=>{
e.preventDefault()
messageOne.textContent = 'loading...'
messageTwo.textContent = ''
let userAddr = input.value
fetch('/weather?address='+encodeURIComponent(userAddr))
.then(response=>{
response.json()
.then(data=>{
  if(data.Error){
    messageOne.textContent = data.Error
    messageTwo.textContent = ''
  }else{
    messageOne.textContent = data.location
    messageTwo.textContent = data.forecast
  }
})
})
})