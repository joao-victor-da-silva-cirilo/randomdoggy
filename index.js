var click = 0;
const send = document.querySelector("#send");

send.addEventListener("click", () => {
    runApp();
});

function runApp() {
    const app = document.querySelector('#message-area');
    genADog(app);
}

function genADog (element) {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(url, options)
    .then( response => {return response.json()})
    .then( data => {
        click++;
        element.innerHTML += 
        `<div class="user-img-container">
            <div class="user-message">
                \n\t<p class="username">@random_user</p>
                \n\t<img 
                    class="dog-image" 
                    src="${data.message}" 
                    alt="dog image nº ${click}" 
                    title="dog image nº ${click}"/>
            \n</div>
        </div>
        `
            return;
    })
    .catch(error => {console.log(`Algo inesperado (ou não) aconteceu: ${error}`)})

    return 0;
}