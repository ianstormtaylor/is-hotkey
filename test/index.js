
const isHotkey = require('..').default
const assert = require('assert')

/**
 * Tests.
 */

describe('is-hotkey', () => {

  it('matches one modifier', () => {
    const value = isHotkey('Meta+S', {
      key: 'S',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    })

    assert.equal(value, true)
  })

  it('matches two modifiers', () => {
    const value = isHotkey('Meta+Alt+S', {
      key: 'S',
      altKey: true,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    })

    assert.equal(value, true)
  })

  it('matches lowercase', () => {
    const value = isHotkey('meta+s', {
      key: 'S',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    })

    assert.equal(value, true)
  })

  it('matches modifier convenience aliases', () => {
    const value = isHotkey('cmd+s', {
      key: 'S',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    })

    assert.equal(value, true)
  })

  it('matches key convenience aliases', () => {
    const value = isHotkey('cmd+space', {
      key: ' ',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    })

    assert.equal(value, true)
  })

  it('matches "add" key', () => {
    const value = isHotkey('cmd++', {
      key: '+',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    })

    assert.equal(value, true)
  })

  it('matches "mod" key', () => {
    const value = isHotkey('mod+s', {
      key: 'S',
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
    })

    assert.equal(value, true)
  })

  it('matches individual modifiers', () => {
    const value = isHotkey('shift', {
      key: 'Shift',
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: true,
    })

    assert.equal(value, true)
  })

  it('matches individual keys', () => {
    const value = isHotkey('a', {
      key: 'a',
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
    })

    assert.equal(value, true)
  })

  it('matches individual keys, ignoring modifiers', () => {
    const value = isHotkey('a', {
      key: 'A',
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: true,
    })

    assert.equal(value, true)
  })

  it('does not match extra modifiers', () => {
    const value = isHotkey('cmd+s', {
      key: 'S',
      altKey: true,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    })

    assert.equal(value, false)
  })

  it('can be curried', () => {
    const curried = isHotkey('cmd+s')
    const value = curried({
      key: 'S',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    })

    assert.equal(value, true)
  })

})
