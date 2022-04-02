const findNode = (id) => document.getElementById(id);
const removeNode = node => node.parentNode.removeChild(node)
const node = tag => attributes => children => {
    let n = document.createElement(tag)
    for (let i in attributes) {
	n[i] = attributes[i]
    }

    if (children instanceof Array) {
	for (let i in children) {
	    if (children[i] instanceof Node)
		n.appendChild(children[i])
	}
    } else if (typeof children === 'string' || typeof children === 'number') {
	n.innerText = children
    }

    return n
}
const p = text => attributes => node('p')(attributes)(text)
const div = node('div')
const span = node('span')
const i = node('i')
const ul = node('ul')
const li = node('li')
const h = level => node('h' + level)
const button = label => attributes => node('button')(attributes)(label)

const on = (elem, ev, handler) => elem.addEventListener(ev, handler)
const hide = node => node.style.display = 'none'
const show = node => node.style.display = null

const ajax = async url => fetch(url).then(response => response.ok ? response.json() : null)


const createModal = options => {
    options = Object.assign({
	buttons: ["OK"],
	title: null,
	content: null,
	onConfirm: () => {},
	onCancel: () => {},
    }, options)

    let content;
    const modal = div({className: 'modal-dimmer'})([
	div({className: 'modal'})([
	    div({className: 'modal-header'})([
		div({className: 'modal-title'})(options.title || null)
	    ]),
	    div({className: 'modal-body'})([
		content = div({className: 'modal-content', innerHTML: options.content})()
	    ]),
	    div({className: 'modal-footer'})([
		options.buttons
		    ? div({className: 'modal-buttons'})(options.buttons.map(text => button(text)({className: 'pure-button pure-button-primary', onclick: options.onConfirm})))
		    : null
	    ]),
	])
    ])

    return {
	modal,
	content,
	options,
    }
}


const dialog = options => {
    const modalData = createModal(Object.assign({
	onConfirm: e => removeNode(modalData.modal)
    }, options))

    findNode('body').appendChild(modalData.modal)
}

const dialogError = title => message => dialog({title, content: message})

