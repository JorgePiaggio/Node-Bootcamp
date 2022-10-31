import inquirer from 'inquirer';
import colors from 'colors';

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option: ',
        choices: [
            {value: 1, name: `${'1.'.red} Search place`},
            {value: 2, name: `${'2.'.red} History`},
            {value: 0, name: `${'0.'.red} Exit`}
        ],
    },
];

const inquirerMenu = async () => {

    console.clear();
    console.log('===================================='.red);
    console.log('            Climate App             '.america);
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

const listPlaces = async( places = []) => {

    const choices = tasks.map( (place, i) => {

        const idx = `${i + 1}`.green;

        return{
            value: place.id,
            name: `${idx}.` + ` ${place.name}`.toUpperCase()
        }
    });

    choices.unshift({
        value: 0,
        name: '0.'.green + 'Cancel'.red
    });

    const question = [{
        type: 'list',
        name: 'id',
        message: 'Select place: ',
        choices
    }]

    const{ id } = await inquirer.prompt(question);
    return id;
}

const listTasksToCheck = async( tasks = []) => {

    const choices = tasks.map( (task, i) => {

        const idx = `${i + 1}`.green;

        return{
            value: task.id,
            name: `${idx}.` + ` ${task.desc}`.toUpperCase(),
            checked: task.completedIn ? true : false
        }
    });

    const question = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select: ',
        choices
    }]

    const{ ids } = await inquirer.prompt(question);
    return ids;
}

const confirm = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const{ ok } = await inquirer.prompt(question);
    return ok;
}


export { inquirerMenu, pause, readInput, listPlaces, confirm, listTasksToCheck }