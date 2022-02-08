const message_area = document.querySelector('#message-area')
const req_button = document.querySelector('#send')
const body = document.querySelector('body')
var images = [];
var clicks = 0;
var localstorage_img_key = "dogimages"

const loadData = () => {
    if(localStorage.getItem(localstorage_img_key)) {
        images = JSON.parse(localStorage.getItem("dogimages"))
        for(let img in images) {
            clicks = images.length
            createMessage(message_area, images[img].link, images[img].id)
        }
        return
    }
}

loadData()

req_button.addEventListener('click', ()=>{
    try{
        async function init() {
            await request().then(()=>{
                createMessage(message_area, images[clicks].link, clicks)
                clicks++
            })
        }
        init()
    } catch (error) {
        errorwarning(`Error: ${error}`)
        console.error(error)
    }
})

const request = async () => {
    try {
        const url = 'https://dog.ceo/api/breeds/image/random'
        const response = await fetch(url)
        const data = await response.json()
        images.push({id: clicks, link: `${data.message}`})
        localStorage.setItem(localstorage_img_key, JSON.stringify(images))
    } catch (error) {
        console.error(error)
    }
}

function createMessage (htmlelement, url, id) {
    if(images.length > 0) {
        let messagecontainerCSS = 'user-msg-container'
        let messagedivCLASS = 'user-message';
        let usernameCLASS = 'username'
        let imgCLASS = 'dog-image'
        // let textCLASS ='msg-text'

        let messagecotainerDIV = document.createElement('div')        
        let messageDIV = document.createElement('div')
        let usernameDIV = document.createElement('p')
        let imgDIV = document.createElement('img')

        messagecotainerDIV.classList.add(messagecontainerCSS)
        messageDIV.classList.add(messagedivCLASS)
        usernameDIV.classList.add(usernameCLASS)
        usernameDIV.innerText = `@rand_dog_img${id}`
        imgDIV.classList.add(imgCLASS)
        imgDIV.src = url

        messageDIV.append(usernameDIV, imgDIV)
        messagecotainerDIV.append(messageDIV)
        
        htmlelement.prepend(messagecotainerDIV)
    }
}

const errorwarning = error => {
    if(!document.querySelector('#wrng')) {
         let body = document.querySelector('body')
         wrngCLASS = 'wrng'
         wrngtxtCLASS = 'wrng-txt'
         
         let wrngDIV = document.createElement('div')
         let wrngTXT = document.createElement('p')
         wrngTXT.innerText = `${error}`;
         wrngDIV.id = 'wrng';
         
         wrngDIV.classList.add(wrngCLASS)
         wrngTXT.classList.add(wrngtxtCLASS)
         wrngDIV.append(wrngTXT)
         
         body.prepend(wrngDIV)
         return
     }
 }

function deleteData() {
    let alertContainer = document.createElement('div')
    alertContainer.id = 'alert'
    alertContainer.classList.add('alert')

    let p = document.createElement('p')
    p.innerText = 'Delete all doggy images? :('

    let buttonConfirm = document.createElement('button')
    buttonConfirm.innerText = 'Yes'
    buttonConfirm.classList.add('confirm-clear-button')
    buttonConfirm.onclick = "confirmDeleteData(1)"

    let buttonDecline = document.createElement('button')
    buttonDecline.innerText = 'No'
    buttonDecline.classList.add('confirm-clear-button')
    buttonDecline.onclick = "confirmDeleteData(0)"

    alertContainer.append(p, buttonConfirm, buttonDecline)

    body.append(alertContainer)

    buttonConfirm.addEventListener('click', ()=>{
        confirmDeleteData(1)
    })
    buttonDecline.addEventListener('click', ()=>{
        confirmDeleteData(0)
    })
}

const confirmDeleteData = (response) => {
    if(response) {
        localStorage.removeItem(localstorage_img_key)
        images = []
        clicks = 0;
        location.reload()
    } else {
        document.getElementById('alert').remove()
    }
}