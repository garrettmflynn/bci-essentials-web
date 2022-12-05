import controllers from './controllers/index.js'
import WebSocketClient from "./WebSocketClient.js";

export default class Controller {

    context = {
        states: {
            training: false,
            selecting: false
        }
    }

    selection; // Indicate the selected object for the current stimulus period

    #type;
    get type() {
        return this.#type;
    }

    set type(type) {
        this.#type = type;
        this.current = new controllers[type](this);
    }

    #socket;
    get socket() {
        return this.#socket;
    }

    set socket(port) {
        this.#socket = new WebSocketClient(typeof port === 'number' ? port : undefined);
        this.#socket.onmessage = this.onmessage
    }

    constructor(refs, options={}) {
        this.refs = refs;
        this.options = options;
        const ctx = this.options.context
        if (ctx) this.context = Object.assign(this.context, ctx)
        this.options.context = this.context

        const socket = this.options.socket
        if (socket) this.socket = socket
        this.type = this.options.type ?? 'P300'; // Will trigger creation of the approparite controller
    
        // Window Responses
        window.onkeydown = (ev) => {
            const isNumber = isFinite(event.key);
            if (isNumber) this.select(event.key)
            else {
                if (ev.key === 's') this.toggleStimulus()
                else if (ev.key === 't') this.toggleTrain()
            }
        }
    }

    toggleTrain = () => {
        const active = this.context.states.selecting !== false || this.context.states.training !== false
        if (active) this.context.states.selecting = false
        else this.current.train()
    }

    toggleStimulus(){
        const active = this.context.states.selecting !== false || this.context.states.training !== false
        if (active) this.context.states.selecting = false
        else this.current.selection()
    }


    // On / Off Behaviors
    on = (ref) => ref.style.backgroundColor = '#FF2400'

    off = (ref) => ref.style.backgroundColor = ''

    targetOn = (ref) => ref.style.backgroundColor = 'lime'

    targetOff = (ref) => ref.style.backgroundColor = ''

    // Socket Behaviors
    onmessage = (event) => {
        console.log('Message from Socket:', event.data);
    }

    send = (message, type) => {
        if (type === 'marker') this.socket.sendMarker(message)
        else this.socket.send(message)
    }

    select = (i = this.selection) => {
        if (i !== undefined) {
            if (i instanceof HTMLElement) i = this.refs.indexOf(i)
            if (this.context.states.selecting) this.current.select(i)
            else this.send(i)
        } else {
            console.error('No selection provided')
        }
    }

    sendMarker = function (i){
        const markerData = ['p300','s','9','8', i]
        const marker = {
            data: markerData,
            timestamp: Date.now(),
        }
        this.send(marker);
    }
}