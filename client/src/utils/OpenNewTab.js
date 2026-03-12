export default function openNewTab(url) {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (isSafari) {
        const a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(event)
    } else {
        const newTab = window.open(url, '_blank')
        newTab?.focus()
    }
}
