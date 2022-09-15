import { Client } from './handler/client.js';

export async function start() {

    const client = new Client();
    const args = [];
    await client.load();

    if (client.cache.length > 0) {
        await client.connect(client.cache[client.cache.length - 1], false);
    }
    if (client.db) {
        if (client.database) {
            client.db = await client.db.db(client.database);
        }
        if (client.collection) {
            client.db = await client.db.collection(client.collection);
        }
    }

    for (const arg of process.argv.splice(2)) {
        if (client.commands.filter(command => command.alias?.includes(arg))[0]) {
            args.push([arg]);
        } else {
            const array = args[args.length - 1];
            if (!array) {
                console.error('Error: Invalid command');
                break;
            };
            const index = args.indexOf(array);
            args.splice(index, 1);
            array.push(arg);
            args.push(array);
        }
    }

    let command;
    for (const arg of args) {
        command = client.commands.filter(command => command.alias?.includes(arg[0]))[0];
        const index = args.indexOf(arg);
        let other;
        for (let subarg of args) {
            const subindex = args.indexOf(subarg);
            subarg = subarg[0];
            if (subindex <= index) continue;
            if (other) continue;
            other = subarg;
        }
        if (other && !command?.other?.includes(other)) {
            console.error('Error: Invalid command argument ' + other);
            break;
        };
        if ((arg.length - 1) > command.max) {
            console.error('Error: Argument max length');
            break;
        };
        if ((arg.length - 1) < command.min) {
            console.error('Error: Argument min length');
            break;
        };
        if (command) await command.execute(client, arg);
    }

    if (args.length === 0) {
        command = client.commands.filter(command => command.name === 'help')[0];
        if (command) await command.execute(client, args);
    }


    return process.exit(0);
}
