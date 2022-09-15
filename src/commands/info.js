export default {
    name: 'info',
    description: 'show the information about current session',
    alias: ['-i', '--info'],
    other: [],
    max: 0,
    min: 0,

    async execute(client, args) {
        console.log('Developer Raffreddat0\n\nMongoDB URL: ' + client.url + '\nDatabase: ' + client.database + '\nCollection: ' + client.collection);
    }
}