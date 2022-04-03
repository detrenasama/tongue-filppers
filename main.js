const buttonRun = findNode('run')
const inputLinesCountInput = findNode('lines_count')
const contentPlaceholder = findNode('content')
const radioFileTypeDefault = findNode('file_type_default')
const radioFileTypeCustom = findNode('file_type_custom')
const formInputSource = findNode('file_type_custom_form')
const inputSource = findNode('source')

let lines = null
let defaultLines = null

let loadLines = (arr) => {
    lines = array2list(arr)
}
let loadDefaultLines = async () => {
    if (defaultLines === null)
        defaultLines = await ajax('/default.json')

    loadLines(defaultLines)
}

on(inputSource, 'change', async e => {
    const file = e.target.files[0]
    if (!file) return

    try {
        loadLines(await parseFile(file))
    } catch (e) {
	dialogError("Ошибка")("Не удалось прочитать файл. Возможно, синтаксические ошибки")
	radioFileTypeDefault.checked = true
	hide(formInputSource)
    }

})

on(buttonRun, 'click', e => {
    let shuffledLines = shuffle(lines)
    let elements = map(p)(take(inputLinesCountInput.value)(shuffledLines))

    contentPlaceholder.innerHTML = ""
    map(el => contentPlaceholder.appendChild( el({}) ))(elements)
})

on(radioFileTypeDefault, 'change', e => {
    if (!e.target.checked) return

    hide(formInputSource)
    loadDefaultLines()
})

on(radioFileTypeCustom, 'change', async e => {
    if (!e.target.checked) return

    if (inputSource.files[0]) {
        try {
            loadLines(await parseFile(inputSource.files[0]))
        } catch (e) {
	    dialogError("Ошибка")("Не удалось прочитать файл. Возможно, синтаксические ошибки")
	    radioFileTypeDefault.checked = true
	    hide(formInputSource)
        }
    }
    show(formInputSource)
})

loadDefaultLines()
