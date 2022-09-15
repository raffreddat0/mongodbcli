import columnify from 'columnify'

export default {
    name: 'help',
    description: 'print mongodb command line options (currently set)',
    alias: ['-h', '--help'],
    other: [],
    max: 0,
    min: 0,

    async execute(client, args) {
        const data = {
            'Options:': ''
        };
        await client.commands.forEach(command => {
            data[command.alias.join(', ')] = command.description;
        });
        console.log('Usage [options] [arguments]\n' + columnify(data, { columns: ['\n', ' '] }));
    }
}