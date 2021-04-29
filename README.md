# Caf.js

Co-design cloud assistants with your web app and IoT devices.

See https://www.cafjs.com

## Application Templates for `cafjs generate`

Contains the default templates for creating skeleton apps using `cafjs generate`

It defines the following targets of increasing app complexity:

* `cloud`: Simple CA with a command line interface.

* `web` (or `default`): Add a React+Redux web frontend to `cloud`.

* `iot`: Add support for an iot device, e.g., a Rasperry Pi, to `web`.

* `iotbrowser`: Add support for an iot device with browser-based bridging code, e.g., Chrome using the Web Bluetooth API, to `web`.

* `vr`: Add a virtual reality interface to `iot` using Aframe.
