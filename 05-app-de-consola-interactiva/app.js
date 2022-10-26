import { inquirerMenu, pause, readInput } from './helpers/inquirer.js';
import { Tasks } from './models/tasks.js';


const main = async() => {

    let option = '';
    const tasks = new Tasks();

    do {
        option = await inquirerMenu();

        switch( option ){
            case '1':
                const desc = await readInput('Description: ');
                tasks.addTask( desc );
                break;
            case '2':
                console.log(tasks.getList());
            break;
            // case '3':
            //     break;
            // case '4':
            //     break;
            // case '5':
            //     break;
            // case '6':
            //     break;
            // case '0':
            //     break;    
        }

        if(option !== '0')
            await pause();

    } while( option !== '0');

}


main();