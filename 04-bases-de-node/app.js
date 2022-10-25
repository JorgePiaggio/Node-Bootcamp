const { createMultiplyFile } = require('./helpers/multiply');
const argv = require('./config/yargs');
const colors = require('colors');

console.clear();

//console.log(process.argv);
// const [ , , arg3 = 'base=5'] = process.argv;
// const [ , base = 5] = arg3.split('=');

// console.log(argv.b);

createMultiplyFile(argv.b, argv.l, argv.t)
    .then( fileName => console.log(fileName.green, 'created'.trap))
    .catch(err => console.log(colors.red.underline("Error: "), err));