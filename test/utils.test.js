const utils = require("../lib/utils");

const { formatBytes, formatTime } = utils;

describe("Utils Module", () => {
  describe("formatBytes", () => {
    it("should format bytes correctly for small values", () => {
      expect(formatBytes(500)).toBe("500 B");
    });

    it("should format bytes correctly for kilobytes", () => {
      expect(formatBytes(1024)).toBe("1 KB");
    });

    it("should format bytes correctly for megabytes", () => {
      expect(formatBytes(1048576)).toBe("1 MB");
    });

    it("should return 0 B for 0 bytes", () => {
      expect(formatBytes(0)).toBe("0 B");
    });
  });

  describe("formatTime", () => {
    it("should format time correctly for seconds", () => {
      expect(formatTime(45)).toBe("45s");
    });

    it("should format time correctly for minutes and seconds", () => {
      expect(formatTime(125)).toBe("2m 5s");
    });

    it("should format time correctly for hours, minutes, and seconds", () => {
      expect(formatTime(3665)).toBe("1h 1m 5s");
    });

    it("should return 0s for 0 seconds", () => {
      expect(formatTime(0)).toBe("0s");
    });
  });
});
