import apiData from "./api-data.json";

const totalFlights=apiData.data.flights;
const extractedCity = [];
for(let i=0;i<totalFlights.length;i++){
    let flights=totalFlights[i];
    let apdet=flights.results.apdet;
    for(let j=0;j<apdet.length;j++){
        let city=apdet[j].c;
        console.log(city);
    }


}