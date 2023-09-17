const findLabel = (value, arr) => {
    return arr.find(v => v.value === value).label
}

export {
    findLabel
}