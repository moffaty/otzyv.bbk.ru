export function checkCyrillicName(str) {
    return /^[а-яА-Я-]{2,20}$/.test(str)
}

export function checkPhone(str) {
    return /^\d{10,12}$/.test(str)
}

export function isEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}

export function isUrl(str) {
    return /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(str)
}
