export function getData(el, name, val) {
    // dataset 是以data-开头的自定义属性的对象集合
    if (val) {
        el.dataset[name] = val
    } else {
        return el.dataset[name]
    }
}