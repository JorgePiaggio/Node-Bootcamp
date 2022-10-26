require('colors');


const showMenu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('===================================='.red.bgBlack);
        console.log('        Choose an option            '.america.bgBlack);
        console.log('===================================='.red.bgBlack);
        console.log('                                    '.bgBlack);

        console.log(`${'1.'.red} Create task                      `.bgBlack);
        console.log(`${'2.'.red} List tasks                       `.bgBlack);
        console.log(`${'3.'.red} List completed tasks             `.bgBlack);
        console.log(`${'4.'.red} List pending tasks               `.bgBlack);
        console.log(`${'5.'.red} Complete task                    `.bgBlack);
        console.log(`${'6.'.red} Delete task                      `.bgBlack);
        console.log(`${'0.'.red} Exit                             `.bgBlack);
        console.log('                                    '.bgBlack);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Choose an option: '.bgBlack, (opt) =>{
            readline.close();
            resolve(opt);
        })

    });

}

const pause = () => {

    return new Promise (resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPress ${'Enter'.green} to continue`.bgBlack, (opt) => {
        readline.close();
        resolve();
        })
    });

}



module.exports = {
    showMenu,
    pause
}