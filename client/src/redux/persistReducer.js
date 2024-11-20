// https://stackoverflow.com/questions/46673204/react-redux-state-lost-after-refresh
import { configureStore  } from "@reduxjs/toolkit";
import {} from "@reduxjs/toolkit";
function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem("store", serializedStore);
    } catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem("store");
        if (serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

const store = createStore(reducer, persistedState);

store.subscribe(() => saveToLocalStorage(store.getState()));
