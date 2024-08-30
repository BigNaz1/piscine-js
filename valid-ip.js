export function findIP(str) {
    const ipRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(?::\d{1,5})?\b/g;
    
    const validIPs = str.match(ipRegex) || [];
    
    return validIPs.filter(ip => {
        const [address, port] = ip.split(':');
        const octets = address.split('.');

        if (octets.some(octet => octet.length > 1 && octet.startsWith('0'))) {
            return false;
        }

        if (port) {
            const portNumber = parseInt(port, 10);
            if (portNumber > 65535 || port.startsWith('0') || portNumber < 1) {
                return false;
            }
        }

        return true;
    });
}