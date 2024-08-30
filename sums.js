function sums(n) {
    if (n <= 1) return [];
    
    const partitions = [];
    
    function generatePartitions(remaining, current = [], start = 1) {
        if (remaining === 0) {
            if (current.length > 1) {
                partitions.push([...current]);
            }
            return;
        }
        
        for (let i = start; i <= remaining; i++) {
            current.push(i);
            generatePartitions(remaining - i, current, i);
            current.pop();
        }
    }
    
    generatePartitions(n);
    return partitions;
}