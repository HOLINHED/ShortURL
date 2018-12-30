const API = 'http://localhost:3000/new';
const form = document.querySelector('#longUrl');

form.addEventListener("submit", event => {
    event.preventDefault();

    const spinner = document.querySelector("#spinner");
    const data = new FormData(form);
    const longLink = data.get('url');

    spinner.style.display = '';

    fetch(API, {
        method: 'POST',
        body: JSON.stringify({link:longLink}),
        headers: {
          'content-type': 'application/json'
        }
      }).then((data) => {
        return data.json(); 
      }).then((res) => {

        spinner.style.display = 'none';

        if (res.status === 'error') {
          alert('Invalid URL :(');
        } else {
          alert('Short URL: ' + window.location.hostname + "/" + res.id);
        }
      });
});