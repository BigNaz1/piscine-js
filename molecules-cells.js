const DNA_TO_RNA = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  };
  
  const RNA_TO_DNA = {
    'C': 'G',
    'G': 'C',
    'A': 'T',
    'U': 'A'
  };
  
  export function RNA(dna) {
    return dna.replace(/[GCTA]/g, match => DNA_TO_RNA[match]);
  }
  
  export function DNA(rna) {
    return rna.replace(/[CGAU]/g, match => RNA_TO_DNA[match]);
  }