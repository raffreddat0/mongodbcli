import fs from 'fs';

export default {
    name: 'collection',
    description: 'switch mongodb collection',
    alias: ['-c', '--collection'],
    other: ['-db', '--database'],
    max: 1,
    min: 0,

    async execute(client, args) {
        let c = args[1];
        if (!c) c = client.collection;
        if (!c) return console.error('Error: Provide a collection name');

        if (c !== client.collection) {
            fs.writeFileSync(client.path + '\\src\\handler\\' + client.cFile, c);
        }

        console.log('Switched collection to ' + c); 
    }
}