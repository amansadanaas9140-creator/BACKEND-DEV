import fs from 'fs';
import os from 'os';

function getFileDetails() {
    try {
        fs.writeFileSync('filedetails.txt', `Operating System: ${os.type()}\nCPU Architecture: ${os.arch()}\nTotal Memory: ${os.totalmem()} bytes\nFree Memory: ${os.freemem()} bytes\nHome Directory: ${os.homedir()}`);
    }

    catch (err) {
        console.error('Error writing to file:', err);
    }
}

setInterval(() => {getFileDetails()}, 5000);

export default getFileDetails;