# bci-essentials-web
 Web Integration for BCI Essentials

This reposity contains the **web integration** modules and scripts for the management of **browser-based user interfaces** for EEG-based BCI. 


## Related Packages
### bci-essentials-python
The backend for this package can be found in [bci-essentials-python](https://www.github.com/kirtonBCIlab/bci-essentials-python)

### bci-essentials-unity
The Unity package can be found in [bci-essentials-unity](https://www.github.com/kirtonBCIlab/bci-essentials-unity)

## Features
- [x] Websocket server/client for communication between JavaScript and the Python backend
    - [ ] Allow the backend to receive markers from the JavaScript frontend  (WebSockets) while receiving an LSL stream from elsewhere.
    - [ ] Allow the backend to receive EEG data from the JavaScript frontend (WebSockets) using the [device-decoder](https://www.npmjs.com/package/device-decoder) library.
- [x] P300 UI
- [ ] SSVEP UI
- [ ] Motor Imagery UI

## Getting Started
Run the `index.html` file using VSCode Live Server (or any other web server).

## Shortcuts
- T — Run BCI Training
- S — Run BCI Selection
- Number Keys — Select objects with the index number (e.g. 0 will select the first object)

