# Listing Assignment

I've created a simple server that browses through a static directory. On root (``localhost:8000``) it shows ``index.html``. When the requested URL is a directory,  ``app.js`` will look for a ``index.html`` in that folder. If no ``index.html`` is found, there will be a list generated displaying every file in the folder. When folder is empty it will give a message that the folder is empty.

## Running the server
```sh
$ node app.js
```
