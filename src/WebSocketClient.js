

    export default class WebSocketClient {

        active = false
        #sentActiveError = false

        #onmessage(message) {
            console.log(message)
        }

        get onmessage() {
            return this.#onmessage
        }

        set onmessage(f) {
            this.ws.onmessage = f
        }

        constructor(port=8765) {
            this.ws = new WebSocket(`ws://localhost:${port}`);
            this.ws.onmessage = this.onmessage
        }

        send(message) {
            if (this.active) {
                if (typeof message === 'object') message = JSON.stringify(message)
                this.ws.send(message)
            } else {
                if (!this.#sentActiveError) {
                    this.#sentActiveError = true
                    console.error('WebSocketClient is not active. Please check that the server is running.')
                }
            }
        }
    }