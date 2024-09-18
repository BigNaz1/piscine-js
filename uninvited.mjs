import http from 'http';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const PORT = 5000;
const GUESTS_DIR = 'guests';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

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

                res.writeHead(201);
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