import { Task } from './task.js'

class Tasks{
    _list = {};

    constructor(){
        this._list = {};
    }

    addTask( desc = ''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    addTasksFromArray( tasks = [] ) {
        tasks.forEach( t => {
            this._list[t.id] = t;
        })
    }

    getList(){
        const taskList = [];
        Object.keys(this._list).forEach( key => {
            taskList.push(this._list[key]);
        });

        return taskList;
    }

    getFilteredList(){
        this.getList().forEach( (task, index) => {
            const idx = `${index + 1}.`.green;
            // desestructuracion
            const { desc, completedIn } = task;
            const status = completedIn ? 'Completed'.green : 'Pending'.red;
            console.log(`${idx}` + `${desc}`.toUpperCase() + ` :: ${status}`);
        })
    }

    getPendingOrCompletedTasks( completed = true ){
        let idx = 1;

        if(completed)
            console.log('\nCompleted Tasks\n'.rainbow.underline)
        else
            console.log('\nPending Tasks\n'.rainbow.underline)

        this.getList().forEach( (task) => {
            // desestructuracion
            const { desc, completedIn } = task;
            const status = completedIn ? true : false;
            if(completed){
                if(status){
                    console.log(`${(idx + '.').green}` + `${desc}`.toUpperCase() + ` :: ${completedIn}`);
                    idx++;
                }
            }else{
                if(!status){
                    console.log(`${(idx + '.').green}` + `${desc}`.toUpperCase());
                    idx++;
                }
            }
        })
    }

    deleteTask(id = ''){
        if(this._list[id]){
            delete this._list[id];
        }
    }

    toggleCompleted( ids = [] ) {

        // mark completed
        ids.forEach( id => {
            const task = this._list[id];
            if(!task.completedIn)
                task.completedIn = new Date().toISOString();
        })

        // mark pending
        this.getList().forEach( t => {
            if( !ids.includes(t.id)){
                this._list[t.id].completedIn = null;
            }
        })
    }

}

export { Tasks };