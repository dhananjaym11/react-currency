export function getLocalstorage(key) {
    let currency = localStorage.getItem(key);
    if (!currency) {
        currency = 'INR';
        setLocalstorage(key, currency);
    }
    return currency;
}

export function setLocalstorage(key, val) {
    localStorage.setItem(key, val);
}