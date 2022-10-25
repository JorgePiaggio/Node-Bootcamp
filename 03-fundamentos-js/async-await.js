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
// let id = 3;

// const getInfoUsuario = async() => {
//     return 'Hola Mundo';
// }

const getInfoUsuario = async() => {
    try{
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
        return `El salario del empleado ${empleado} es de: ${salario}`;
    } catch( error){
        throw error;
    }
}

getInfoUsuario()
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
