export function pyramid(char, height) {
    let result = '';
    for (let i = 0; i < height; i++) {
      const spaces = ' '.repeat(height - i - 1);
      const chars = char.repeat(2 * i + 1);
      result += spaces + chars + '\n';
    }
    return result;
  }