import flash from './flash.js';

export default async function (refs=this?.controller?.refs, options=this?.controller?.options) {

    const { context, iterationsPerSelection } = options // Default: two selection passes
    
    if (context) context.states.selecting = true

    const iterArr = Array.from({length: iterationsPerSelection}, (_, i) => i)

    while (iterArr.length) {
        if (context.states.selecting === false) break
        iterArr.shift()
        const thisFlash = this?.flash ?? flash
        await thisFlash.call(this, refs, options)
    }

    if (context) context.states.selecting = false
    
    const controller = this?.controller
    if (controller) controller.select()
}