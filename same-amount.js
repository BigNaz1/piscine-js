export function sameAmount(str, regex1, regex2) {
    const re1 = new RegExp(regex1, regex1.flags.includes('g') ? regex1.flags : regex1.flags + 'g');
    const re2 = new RegExp(regex2, regex2.flags.includes('g') ? regex2.flags : regex2.flags + 'g');
    
    const count1 = (str.match(re1) || []).length;
    const count2 = (str.match(re2) || []).length;
    
    return count1 === count2;
  }