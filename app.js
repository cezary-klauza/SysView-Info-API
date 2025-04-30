const http = require("http");
const url = require("url");
const fetchOsData = require("./lib/fetchOsData");

const {
  getCpuInfo,
  getMemoryInfo,
  getNetworkInfo,
  getOsInfo,
  getProcessInfo,
  getUserInfo,
} = fetchOsData;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  res.setHeader("Content-Type", "application/json");

  if (parsedUrl.pathname === "/") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        name: "SysView Info API",
        description: "Access system stats via simple JSON Routes",
        routes: ["/cpu", "/memory", "/user", "/process", "/network", "/os"],
      })
    );
  } else if (parsedUrl.pathname === "/cpu") {
    res.statusCode = 200;
    res.end(JSON.stringify(getCpuInfo(), null, 2));
  } else if (parsedUrl.pathname === "/memory") {
    res.statusCode = 200;
    res.end(JSON.stringify(getMemoryInfo(), null, 2));
  } else if (parsedUrl.pathname === "/user") {
    res.statusCode = 200;
    res.end(JSON.stringify(getUserInfo(), null, 2));
  } else if (parsedUrl.pathname === "/process") {
    res.statusCode = 200;
    res.end(JSON.stringify(getProcessInfo(), null, 2));
  } else if (parsedUrl.pathname === "/network") {
    res.statusCode = 200;
    res.end(JSON.stringify(getNetworkInfo(), null, 2));
  } else if (parsedUrl.pathname === "/os") {
    res.statusCode = 200;
    res.end(JSON.stringify(getOsInfo(), null, 2));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found." }));
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`SysView is running at http://localhost:${port}`);
});
