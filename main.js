const buttonRun = node('run')
const inputLinesCountInput = node('lines_count')
const contentPlaceholder = node('content')
const radioFileTypeDefault = node('file_type_default')
const radioFileTypeCustom = node('file_type_custom')
const formInputSource = node('file_type_custom_form')
const inputSource = node('source')

let lines = null

let loadDefaultLines = async () => {
    lines = await ajax('/default.json').then(array2list)
}

loadDefaultLines()

on(buttonRun, 'click', e => {
    let shuffledLines = shuffle(lines)
    let elements = map(p)(take(inputLinesCountInput.value)(shuffledLines))

    contentPlaceholder.innerHTML = ""
    map(el => contentPlaceholder.appendChild(el))(elements)
})

on(radioFileTypeDefault, 'change', e => {
    if (e.target.checked)
        hide(formInputSource)
})

on(radioFileTypeCustom, 'change', e => {
    if (e.target.checked)
        show(formInputSource)
})