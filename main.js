const buttonRun = node('run')
const inputLinesCountInput = node('lines_count')
const contentPlaceholder = node('content')
const radioFileTypeDefault = node('file_type_default')
const radioFileTypeCustom = node('file_type_custom')
const formInputSource = node('file_type_custom_form')
const inputSource = node('source')

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

let parseFile = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        on(reader, 'load', ev => {
            try {
                resolve(JSON.parse(ev.target.result))
            } catch (e) {
                reject(e)
            }
        })
        reader.readAsText(file)
    })

}

on(inputSource, 'change', async e => {
    const file = e.target.files[0]
    if (!file) return

    try {
        loadLines(await parseFile(file))
    } catch (e) {
        // TODO: show error to user
    }

})

on(buttonRun, 'click', e => {
    let shuffledLines = shuffle(lines)
    let elements = map(p)(take(inputLinesCountInput.value)(shuffledLines))

    contentPlaceholder.innerHTML = ""
    map(el => contentPlaceholder.appendChild(el))(elements)
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
            // TODO: show error to user
        }
    }
    show(formInputSource)
})

loadDefaultLines()