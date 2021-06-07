const setLocalStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
    return data;
}

export default setLocalStorage;
