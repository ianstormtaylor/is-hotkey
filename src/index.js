const {
  MODIFIERS,
  ALIASES,
  CODES,
  MODIFIERS_HOTKEY,
  KEYS_HOTKEY
} = require('./constants')

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options
    options = null
  }

  if (!Array.isArray(hotkey)) {
    hotkey = [hotkey]
  }

  const array = hotkey.map(string => parseHotkey(string, options))
  const check = e => array.some(object => compareHotkey(object, e))
  const ret = event == null ? check : check(event)
  return ret
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event)
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event)
}

/**
 * Get hotkey
 */

function getHotkeyName(event) {
  const eventHotKey = { key: event.key };
  for(const key in MODIFIERS) {
    const eventModifier = MODIFIERS[key];
    eventHotKey[eventModifier] = event[eventModifier];
  }

  return toHotkeyName(eventHotKey);
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  const byKey = options && options.byKey
  const ret = {}

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add')
  const values = hotkey.split('+')
  const { length } = values

  // Ensure that all the modifiers are set to false unless the hotkey has them.
  for (const k in MODIFIERS) {
    ret[MODIFIERS[k]] = false
  }

  for (let value of values) {
    const optional = value.endsWith('?') && value.length > 1;

    if (optional) {
      value = value.slice(0, -1)
    }

    const name = toKeyName(value)
    const modifier = MODIFIERS[name]

    if (value.length > 1 && !modifier && !ALIASES[value] && !CODES[name]) {
      throw new TypeError(`Unknown modifier: "${value}"`)
    }

    if (length === 1 || !modifier) {
      if (byKey) {
        ret.key = name
      } else {
        ret.which = toKeyCode(value)
      }
    }

    if (modifier) {
      ret[modifier] = optional ? null : true
    }
  }

  return ret
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (const key in object) {
    const expected = object[key]
    let actual

    if (expected == null) {
      continue
    }

    if (key === 'key' && event.key != null) {
      actual = event.key.toLowerCase()
    } else if (key === 'which') {
      actual = expected === 91 && event.which === 93 ? 91 : event.which
    } else {
      actual = event[key]
    }

    if (actual == null && expected === false) {
      continue
    }

    if (actual !== expected) {
      return false
    }
  }

  return true
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name)
  const code = CODES[name] || name.toUpperCase().charCodeAt(0)
  return code
}

function toKeyName(name) {
  name = name.toLowerCase()
  name = ALIASES[name] || name
  return name
}

function toHotkeyName(hotkey) {
  const name = [];
  for(const modifier in MODIFIERS_HOTKEY) {
    if (hotkey[modifier]) {
      name.push(MODIFIERS_HOTKEY[modifier]) 
    }
  }

  if(!name.includes(KEYS_HOTKEY[hotkey.key])) {
    name.push(hotkey.key)
  }

  return name.join('+')
}
/**
 * Export.
 */

export default isHotkey

export {
  isHotkey,
  isCodeHotkey,
  isKeyHotkey,
  parseHotkey,
  compareHotkey,
  toKeyCode,
  toKeyName,
  getHotkeyName,
  toHotkeyName
}
