
const isHotkey = require('..').default
const assert = require('assert')

/**
 * Utils
 */

function e(value, ...modifiers) {
  return {
    which: typeof value == 'number' ? value : null,
    key: typeof value == 'string' ? value : null,
    altKey: modifiers.includes('alt'),
    ctrlKey: modifiers.includes('ctrl'),
    metaKey: modifiers.includes('meta'),
    shiftKey: modifiers.includes('shift'),
  }
}

/**
 * Tests.
 */

describe('is-hotkey', () => {

  describe('byCode', () => {
    it('matches one modifier', () => {
      const event = e(83, 'meta')
      const value = isHotkey('Meta+S', event)
      assert.equal(value, true)
    })

    it('matches two modifiers', () => {
      const event = e(83, 'alt', 'meta')
      const value = isHotkey('Meta+Alt+s', event)
      assert.equal(value, true)
    })

    it('matches lowercase', () => {
      const event = e(83, 'meta')
      const value = isHotkey('meta+s', event)
      assert.equal(value, true)
    })

    it('matches modifier convenience aliases', () => {
      const event = e(83, 'meta')
      const value = isHotkey('cmd+s', event)
      assert.equal(value, true)
    })

    it('matches key convenience aliases', () => {
      const event = e(32, 'meta')
      const value = isHotkey('cmd+space', event)
      assert.equal(value, true)
    })

    it('matches "add" key', () => {
      const event = e(187, 'meta')
      const value = isHotkey('cmd+=', event)
      assert.equal(value, true)
    })

    it('matches "mod" key', () => {
      const event = e(83, 'ctrl')
      const value = isHotkey('mod+s', event)
      assert.equal(value, true)
    })

    it('matches individual modifiers', () => {
      const event = e(16, 'shift')
      const value = isHotkey('shift', event)
      assert.equal(value, true)
    })

    it('matches right meta key', () => {
      const event = e(93, 'meta')
      const value = isHotkey('meta', event)
      assert.equal(value, true)
    })

    it('matches individual keys', () => {
      const event = e(65)
      const value = isHotkey('a', event)
      assert.equal(value, true)
    })

    it('does not match extra modifiers', () => {
      const event = e(83, 'alt', 'meta')
      const value = isHotkey('cmd+s', event)
      assert.equal(value, false)
    })

    it('does not match extra modifiers with individual keys', () => {
      const event = e('a', 'ctrl')
      const value = isHotkey('a', event)
      assert.equal(value, false)
    })

    it('matches optional modifiers', () => {
      const event = e(83, 'alt', 'meta')
      const value = isHotkey('cmd+alt?+s', event)
      assert.equal(value, true)
    })

    it('matches missing optional modifiers', () => {
      const event = e(83, 'meta')
      const value = isHotkey('cmd+alt?+s', event)
      assert.equal(value, true)
    })

    it("matches question mark key", () => {
      const event = e("?");
      const value = isHotkey("?", { byKey: true }, event);
      assert.equal(value, true);
    });

    it('can be curried', () => {
      const event = e(83, 'meta')
      const curried = isHotkey('cmd+s')
      const value = curried(event)
      assert.equal(value, true)
    })

    it('matches mocked event', () => {
      const event = { which: 13 }
      const value = isHotkey('enter', event)
      assert.equal(value, true)
    })

    it('matches multiple hotkeys', () => {
      const check = isHotkey(['meta+a', 'meta+s'])
      const a = check(e(65, 'meta'))
      const s = check(e(83, 'meta'))
      assert.equal(a, true)
      assert.equal(s, true)
    })

    it('fails on non-modifier keys', () => {
      assert.throws(
        () => {
          isHotkey('ctrlalt+k')
        },
        (err) => err instanceof TypeError && err.message === 'Unknown modifier: "ctrlalt"'
      )
    })
  })

  describe('byKey', () => {
    it('matches one modifier', () => {
      const event = e('s', 'meta')
      const value = isHotkey('Meta+S', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches two modifiers', () => {
      const event = e('ß', 'alt', 'meta')
      const value = isHotkey('Meta+Alt+ß', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches lowercase', () => {
      const event = e('s', 'meta')
      const value = isHotkey('meta+s', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches modifier convenience aliases', () => {
      const event = e('s', 'meta')
      const value = isHotkey('cmd+s', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches key convenience aliases', () => {
      const event = e(' ', 'meta')
      const value = isHotkey('cmd+space', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches "add" key', () => {
      const event = e('+', 'meta')
      const value = isHotkey('cmd++', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches "mod" key', () => {
      const event = e('s', 'ctrl')
      const value = isHotkey('mod+s', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches individual modifiers', () => {
      const event = e('Shift', 'shift')
      const value = isHotkey('shift', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches individual keys', () => {
      const event = e('a')
      const value = isHotkey('a', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('does not match extra modifiers', () => {
      const event = e('s', 'alt', 'meta')
      const value = isHotkey('cmd+s', { byKey: true }, event)
      assert.equal(value, false)
    })

    it('does not match extra modifiers with individual keys', () => {
      const event = e('a', 'ctrl')
      const value = isHotkey('a', { byKey: true }, event)
      assert.equal(value, false)
    })

    it('matches optional modifiers', () => {
      const event = e('s', 'alt', 'meta')
      const value = isHotkey('cmd+alt?+s', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches missing optional modifiers', () => {
      const event = e('s', 'meta')
      const value = isHotkey('cmd+alt?+s', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('can be curried', () => {
      const event = e('s', 'meta')
      const curried = isHotkey('cmd+s', { byKey: true })
      const value = curried(event)
      assert.equal(value, true)
    })

    it('matches mocked event', () => {
      const event = { key: 'Enter' }
      const value = isHotkey('enter', { byKey: true }, event)
      assert.equal(value, true)
    })

    it('matches multiple hotkeys', () => {
      const check = isHotkey(['meta+a', 'meta+s'], { byKey: true })
      const a = check(e('a', 'meta'))
      const s = check(e('s', 'meta'))
      assert.equal(a, true)
      assert.equal(s, true)
    })

    it('fails on non-modifier keys', () => {
      const event = e('k', 'ctrl', 'alt')
      assert.throws(
        () => {
          isHotkey('ctrlalt+k', { byKey: true }, event)
        },
        (err) => err instanceof TypeError && err.message === 'Unknown modifier: "ctrlalt"'
      )
    })
  })

})

describe('getHotkeyName', () => {
  
})