const IS_MAC = (
  typeof window != "undefined" &&
  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)
)

const MODIFIERS = {
  alt: "altKey",
  control: "ctrlKey",
  meta: "metaKey",
  shift: "shiftKey",
};

const ALIASES = {
  add: "+",
  break: "pause",
  cmd: "meta",
  command: "meta",
  ctl: "control",
  ctrl: "control",
  del: "delete",
  down: "arrowdown",
  esc: "escape",
  ins: "insert",
  left: "arrowleft",
  mod: IS_MAC ? "meta" : "control",
  opt: "alt",
  option: "alt",
  return: "enter",
  right: "arrowright",
  space: " ",
  spacebar: " ",
  up: "arrowup",
  win: "meta",
  windows: "meta",
};

const CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  " ": 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ";": 186,
  "=": 187,
  ",": 188,
  "-": 189,
  ".": 190,
  "/": 191,
  "`": 192,
  "[": 219,
  "\\": 220,
  "]": 221,
  "'": 222,
};

for (var f = 1; f < 20; f++) {
  CODES["f" + f] = 111 + f;
}

// Order of key impacts order of getHotKeys
const MODIFIERS_HOTKEY = {
  metaKey: IS_MAC ? "mod" : "meta",
  ctrlKey: IS_MAC ? "ctrl" : "mod",
  altKey: "alt",
  shiftKey: "shift",
};

const KEYS_HOTKEY = {
  Shift: "shift",
  Alt: "alt",
  Control: IS_MAC ? "ctrl" : "mod",
  Meta: IS_MAC ? "mod" : "meta",
};

module.exports = {
  IS_MAC,
  MODIFIERS,
  ALIASES,
  CODES,
  MODIFIERS_HOTKEY,
  KEYS_HOTKEY
};
