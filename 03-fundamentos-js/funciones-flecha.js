function sumar( a, b = 10 ){
    return a + b;
}

//console.log(sumar(5, 7));
console.log("funcion 1: " , sumar(5));

const sumar2 = (a, b) => {
    return a + b;
}

console.log("funcion 2: ", sumar2(5, 4));


const sumar3 = (a, b) => a + b;
console.log("funcion 3: ", sumar3(9, 7));


const saludar = () => 'Hola Mundo';
console.log(saludar());