import { inquirerMenu, pause, readInput, listPlaces } from './helpers/inquirer.js';
import { Search } from './models/search.js';
import * as dotenv from 'dotenv'


const main = async () => {

    let option;
    const search = new Search();

    do{
        option = await inquirerMenu();
        console.log(option);

        switch(option){
            case 1:
                // search places
                const searchPlace = await readInput('City: ');

                // choose place
                const places = await search.city(searchPlace);
                const id = await listPlaces(places);
                if (id === 0) continue;

                // find weather
                const selectedPlace = places.find( l => l.id === id);
                search.addHistory(selectedPlace);
                const climate = await placeClimate(selectedPlace.lat, selectedPlace.lng);

                // results
                console.clear();
                console.log('\nInformation about the city\n'.green);
                console.log('City: ', selectedPlace.name.green);
                console.log('Lat: ', selectedPlace.lat);
                console.log('Lng: ', selectedPlace.lng);
                console.log('Temperature: ', climate.temp);
                console.log('Min: ', climate.min);
                console.log('Max: ', climate.max);
                console.log('How is the weather: ', climate.desc);
                break;
            case 2:
                search.historyUppercase.forEach( (place, i) => {
                    const idx = `${ i + 1 }`.green;
                    console.log(`${ idx } ${ place }`);
                })
                break;
        }


        if(option !== 0)
            await pause();

    }while (option !== 0);




}

main();
