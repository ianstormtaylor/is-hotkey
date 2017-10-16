
# is-hotkey

A simple way to check whether a browser event matches a hotkey.

---

### Features

- Uses a simple, natural syntax for expressing hotkeys—`mod+s`, `cmd+alt+space`, etc.
- Uses the [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) API, so it works regardless of keyboard layout.
- Accepts `mod` for the classic "`cmd` on Mac, `ctrl` on Windows" use case.
- Can be curried to reduce parsing and increase performance when needed.
- Is extremely lightweight, weighing in at `~600 bytes` minified and gzipped.

---

### Example

The most basic usage...

```js
import isHotkey from 'is-hotkey'

function onKeyDown(e) {
  if (isHotkey('mod+s', e)) {
    ...
  }
}
```

Or, you can curry the hotkey string for better performance, since it is only parsed once...

```js
import isHotkey from 'is-hotkey'

const isSaveHotkey = isHotkey('mod+s')

function onKeyDown(e) {
  if (isSaveHotkey(e)) {
    ...
  }
}
```

That's it!

---

### Why?

There are tons of hotkey libraries, but they're often coupled to the view layer, or they bind events globally, or all kinds of weird things. You don't really want them to bind the events for you, you can do that yourself. 

Instead, you want to just check whether a single event matches a hotkey. And you want to define your hotkeys in the standard-but-non-trivial-to-parse syntax that everyone knows.

But most libraries don't expose their parsing logic. And even for the ones that do expose their hotkey parsing logic, pulling in an entire library just to check a hotkey string is overkill.

So... this is a simple and lightweight hotkey checker!

---

### API

```js
import isHotkey from 'is-hotkey'

isHotkey('mod+s', event)
isHotkey('mod+s')(event)
```

You can either pass `hotkey, event` in which case the hotkey will be parsed and compared immediately. Or you can passed just `hotkey` to receive a curried checking function that you can re-use for multiple events.

```js
isHotkey('mod+a')
isHotkey('Control+S')
isHotkey('⌘+d')
itHotkey('Meta+DownArrow')
itHotkey('cmd+down')
```

The hotkey string is compared to the [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) API in a case-insentive way, and with all of the conveniences you'd expect—`cmd` vs. `Meta`, `opt` vs. `Alt`, `down` vs. `DownArrow`, etc. 

It also accepts `mod` for the classic "`cmd` on Mac, `ctrl` on Windows" use case.

```js
import { parseHotkey, compareHotkey } from 'is-hotkey'

const hotkey = parseHotkey('mod+s')
const passes = compareHotkey(hotkey, event)
```

You can also go even more low-level with the exposed `parseHotkey` and `compareHotkey` functions, which are what the default `isHotkey` export uses under the covers, in case you have more advanced needs.

---

### License

This package is [MIT-licensed](./License.md).
