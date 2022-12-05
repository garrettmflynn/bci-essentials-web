
const createSet = (len) => Array.from({length: len}, (_, i) => i)

    function animate(selection) {

        return new Promise(resolve => {

            const time = this.controller.options.time
            const ref = this.controller.refs[selection]
            this.controller.on(ref)
            this.controller.sendMarker(selection)

            // Turn off highlight
            setTimeout(() => {
                this.controller.off(ref)
            }, time/2);

            setTimeout(() => resolve(), time)
        })
}

export const on = (selection) => this.controller.refs[selection].style.backgroundColor = ''
export const off = (selection) => this.controller.refs[selection].style.backgroundColor = ''

export default async function (refs=this?.controller?.refs, options = this?.controller?.options ?? {}) {
    if (refs){
        let set = createSet(refs.length)

        const {context = {}} = options

        while (set.length) {
            const selection = Math.floor(Math.random() * set.length)
            const toFlash = set.splice(selection, 1)[0]
            await animate.call(this, toFlash)
            if (context.states.selecting === false) break
        }
    } else {
        console.error('No refs provided to select')
    }
}