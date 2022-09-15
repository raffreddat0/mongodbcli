export default {
    name: 'connect',
    description: 'connect to mongodb',
    alias: ['connect', '--connect'],
    max: 1,
    min: 0,

    async execute(client, args) {
        let url = args[1];
        if (!url) url = client.cache[client.cache.length - 1];
        if (!url) return console.error('Error: Provide a url');

        try {
            await client.connect(url, url !== client.cache[client.cache.length - 1]);
        } catch(e) {
            return console.error('Error: Provide a valid url');
        }

        console.log('Connected to ' + url);
    }
}