import inquirer from 'inquirer';
import colors from 'colors';

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option: ',
        choices: [
            {value: '1', name: `${'1.'.red} Create task`},
            {value: '2', name: `${'2.'.red} List tasks`},
            {value: '3', name: `${'3.'.red} List completed tasks`},
            {value: '4', name: `${'4.'.red} List pending tasks`},
            {value: '5', name: `${'5.'.red} Complete task`},
            {value: '6', name: `${'6.'.red} Delete task`},
            {value: '0', name: `${'0.'.red} Exit`}
        ],
    },
];

const inquirerMenu = async () => {

    console.clear();
    console.log('===================================='.red);
    console.log('            Task App                '.america);
    console.log('====================================\n'.red);

    const { option } = await inquirer.prompt(menuOpts);

    return option;
};


const pause = async() => {
    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'Enter'.green} to continue`
    }];

    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async( message ) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if(value.length === 0){
                return 'Please insert a value';
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;
}


export { inquirerMenu, pause, readInput };