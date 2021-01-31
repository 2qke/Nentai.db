'use strict';

const {ensureFileSync, writeJSONSync} = require("fs-extra");
const {existsSync} = require("fs");

class File {
    constructor(file){
        if(!file.endsWith(".json")) throw new TypeError("Database file must be JSON.");
        this.file = file;
    };
    ensure(){
         return existsSync(`${process.cwd()}/${this.file}`) ? false : ensureFileSync(`${process.cwd()}/${this.file}`) | writeJSONSync(`${process.cwd()}/${this.file}`, {});
    };
    get path(){
        return process.cwd() + '/' + this.file;
    };
};

module.exports = File;
