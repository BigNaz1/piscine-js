import http from 'http';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const PORT = 5000;
const GUESTS_DIR = 'guests';

const AUTHORIZED_USERS = ['Caleb_Squires', 'Tyrique_Dalton', 'Rahima_Young'];
const PASSWORD = 'abracadabra';

function authenticate(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();
    const [username, password] = decodedCredentials.split(':');

    return AUTHORIZED_USERS.includes(username) && password === PASSWORD;
}

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (!authenticate(req)) {
        res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Restricted Area"' });
        res.end(JSON.stringify({ error: 'Authorization Required' }));
        return;
    }

    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const guestName = req.url.slice(1);
                const guestFile = join(GUESTS_DIR, `${guestName}.json`);

                await writeFile(guestFile, body);

                res.writeHead(200);
                res.end(body);
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'server failed' }));
            }
        });
    } else {
        res.writeHead(405);
        res.end(JSON.stringify({ error: 'method not allowed' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});