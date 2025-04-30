const fetchOsData = require("../lib/fetchOsData");
const os = require("os");
const process = require("process");

jest.mock("os");
jest.mock("process", () => ({
  memoryUsage: jest.fn(),
  env: {
    NODE_ENV: "test",
  },
  uptime: jest.fn(),
  cwd: jest.fn(),
  title: "node",
  version: "v16.0.0",
}));

describe("fetchOsData Module", () => {
  describe("getCpuInfo", () => {
    it("should return mocked CPU information", () => {
      os.cpus.mockReturnValue([
        { model: "Intel(R) Core(TM) i7", speed: 2800 },
        { model: "Intel(R) Core(TM) i7", speed: 2800 },
      ]);
      os.arch.mockReturnValue("x64");
      os.loadavg.mockReturnValue([0.5, 0.6, 0.7]);

      const cpuInfo = fetchOsData.getCpuInfo();
      expect(cpuInfo).toEqual({
        model: "Intel(R) Core(TM) i7",
        cores: 2,
        architecture: "x64",
        loadAvg: [0.5, 0.6, 0.7],
      });
    });
  });

  describe("getMemoryInfo", () => {
    it("should return mocked memory information", () => {
      os.totalmem.mockReturnValue(16 * 1024 * 1024 * 1024); // 16 GB
      os.freemem.mockReturnValue(8 * 1024 * 1024 * 1024); // 8 GB

      const memoryInfo = fetchOsData.getMemoryInfo();
      expect(memoryInfo).toEqual({
        total: "16 GB",
        free: "8 GB",
        usage: "50%",
      });
    });
  });

  describe("getOsInfo", () => {
    it("should return mocked OS information", () => {
      os.platform.mockReturnValue("win32");
      os.type.mockReturnValue("Windows_NT");
      os.release.mockReturnValue("10.0.19042");
      os.uptime.mockReturnValue(3600); // 1 hour

      const osInfo = fetchOsData.getOsInfo();
      expect(osInfo).toEqual({
        platform: "win32",
        type: "Windows_NT",
        release: "10.0.19042",
        uptime: "1h 0s",
      });
    });
  });

  describe("getUserInfo", () => {
    it("should return mocked user information", () => {
      os.userInfo.mockReturnValue({
        username: "testuser",
        homedir: "/home/testuser",
      });

      const userInfo = fetchOsData.getUserInfo();
      expect(userInfo).toEqual({
        username: "testuser",
        homedir: "/home/testuser",
      });
    });
  });

  describe("getProcessInfo", () => {
    it("should return mocked process information", () => {
      process.memoryUsage.mockReturnValue({
        rss: 1024 * 1024 * 50, // 50 MB
        heapTotal: 1024 * 1024 * 30, // 30 MB
        heapUsed: 1024 * 1024 * 20, // 20 MB
        external: 1024 * 1024 * 10, // 10 MB
      });
      process.uptime.mockReturnValue(3600); // 1 hour
      process.pid = 12345;
      process.cwd = jest.fn(() => "C:/Users/xagat/Desktop/ck/system-view-api");

      const processInfo = fetchOsData.getProcessInfo();
      expect(processInfo).toEqual({
        memoryUsage: {
          rss: "50 MB",
          heapTotal: "30 MB",
          heapUsed: "20 MB",
          external: "10 MB",
        },
        env: { NODE_ENV: "test" },
        uptime: "1h 0s",
        title: "node",
        nodeVersion: "v16.0.0",
        pid: 12345,
        cwd: "C:/Users/xagat/Desktop/ck/system-view-api",
      });
    });
  });

  describe("getNetworkInfo", () => {
    it("should return mocked network information", () => {
      os.networkInterfaces.mockReturnValue({
        eth0: [{ address: "192.168.1.1", family: "IPv4", internal: false }],
      });

      const networkInfo = fetchOsData.getNetworkInfo();
      expect(networkInfo).toEqual({
        eth0: [{ address: "192.168.1.1", family: "IPv4", internal: false }],
      });
    });
  });
});
