export const escapeStr = "`\\/\"'";
export const arr = Object.freeze([4, '2']);
export const obj = Object.freeze({
  str: 'Hello',
  num: 420,
  bool: true,
  undef: undefined
});

export const nested = Object.freeze({
  arr: Object.freeze([4, undefined, '2']),
  obj: Object.freeze({
    str: 'Nested string',
    num: 23,
    bool: false
  })
});