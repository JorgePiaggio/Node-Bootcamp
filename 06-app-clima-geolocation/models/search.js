import * as fs from 'fs';
import axios from 'axios';

class Search{
    history = ['mar del plata', 'venecia','ur'];
    dbPath = './db/database.json';

    constructor(){
        this.readDB();
    }

    get historyUppercase(){
        return this.history.map( x => {
            let words = x.split(' ');
            words = words.map( word => word[0].toUpperCase() + word.substring(1));
            return words.join(' ');
        });
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en'
        }
    }

    get paramsWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric'
        }
    }

    async city (place = ''){
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox
        });

        const response = await instance.get();
            return response.data.features.map( place => ({
                id: place.id,
                name: place.name,
                lng: place.center[0],
                lat: place.center[1],
        }));

    }catch (error){
        return [];
    }

    async placeClimate (lat, lon) {
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon }
            })

            const resp = await instance.get();
            const {weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp 
            }
        }catch (error){
            console.log(error);
        }
    }

    addHistory(place = ''){
        // avoid duplicates
        if( this.history.includes(place.toLowerCase())){
            return;
        }
        this.history = this.history.splice(0,5);
        this.history.unshift(place.toLowerCase());
    }

    saveDB(){
        const payload = {
            history: this.history
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB(){
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.history = data.history;
    }
}

export { Search };