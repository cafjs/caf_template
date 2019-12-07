# CAF (Cloud Assistant Framework)

Co-design permanent, active, stateful, reliable cloud proxies with your web app and IoT devices.

See http://www.cafjs.com

## Application templates for `cafjs generate`

Contains the default templates for creating skeleton apps using `cafjs generate`

It defines the following targets of increasing app complexity:

* `cloud`: Simple CA with a command line interface.

* `web` (or `default`): Add a React+Redux web frontend to `cloud`.

* `iot`: Add support for an iot device, e.g., a Rasperry Pi, to `web`.

* `vr`: Add a virtual reality interface to `iot` using Aframe.
