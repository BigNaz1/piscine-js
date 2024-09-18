import http from 'http';
import { readFile } from 'fs/promises';
import { join } from 'path';

const PORT = 5000;

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
        const guestName = req.url.slice(1); // Remove leading '/'
        const filePath = join(process.cwd(), `${guestName}.json`);
        
        try {
            const data = await readFile(filePath, 'utf8');
            res.statusCode = 200;
            res.end(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'guest not found' }));
            } else {
                throw error; // Re-throw if it's not a 'file not found' error
            }
        }
    } catch (error) {
        console.error('Server error:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'server failed' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});