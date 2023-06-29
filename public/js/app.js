console.log('client side javascript is loaded')


const weatherForm = document.querySelect('form')
const search = document.querySelect('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

 weatherForm.addEventListener('submite',(event)=>{
    event.prenventDefault()
   
    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    fetch('localhost:3000/weather?address='+location).then((response)=>{
 
    response.json().then((data)=>{
        
        if(data.error){
            messageOne.textContent = data.error
        }else{
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
        }
        
    })
}) 
})