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

const getEmpleado = (id, callback) => {
    const empleado = empleados.find( e => e.id === id )?.nombre;
    empleado ? callback(null, empleado) : callback(`Empleado con id ${id} no existe`);
}


getEmpleado( 3, (err, empleado) => {
    err ? console.log("Error: ", err) : console.log("Empleado: ", empleado);
})

getEmpleado( 7, (err, empleado) => {
    err ? console.log("Error: ", err) : console.log("Empleado: ", empleado);
})

/////////////////////////////

const getSalario = ( id, callback ) => {
    const salario = salarios.find (e => e.id === id)?.salario;
    salario ? callback(null, salario) : callback(`Salario con id ${id} no existe`);
} 

let id = 1;

// getSalario(id, (err, salario) => {
//     err ? console.log("Error: ", err) : console.log("Salario: ", salario);
// })

// id = 5;

// getSalario(id, (err, salario) => {
//     err ? console.log("Error: ", err) : console.log("Salario: ", salario);
// })

////////////////////////////7

getEmpleado(id, (err, empleado) => {
    err ? console.log("Error: ", err) : getSalario(id, (err, salario) => 
    err ? console.log("Error: ", err) : console.log('El empleado', empleado, 'tiene un salario de:', salario)) 
})

id = 3;

getEmpleado(id, (err, empleado) => {
    err ? console.log("Error: ", err) : getSalario(id, (err, salario) => 
    err ? console.log("Error: ", err) : console.log('El empleado', empleado, 'tiene un salario de:', salario)) 
})