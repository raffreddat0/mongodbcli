import json from '../../package.json' assert { type: "json" };

export default {
    name: 'version',
    description: 'print mongodb-cli version',
    alias: ['-v', '--version'],
    other: [],
    max: 0,
    min: 0,

    async execute(client, args) {
        console.log('v' + json.version);
    }
}