// global
var nombre = 'Wolverine';


// constante
// const nombre = 'Wolverine';

// se puede crear misma constdir en otro scope
// if( true ){
//     const nombre = 'Magneto';
//     console.log(nombre);
// }


// local 
if( true ){
    let nombre = 'Magneto';
    // console.log(nombre);
}


// reasigna valor a nombre
if( true ){
    nombre = 'Magneto';
    // console.log(nombre);
}


console.log(nombre);