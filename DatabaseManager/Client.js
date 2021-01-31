'use strict';

const File = require("./File.js");

const {readFileSync, writeFileSync, existsSync} = require("fs");
const {ensureFileSync, writeJSONSync} = require("fs-extra");

const read = (file) => JSON.parse(readFileSync(file, "utf8"));
const write = (file, data) => writeFileSync(file, JSON.stringify(data, null, 2));

class Database {
    constructor(file){
        if(!file instanceof File) throw new TypeError("Database file must be use 'File' class.");
        this.file = file;
    };
    updateDatabase(file){
        if(!file instanceof File) throw new TypeError("Database file must be use 'File' class.");
        if(!file.endsWith(".json")) throw new TypeError("Database file must be JSON.");
        this.file = file;
        return existsSync(`${process.cwd()}/${this.file}`) ? false : ensureFileSync(`${process.cwd()}/${this.file}`) | writeJSONSync(`${process.cwd()}/${this.file}`, {});
    };
    create(options){
        options = Object.assign({data: null, value: null}, options);
        if(options.data == null) throw new TypeError("Data must be entered.");
        if(options.value == null) throw new TypeError("Value must be entered.");
        const readfile = read(this.file);
        readfile[options.data] = options.value;
        write(this.file, readfile);
    };
    add(options){
        options = Object.assign({data: null, value: null}, options);
        if(options.data == null) throw new TypeError("Data must be entered.");
        if(options.value == null) throw new TypeError("Value must be entered.");
        if(isNaN(options.value)) throw new TypeError("Value must be number.");
        const readfile = read(this.file);
        if(!readfile[options.data]) throw new TypeError("Data must be exist.");
        if(isNaN(readfile[options.data])) throw new TypeError("Data must be number.");
        readfile[options.data] += options.value;  
        write(this.file, readfile);    
    };
    delete(options){
        options = Object.assign({data: null}, options);
        if(options.data == null) throw new TypeError("Data must be entered.");
        const readfile = read(this.file);
        delete readfile[options.data];
        write(this.file, readfile);
    };
    get(options){
        options = Object.assign({data: null}, options);
        if(options.data == null) throw new TypeError("Data must be entered.");
        const readfile = read(this.file);
        return readfile[options.data] ? readfile[options.data] : null;
    };
    has(options){
        options = Object.assign({data: null}, options);
        if(options.data == null) throw new TypeError("Data must be entered.");
        const readfile = read(this.file);
        return readfile[options.data] ? true : false;
    };
    push(options){
        options = Object.assign({data: null, value: null}, options);
        if(options.data == null) throw new TypeError("Data must be entered.");
        if(options.value == null) throw new TypeError("Value must be entered.");
        const readfile = read(this.file);
        if(!Array.isArray(readfile[options.data])) throw new TypeError("Data must be array.");
        readfile[options.data].push(options.value);
        write(this.file, readfile);      
    };
};

module.exports = Database;
