import fs from 'fs';

export default {
    name: 'database',
    description: 'switch the mongodb database',
    alias: ['-db', '--database'],
    other: ['-c', '--collection'],
    max: 1,
    min: 0,

    async execute(client, args) {
        let db = args[1];
        if (!db) db = client.database;
        if (!db) return console.error('Error: Provide a database name');

        if (db !== client.database) {
            fs.writeFileSync(client.path + '\\src\\handler\\' + client.dbFile, db);
        }

        console.log('Switched database to ' + db); 
    }
}