# SysView Info API

SysView Info API is a lightweight Node.js application that provides system statistics through simple JSON routes. It allows you to access information about your system's CPU, memory, user, process, network, and operating system.

## Features

- Retrieve CPU information, including model, cores, architecture, and load average.
- Get memory statistics, including total, free, and usage percentage.
- Access user information.
- View process details, including memory usage, environment variables, process ID, and current working directory.
- Fetch network interface details.
- Obtain operating system information, such as platform, type, release, hostname, and uptime.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd system-view-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Open your browser or use a tool like `curl` or Postman to access the following routes:

   - `GET /` - Overview of the API and available routes.
   - `GET /cpu` - CPU information.
   - `GET /memory` - Memory statistics.
   - `GET /user` - User information.
   - `GET /process` - Process details, including memory usage, environment variables, process ID, and current working directory.
   - `GET /network` - Network interface details.
   - `GET /os` - Operating system information, including platform, type, release, hostname, and uptime.

3. The server runs on `http://localhost:3000` by default.

## Example

To fetch CPU information, you can use the following command:

```bash
curl http://localhost:3000/cpu
```

## Running Tests

To run the test suite, use the following command:

```bash
npm test
```

## License

This project is licensed under the MIT License.
