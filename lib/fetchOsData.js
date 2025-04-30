const os = require("os");
const process = require("process");
const utils = require("./utils");

const { formatBytes, formatTime } = utils;

function getCpuInfo() {
  const cpus = os.cpus();
  const architecture = os.arch();
  const loadAvg = os.loadavg();

  const model = cpus[0].model;
  const cores = cpus.length;

  return {
    model,
    cores,
    architecture,
    loadAvg,
  };
}

function getMemoryInfo() {
  const total = os.totalmem();
  const free = os.freemem();
  const usage = (((total - free) / total) * 100).toFixed() + "%";

  const formatedTotal = formatBytes(os.totalmem());
  const formatedFree = formatBytes(os.freemem());

  return {
    total: formatedTotal,
    free: formatedFree,
    usage,
  };
}

function getOsInfo() {
  const platform = os.platform();
  const type = os.type();
  const release = os.release();
  const hostname = os.hostname();
  const uptime = formatTime(os.uptime());

  return { platform, type, release, hostname, uptime };
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
    pid,
    title,
    nodeVersion,
    uptime,
    memoryUsage: {
      rss: formatBytes(memUsage.rss),
      heapTotal: formatBytes(memUsage.heapTotal),
      heapUsed: formatBytes(memUsage.heapUsed),
      external: formatBytes(memUsage.external),
    },
    env: {
      NODE_ENV: process.env.NODE_ENV || "No Set",
    },
    cwd: process.cwd(),
  };
}

module.exports = {
  getCpuInfo,
  getMemoryInfo,
  getNetworkInfo,
  getOsInfo,
  getProcessInfo,
  getUserInfo,
};
