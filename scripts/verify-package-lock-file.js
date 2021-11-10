/* eslint-disable @typescript-eslint/no-var-requires */
// verify-package-lock-file.js

// This script checks if lockfileVersion attribute in package-lock.json file
// is greater than 2

const fs = require("fs");

const packageLockPath = "./package-lock.json";

async function main() {
  if (fs.existsSync(packageLockPath)) {
    const data = fs.readFileSync(packageLockPath, "utf8");
    const packageLock = JSON.parse(data);
    if (packageLock.lockfileVersion >= 2) {
      console.log(
        "The package-lock.json is using a supported version.",
        packageLock.lockfileVersion
      );
    } else {
      console.log(
        "Error: The package-lock.json file is using an older version. Please install using npm 7 or greater to get the latest version.",
        packageLock.lockfileVersion
      );
      process.exit(1);
    }
  }
}

main();
