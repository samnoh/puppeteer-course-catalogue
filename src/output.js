const fs = require('fs');

class Output {
    basePath = 'dist/';

    constructor(filepath, firstLine, lastLine, callback) {
        this.createDir(this.basePath);

        this.filepath = `${this.basePath}${filepath}`;
        this.logger = fs.createWriteStream(this.filepath, { flags: 'a' });
        this.firstLine = firstLine;
        this.lastLine = lastLine;
        this.callback = this.callback;

        this.logger.write(this.firstLine);
    }

    createDir(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    }

    remove() {
        fs.unlinkSync(this.filepath);
    }

    append(data) {
        try {
            this.logger.write(data);
        } catch (e) {
            console.error(e);
        }
    }

    rename(newFilepath) {
        try {
            fs.renameSync(`${this.filepath}`, `${this.basePath}${newFilepath}`);
        } catch (e) {
            console.error(e);
        }
    }

    close() {
        this.logger.write(this.lastLine);
        if (this.callback) this.callback();
        this.logger.end();
    }
}

module.exports = Output;
