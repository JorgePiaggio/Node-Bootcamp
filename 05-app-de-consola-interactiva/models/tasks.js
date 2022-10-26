import { Task } from './task.js'

class Tasks{
    _list = {};

    constructor(){
        this._list = {};
    }

    getList(){
        const taskList = [];
        Object.keys(this._list).forEach( key => {
            taskList.push(this._list[key]);
        });

        return taskList;
    }

    addTask( desc = ''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }

}


export { Tasks };