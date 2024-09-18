import http from 'http';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const HOST = 'localhost';
const PORT = 5000;
const GUESTS_DIR = 'guests';
const BEST_FRIENDS = ['Caleb_Squires', 'Tyrique_Dalton', 'Rahima_Young'];
const PASSWORD = 'abracadabra';

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'POST') {
        res.writeHead(405);
        return res.end(JSON.stringify({ error: 'Method not allowed' }));
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.writeHead(401);
        return res.end(JSON.stringify({ error: 'No credentials found' }));
    }

    const [username, pwd] = Buffer.from(authHeader.slice(6), 'base64').toString().split(':');
    if (!BEST_FRIENDS.includes(username) || pwd !== PASSWORD) {
        res.writeHead(401);
        return res.end(JSON.stringify({ error: 'Authorization Required' }));
    }

    let body = req.headers['body'];
    if (!body) {
        body = await new Promise(resolve => {
            let data = '';
            req.on('data', chunk => data += chunk);
            req.on('end', () => resolve(data));
        });
    }

    try {
        const guestFile = join(GUESTS_DIR, `${req.url.slice(1)}.json`);
        await writeFile(guestFile, body);
        res.writeHead(200);
        res.end(body);
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Server failed' }));
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});