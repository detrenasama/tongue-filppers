let node = (id) => document.getElementById(id);
let p = (text) => {
    let node = document.createElement('p')
    node.innerText = text
    return node
}
let on = (elem, ev, handler) => elem.addEventListener(ev, handler)
let hide = node => node.style.display = 'none'
let show = node => node.style.display = null

let ajax = async url => fetch(url).then(response => response.ok ? response.json() : null)
