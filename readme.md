# Listing Assignment

I've created a simple server that browses through a static directory. On root (``localhost:8000``) it shows ``index.html``. When the requested URL is a directory,  ``app.js`` will look for a ``index.html`` in that folder. If no ``index.html`` is found, there will be a list generated displaying every file in the folder. When folder is empty it will give a message that the folder is empty.

## Running the server
```sh
$ node app.js
```

## Rules

* On root index.html will show.
* When the requested URL points to a folder it will look for a ``index.html`` and show that file.
 * If no ``index.html`` is found, a unordered list will be generated that contains all files in the folder with corresponding links.
* When the requested URL has *no extension name* it will check for a ``.html`` file with the same name.
  * If found, it will show that page.
  * If not, it will send a 404 error and show a pagenotfound.html
* For any other URL, it will check with the use of ``mime-types`` and send the file with the corresponding mime-type.
  * If the page or file does not exist, it will return a 404 error with a pagenotfound.html page.
