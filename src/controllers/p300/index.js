import flash from './flash.js'
import selection from './select.js'
import train from './train.js'

export {
    flash,
    selection,
    train
}

export default class P300 {
    constructor(controller) {
        this.controller = controller;
    }

    flash = flash
    selection = selection
    train = train

    select = (i) => {
        this.controller.selection = i
    }
}