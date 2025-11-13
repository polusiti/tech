const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.md': 'text/markdown'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // ディレクトリの場合はindex.htmlを探す
    if (filePath === './') {
        filePath = './index.html';
    } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}/`);
    console.log(`\n📂 Serving files from: ${process.cwd()}`);
    console.log(`\n✨ Available pages:`);
    console.log(`   - http://localhost:${PORT}/              (Windows 98 Desktop)`);
    console.log(`   - http://localhost:${PORT}/slee/         (VuePress Blog)`);
    console.log(`   - http://localhost:${PORT}/jin/          (Rain Room)`);
    console.log(`   - http://localhost:${PORT}/jikken/       (Live2D Lab)`);
    console.log(`   - http://localhost:${PORT}/rob/complete.html (Ark UI)`);
    console.log(`\n⏹️  Press Ctrl+C to stop the server\n`);
});
