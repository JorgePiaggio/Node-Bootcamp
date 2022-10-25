const empleados= [
    {
        id: 1,
        nombre: 'Fernando'
    },
    {
        id: 2,
        nombre: 'Karen'
    },
    {
        id: 3,
        nombre: 'Linda'
    },
];

const salarios= [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    }
];

const getEmpleado = (id) => {
    return new Promise( (resolve, reject) => {
        const empleado = empleados.find( e => e.id === id )?.nombre;
        empleado ? resolve(empleado) : reject(`No existe el empleado con id ${id}`);
    });
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find( e => e.id === id)?.salario;
        salario ? resolve(salario) : reject(`No existe el salario con id ${id}`);
    })
}


let id = 1;

getEmpleado(id)
    .then( empleado => {
        nombre = empleado;
        return getSalario(id)
    })
    .then( salario => console.log(`El empleado ${nombre} tiene un salario de: ${salario}`))
    .catch(err => console.log(err))

    
let id2 = 15;

getEmpleado(id2)
    .then( empleado => {
        nombre = empleado;
        return getSalario(id)
    })
    .then( salario => console.log(`El empleado ${nombre} tiene un salario de: ${salario}`))
    .catch(err => console.log(err))