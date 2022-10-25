const argv = require('yargs')
                .option('b', {
                    alias: 'base',
                    type: 'number',
                    demandOption: true,
                    describe: 'Base for multiply table'
                })
                .option('l', {
                    alias: 'list',
                    type: 'boolean',
                    demandOption: true,
                    default: false,
                    describe: 'Shows table in console'
                })
                .option('t', {
                    alias: 'top',
                    type: 'number',
                    demandOption: true,
                    default: 10,
                    describe: 'Top limit for the table'
                })
                .check((argv, options ) => {
                    if( isNaN(argv.b))
                        throw 'Base must be a number';
                    return true;
                })
                .check((argv, options ) => {
                    if( isNaN(argv.t))
                        throw 'Top must be a number';
                    return true;
                })
                .argv;

module.exports = argv;