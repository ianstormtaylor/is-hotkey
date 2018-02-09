declare module "is-hotkey" {
  interface HotKeyOptions {
    byKey: boolean;
  }

  interface HotKey {
    which?: number;
    key?: string;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
  }

  type HotKeyReturn = boolean | ((e: KeyboardEvent) => boolean);

  /**
   * Is hotkey?
   */
  function isHotkey(hotkey: string, event: KeyboardEvent): HotKeyReturn;
  function isHotkey(hotkey: string, options: HotKeyOptions | null, event: KeyboardEvent): HotKeyReturn;
  function isCodeHotkey(hotkey: string, event: KeyboardEvent): HotKeyReturn;
  function isKeyHotkey(hotkey: string, event: KeyboardEvent): HotKeyReturn;

  /**
   * Parse.
   */
  function parseHotkey(hotkey: string, options: HotKeyOptions): HotKey;

  /**
   * Compare.
   */
  function compareHotkey(object: HotKeyOptions, event: KeyboardEvent): boolean;

  /**
   * Utils.
   */
  function toKeyCode(name: string): number;
  function toKeyName(name: string): string;

  /**
   * Export.
   */
  export default isHotkey;

  export {
    isHotkey,
    isCodeHotkey,
    isKeyHotkey,
    parseHotkey,
    compareHotkey,
    toKeyCode,
    toKeyName
  };
}
