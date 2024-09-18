import http from 'http';
import { readFile } from 'fs/promises';
import { join } from 'path';

const HOST = 'localhost';
const PORT = 5000;
const GUESTS_DIR = 'guests';

const ERROR_MESSAGES = {
    NOT_FOUND: 'guest not found',
    SERVER_ERROR: 'server failed'
};

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const guestName = req.url.slice(1);
    const guestFile = join(GUESTS_DIR, `${guestName}.json`);

    try {
        const data = await readFile(guestFile, 'utf8');
        res.writeHead(200);
        res.end(data);
    } catch (err) {
        const isNotFound = err.code === 'ENOENT';
        const statusCode = isNotFound ? 404 : 500;
        const errorMsg = isNotFound ? ERROR_MESSAGES.NOT_FOUND : ERROR_MESSAGES.SERVER_ERROR;

        res.writeHead(statusCode);
        res.end(JSON.stringify({ error: errorMsg }));
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});