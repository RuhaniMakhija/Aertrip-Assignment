import React, { useState } from 'react';
import apiData from "./api-data.json";

const ExtractFlightDetails = () => {
    const extractedData = [];
    const flights=apiData.data.flights;
    for(let k=0;k<flights.length;k++){
        const flightsk=flights[k].results.j;
        for(let i=0;i<flightsk.length;i++){
            let flightsfr=flightsk[i].leg[0].flights;
            // console.log(flightsfr);
            for(let j=0;j<flightsfr.length;j++){
                const flight = flightsfr[j];
                const details={
                    fr: flight.fr,
                    dt: flight.dt,
                    to: flight.to,
                    at: flight.at,
                    al: flight.al[0], 
                    ft: flight.tt[0], 
                    farepr: flight.farepr,
                };
                extractedData.push(details);
            }
        }
    }
    return extractedData;
}

export default ExtractFlightDetails
