let list = (head) => (rest) => {
    return {
        head,
        rest,
    }
}
let array2list = (arr) => {
    let result = null
    let xs = Array.from(arr).reverse()
    for (let i = 0; i < xs.length; i++) {
        result = list(xs[i])(result)
    }
    return result
}
let head = (l) => l === null ? null : l.head
let rest = (l) => l === null ? null : l.rest
let len = (list) => rest(list) === null ? 1 : 1 + len(list.rest)
let take = (n) => (l) => l === null
    ? null
    : n === 0
        ? null
        : list(head(l))(take(n - 1)(rest(l)))

let drop = n => l =>
    l === null
        ? null
        : n === 0
            ? l
            : drop(n - 1)(rest(l))

let map = fn => l =>
    l === null
        ? null
        : list(fn(head(l)))(map(fn)(rest(l)))

let range = from => to =>
    from > to
        ? 0
        : list(from)(range(from + 1)(to))

let concat = l1 => l2 =>
    l1 === null ? l2 : list(head(l1))(concat(rest(l1))(l2))

let split = i => l =>
    list
    (head(drop(i)(l)))
    (concat(take(i)(l))(drop(i+1)(l)))

let shuffle = l => {
    if (l === null) return null

    let xs = split(Math.floor(Math.random() * (len(l))))(l)
    return list
    (head(xs))
    (shuffle(rest(xs)))
}
