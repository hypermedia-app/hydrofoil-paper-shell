# hydrofoil-paper-shell

A reusable [material design][mat] application shell, implemented as a [Polymer][Polymer] element. It composes
Polymer's `paper` elements .

[Polymer]: https://polymer-library.polymer-project.org
[mat]: https://material.io

## Installation

```
yarn add @hydrofoil/hydrofoil-paper-shell
```

To bundle with webpack, dynamic imports must also be enabled by adding `@babel/plugin-syntax-dynamic-import`.

## Usage

The shell element itself is API-agnostic. It produces the app skeleton but does not load resources from the
back-end. Please check the instructions of [hydrofoil-shell](https://github.com/hypermedia-app/hydrofoil-shell#using-the-element)

### Extending

Here's a live `hydrofoil-paper-shell`-based application in action


There are a number of slots, as shown on the screenshots below, which can be used to extend the shell:

1. `drawer-left`
1. `header`
1. `shell-ready`
1. `loader`
1. `toolbar-main`
1. `drawer-right`

![generic app](https://github.com/hypermedia-app/hydrofoil-paper-shell/raw/master/assets/paper-shell.png)
![generic app](https://github.com/hypermedia-app/hydrofoil-paper-shell/raw/master/assets/drawer-right.png)

To add multiple toolbar, use code like `<app-toolbar slot="drawer-left">`. Above this is how the "Select Hydra API" dropdown is added to the page.

The slot `shell-ready` is only displayed initially, before any resource is loaded from the API.

The slot `loader` is used inside a full-scree overlay, displayed while executing a server request.
