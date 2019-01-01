const API = 'http://localhost:3000/new';
const form = document.querySelector('#longUrl');

form.addEventListener("submit", event => {
    event.preventDefault();

    const spinner = document.querySelector('#spinner');
    const data = new FormData(form);
    const longLink = data.get('url');
    const links = document.querySelector('.info');

    spinner.style.display = '';
    links.style.display = 'none';

    fetch(API, {
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

          const container = document.createElement('div');
          container.setAttribute('class', 'links')

          const ogLink = document.createElement('a');
          ogLink.innerHTML = longLink;
          ogLink.setAttribute('href', longLink);
          ogLink.setAttribute('class', 'link');

          const arrow = document.createTextNode('->');

          const shortLink = document.createElement('a');
          shortLink.innerHTML = 'http://localhost:3000/u/' + res.discriminator;
          shortLink.setAttribute('href', shortLink.innerHTML);
          shortLink.setAttribute('class', 'link');

          container.appendChild(ogLink);
          container.appendChild(arrow);
          container.appendChild(shortLink);

          links.appendChild(container);
        }

        links.style.display = '';
      });
});

window.addEventListener('resize', function(){

  const button = document.querySelector('#submit')
  window.innerWidth < 650 ? button.innerHTML = 'GO' : button.innerHTML = 'Submit';

});