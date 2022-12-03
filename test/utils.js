function e(value, ...modifiers) {
    return {
        which: typeof value == "number" ? value : null,
        key: typeof value == "string" ? value : null,
        altKey: modifiers.includes("alt"),
        ctrlKey: modifiers.includes("ctrl"),
        metaKey: modifiers.includes("meta"),
        shiftKey: modifiers.includes("shift"),
    };
}

module.exports = {
    e
}
