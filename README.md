# ShortURL

Live version at : https://holinhed-url.now.sh

/new (post)

    link: (string) The unshortended URL.
  
    responses:
      200:
        discriminator: (int) A unique identifier for each link.
        link: (string) The original long link to refer back to.
      422:
        status: (string) Invalid URI
      
 /u/:id (get)
    
    id: (int) The unique identifier for each link.
    
    responses:
      200:
        message: (string) Invalid ID.
      302: 
        Redirects user to correct website.
