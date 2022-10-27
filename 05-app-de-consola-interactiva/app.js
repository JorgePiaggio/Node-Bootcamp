import { inquirerMenu, pause, readInput, listTasksToDelete, confirm, listTasksToCheck } from './helpers/inquirer.js';
import { Tasks } from './models/tasks.js';
import { save, read } from './helpers/saveFile.js'

const main = async() => {

    let option = '';
    const tasks = new Tasks();

    const tasksDB = read();

    if( tasksDB ){
        tasks.addTasksFromArray(tasksDB);
    }

    do {
        option = await inquirerMenu();

        switch( option ){
            case '1':
                // add task
                const desc = await readInput('Description: ');
                tasks.addTask( desc );
                break;
            case '2':
                // view all tasks
                tasks.getFilteredList();
            break;
            case '3':
                // view completed tasks
                tasks.getPendingOrCompletedTasks(true);
                break;
            case '4':
                // view pending tasks
                tasks.getPendingOrCompletedTasks(false);
                break;
            case '5':
                // mark complete, pending
                const ids = await listTasksToCheck(tasks.getList());
                tasks.toggleCompleted(ids);
                break;
            case '6':
                // delete task
                const id = await listTasksToDelete(tasks.getList());
                if( id !== 0){
                    const ok = await confirm('Are you sure?');
                    if(ok){
                        tasks.deleteTask(id);
                        console.log('Task deleted');
                    }
                }
                break;
        }

        save(tasks.getList());

        if(option !== '0')
            await pause();

    } while( option !== '0');

}


main();