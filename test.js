const {NentaManager, File} = require("./server.js");

const file = new File("db/Documents.json");
file.ensure();

const db = new NentaManager(file.path);

db.updateDatabase("db/Nenta.db.json");

db.create({data: "Settings", value: {
    id: 259,
    name: "Nentaii-sample"
}});

db.create({data: "test_num", value: 99});

db.add({data: "test_num", value: 1});
db.create({data: "Lang", value: []});
db.push({data: "Lang", value: "TR"});
db.push({data: "Lang", value: "EN"});
console.log(db.get({data: "Settings"}));
console.log(db.has({data: "Settings"}));
