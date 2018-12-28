const API = 'http://localhost:3000/new';
const form = document.querySelector('#longUrl');

form.addEventListener("submit", function(event){
    event.preventDefault();

    const data = new FormData(form);
    const longLink = data.get('url');

    fetch(API, {
        method: 'POST',
        body: JSON.stringify({link:longLink}),
        headers: {
          'content-type': 'application/json'
        }
      }).then((data) => {
        return data.json(); 
      }).then((res) => {
        console.log(res);
      })
});