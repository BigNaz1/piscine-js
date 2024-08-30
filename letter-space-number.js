export function letterSpaceNumber(str) {
    const regex = /[a-zA-Z] \d(?!\d)(?![a-zA-Z])/g;
    return (str.match(regex) || []).filter(match => {
      const index = str.indexOf(match) + match.length;
      return index === str.length || !/[a-zA-Z0-9]/.test(str[index]);
    });
  }