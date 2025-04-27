const http = require('http');
const os = require('os');
const process = require('process');
const url = require('url');

function formatBytes(bytes, decimal=2){
    if(bytes===0) return '0 bytes';

    // set base unit
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes)/Math.log(k));

    return parseFloat((bytes/Math.pow(k, i))).toFixed(decimal) + ' ' + sizes[i];
}

function formatTime(seconds) {
    const days = Math.floor(seconds/(3600*24));
    const hours = Math.floor((seconds % (3600 * 24))/3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor((seconds % 60));

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`
}

function getCpuInfo() {
    const cpus = os.cpus();
    const architecture = os.arch();
    const loadAvg = os.loadavg();

    const model = cpus[0].model;
    const cores = cpus.length;

    return {
        model, cores, architecture, loadAvg
    };
}

function getMemoryInfo() {
    const total = os.totalmem();
    const free = os.freemem();
    const usage = ((total-free)/total*100).toFixed();

    const formatedTotal = formatBytes(os.totalmem());
    const formatedFree = formatBytes(os.freemem());
    
    return {
        total: formatedTotal,
        free: formatedFree,
        usage
    };
}

function getOsInfo() {
    const platform = os.platform();
    const type = os.type();
    const release = os.release();
    const hostname = os.hostname();
    const uptime = formatTime(os.uptime());

    return {platform, type, release, hostname, uptime}
}

function getUserInfo() {
    const user = os.userInfo();
    return user;
}

function getNetworkInfo() {
    const network = os.networkInterfaces();
    return network;
}

function getProcessInfo() {
    const pid = process.pid;
    const title = process.title;
    const nodeVersion = process.version;
    const uptime = formatTime(process.uptime());

    const memUsage = process.memoryUsage();

    return {
        pid, title, nodeVersion, uptime,
        memoryUsage: {
            rss: formatBytes(memUsage.rss),
            heapTotal: formatBytes(memUsage.heapTotal),
            heapUsed: formatBytes(memUsage.heapUsed),
            external: formatBytes(memUsage.external),
        },
        env: {
            NODE_ENV: process.env.NODE_ENV || 'No Set'
        },
        cwd: process.cwd(),
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    res.setHeader('Content-Type', 'application/json');

    if(parsedUrl.pathname === '/'){
        res.statusCode = 200;
        res.end(JSON.stringify({
            name: 'SysView Info API',
            description: 'Access system stats via simple JSON Routes',
            routes: ["/cpu", "/memory", "/user", "/process", "/network", '/os'],
        }))
    }
    else if(parsedUrl.pathname === '/cpu') {
        res.statusCode = 200;
        res.end(JSON.stringify(getCpuInfo(), null, 2));
    } else if (parsedUrl.pathname === '/memory') {
        res.statusCode = 200;
        res.end(JSON.stringify(getMemoryInfo(), null, 2));
    } else if (parsedUrl.pathname === '/user') {
        res.statusCode = 200;
        res.end(JSON.stringify(getUserInfo(), null, 2));
    } else if (parsedUrl.pathname === '/process') {
        res.statusCode = 200;
        res.end(JSON.stringify(getProcessInfo(), null, 2));
    } else if (parsedUrl.pathname === '/network') {
        res.statusCode = 200;
        res.end(JSON.stringify(getNetworkInfo(), null, 2));
    } else if (parsedUrl.pathname === '/os') {
        res.statusCode = 200;
        res.end(JSON.stringify(getOsInfo(), null, 2));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Route not found.' }));
    }
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`SysView is running at http://localhost:${port}`);
})