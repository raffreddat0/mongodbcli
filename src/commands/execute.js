import jsonfy from 'jsonfy';

export default {
    name: 'execute',
    description: 'execute a command and print the result',
    alias: ['-e', '--execute'],
    other: [],
    max: 3,
    min: 2,

    async execute(client, args) {
        let program;
        try {
            jsonfy(args[2] || '{}')
        } catch (e) {
            args[2] = '{' + args[2] + '}';
        }
        try {
            jsonfy(args[3] || '{}')
        } catch (e) {
            args[3] = '{' + args[3] + '}';
        }
        try {
            const arg1 = jsonfy(args[2])
            const arg2 = jsonfy(args[3] || '{}')
            program = await client.db[args[1]](arg1, arg2);
        } catch (e) {
            return console.error('Error: ' + e.message);
        }

        console.log(typeof program.toArray === 'function' ? await program.toArray() : program);
    }
}