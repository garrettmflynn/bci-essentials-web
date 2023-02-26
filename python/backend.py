#!/usr/bin/env python
import asyncio
import websockets
import json

async def consumer(message, websocket):
    message = json.loads(message)
    print(message)

    if (type(message) == int):
        print(f"< Selection: {message}")
        greeting = f"Selected {message}!"
        await websocket.send(greeting)

    elif message['data']:
        print(f"< Marker: {message}")

    else: 
        print(f"< Other: {message}")

async def hello(websocket, path):
    while True:
        message = await websocket.recv()
        await consumer(message, websocket)

start_server = websockets.serve(hello, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()