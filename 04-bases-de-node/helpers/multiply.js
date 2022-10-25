const fs = require('fs');
const colors = require('colors');

const createMultiplyFile = async (base = 5, list = false, top = 10) => {

    try{
        let output = '';

        tablaDeMultiplicar = (value, topNumber) => {
            output += `Tabla de multiplicar del ${value}\n--------------------------\n`;
            for(let i = 1; i <= topNumber; i++){
                output += (`${value} * ${i} = ${value * i}\n`);
            }
        }
    
        tablaDeMultiplicar(base, top);
    
        // fs.writeFile(`table-${base}.txt`, output, (err) => {
        //     if(err) 
        //         throw err;
    
        //     console.log(`table-${base}.txt created`);
        // })

        fs.writeFileSync(`./output/table-${base}.txt`, output);
        
        if(list)
            console.log(output.rainbow);

        return(`table-${base}.txt`);

    } catch (err){
        throw (err);
    }
}

module.exports = {
    createMultiplyFile
}