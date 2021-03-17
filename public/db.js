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


    //save
    function saveRecord(record) {
        const transaction = db.transaction(["pending"], "readwrite");
        const store = transaction.objectStore("pending");
        store.add(record)
    }

    // check the database
    function checkDatabase() {
        const transaction = db.transaction(["pending"], "readwrite");
        const store = transaction.objectStpre("pending");
        const getAll = store.getAll();

        getAll.onsuccess = function() {
            if (getAll.result.length > 0) {
                fetch("/api/transcation/bulk", {
                    method: "POST",
                    body: JSON.stringify(getAll.result),
                    headers: {
                        Accept: "application/json, text/plain, */*"
                    }
                })
                .then(() => {
                    const transaction = db.transaction(["pending"], "readwrite")
                    const store = transaction.objectStore("pending")
                    store.clear()
                })
            }
        }
    }

    // listen for when app comes back online
    window.addEventListener("online", checkDatabase)