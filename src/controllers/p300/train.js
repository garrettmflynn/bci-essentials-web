import select from './select.js'
import { wait } from '../../utils.js'

export default async function (refs=this?.controller?.refs, options=this?.controller?.options) {

    const { context, iterationsPerTraining = 1 } = options // Default: two training iterations

    if (context) context.states.training = true

    const iterArr = Array.from({length: iterationsPerTraining}, (_, i) => i)

    while (iterArr.length) {

        iterArr.shift()
        const target = Math.floor(Math.random() * refs.length)
        const ref = refs[target]
        this.controller.targetOn(ref)
        wait(500, () => this.controller.targetOff(ref))
        await wait(1000)
        
        const thisSelect = this?.selection ?? select
        await thisSelect.call(this, refs, options)
    }

    if (context) context.states.training = false

}