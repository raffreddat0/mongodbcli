import EventEmitter from 'node:events';
import { MongoClient } from 'mongodb'
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import Crypto from 'node-crypt'
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const crypto = new Crypto({
    key: 'b95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01',
    hmacKey: 'dcf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc'
});

export class Client extends EventEmitter {

    constructor(options = {}) {
        super();

        this.commands = [];
        this.db = null;
        this.url = options.url;
        this.path = options.path || __dirname + '\\..\\..\\';
        this.cacheFile = options.cacheFile || 'cache.log';
        this.dbFile = options.dbFile || 'database.log';
        this.cFile = options.cFile || 'collection.log';
        this.cache = fs.readFileSync(this.path + this.cacheFile, { encoding:'utf8' }).split('\n');
        this.database = fs.readFileSync(__dirname + '\\' + this.dbFile, { encoding:'utf8' }) || null;
        this.collection = fs.readFileSync(__dirname + '\\' + this.cFile, { encoding:'utf8' }) || null;
        
        const cache = [];
        if (this.cache[0] === '') this.cache.shift();
        for (let obj of this.cache) {
            obj = crypto.decrypt(obj);
            cache.push(obj);
        }

        this.cache = cache;
    }

    async connect(url = this.url, cached = true) {
        this.db = await MongoClient.connect(url);
        this.url = url;
        if (cached) {
            url = crypto.encrypt(url);
            this.cache.push(url);
            fs.writeFileSync(this.path + this.cacheFile, this.cache.join('\n'));
        }
        return this.db;
    }

    async load() {
        const files = fs.readdirSync(this.path + '\\src\\commands').filter(file => file.endsWith('.js'));
        for (const file of files) {
            const command = (await import(`../commands/${file}`)).default;
            this.commands.push(command);
        }
    }
}