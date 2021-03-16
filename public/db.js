const indexedDB = 
    window.indexedDB ||
    window.moxIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

    let db;

    const request = indexedDB.open("budget", 1);

    request.onupgradeneeded = ({ target }) => {
        let db = target.result;
        db.createObjectStore("pending", { autoIncrement: true })
    };

    request.onsuccess = ({ target }) => {
        db = target.result;

        // checks if the app is online before reading the database
        if (navigator.onLine) {
            checkDatabase();
        }
    };

    request.onerror = function(event) {
        console.log( "nope, didn't like that " + event.target.errorCode);
    };