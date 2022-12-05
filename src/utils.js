export const wait = (time, callback) => new Promise(resolve => {
    setTimeout(() => {
        if (callback) callback()
        resolve()
    }, time)
})