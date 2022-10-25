const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre (){
        return `${this.nombre } ${this.apellido}`
    }
}

// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

// console.log(nombre, apellido, poder);


const { nombre, apellido, poder, edad = 50 } = deadpool;
console.log(nombre, apellido, poder, edad);
console.log(deadpool.getNombre());


function imprimirHeroe ( {nombre, apellido, poder, edad = 25 } ){
    nombre = 'Node';
    console.log(nombre, apellido, poder, edad);
}

imprimirHeroe( deadpool );


const heroes = [ 'Deadpool', 'Superman', 'Spiderman'];

// console.log(heroes[0]);
// console.log(heroes[1]);
// console.log(heroes[2]);

const [h1, h2, h3] = heroes;
const [, , spider] = heroes;
console.log(h1, h2 ,h3);
console.log(spider);