import fs from 'fs';

class Output {
    constructor(filepath, firstLine, lastLine) {
        this.basePath = 'dist/';
        this.filepath = `${this.basePath}${filepath}`;
        this.createDir();
        this.logger = fs.createWriteStream(this.filepath, { flags: 'a' });
        this.firstLine = firstLine;
        this.lastLine = lastLine;
        this.logger.write(this.firstLine);
    }

    createDir() {
        if (!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath);
        }
    }

    remove() {
        fs.unlinkSync(this.filepath);
    }

    append(data) {
        try {
            this.logger.write(data);
        } catch (e) {
            console.log(e);
        }
    }

    rename(newFilepath) {
        try {
            fs.renameSync(`${this.filepath}`, `${this.basePath}${newFilepath}`);
        } catch (e) {
            console.log(e);
        }
    }

    close() {
        this.logger.write(this.lastLine);
        this.logger.end();
    }
}

export default Output;
