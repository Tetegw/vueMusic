export function shuffle(arr) {
    let newArr = arr.slice()
    for (var i = 0; i < newArr.length; i++) {
        let j = getRandomInt(0, i)
        let t = newArr[i]
        newArr[i] = newArr[j]
        newArr[j] = t
    }
    return newArr
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}