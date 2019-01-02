const API = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://holinhed.now.sh';
const form = document.querySelector('#longUrl');

function changeButton() {
  const button = document.querySelector('#submit')
  window.innerWidth < 650 ? button.innerHTML = 'GO' : button.innerHTML = 'Submit';
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const spinner = document.querySelector('#spinner');
    const data = new FormData(form);
    const longLink = data.get('url');
    const info = document.querySelector('.info');

    spinner.style.display = '';
    info.style.display = 'none';

    fetch(`${API}/new`, {
        method: 'POST',
        body: JSON.stringify({link:longLink}),
        headers: {
          'content-type': 'application/json'
        }
      }).then(data => {
        return data.json(); 
      }).then(res => {

        spinner.style.display = 'none';

        if (res.status === 'error') {
          alert('Invalid URL :(');
        } else {
          form.reset();

          const result = document.querySelector('#url');
          result.value = API + '/u/' + res.discriminator;
        }
      });
});

changeButton();
window.addEventListener('resize', changeButton);