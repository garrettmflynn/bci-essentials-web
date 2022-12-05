#!/usr/bin/env python
import asyncio
import websockets
import json

async def consumer(message, websocket):
    message = json.loads(message)
    print(message)

    if (type(message) == int):
        print("< Selection: {}".format(message))
        greeting = "Selected {}!".format(message)
        await websocket.send(greeting)

    # do something with the marker
    elif message['data']:
        print("< Marker: {}".format(message))

    # do something with selection
    else: 
        print("< Other: {}".format(message))

async def hello(websocket, path):
    while True:
        message = await websocket.recv()
        await consumer(message, websocket)

start_server = websockets.serve(hello, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()