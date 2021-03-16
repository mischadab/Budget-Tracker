const indexedDB = 
    window.indexedDB ||
    window.moxIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

    let db;