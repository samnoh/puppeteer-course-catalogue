const fs = require('fs');

class Output {
    constructor(filepath) {
        this.filepath = filepath;
        this.logger = fs.createWriteStream(filepath, { flags: 'a' });
    }

    static build(filepath) {
        return new Output(filepath);
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

    close() {
        this.logger.end();
    }
}

module.exports = Output;
