import React from 'react'

export default function GetYear({mediaType, release, firstAir, lastAir, birthday}) {
    let first = firstAir || '';
    let last = lastAir || '';
    let rel = release || '';

    let birth = birthday || '';
    let today = new Date(); 
    let year = today.getFullYear();

    function releasedYear({mediaType}){
        const firstAirYear = first.substr(0,4);
        const lastAirYear = last.substr(0,4);
        const birthYear = birth.substr(0,4);
        

        switch(mediaType){
            case "tv":
                return firstAirYear === lastAirYear? firstAirYear : firstAirYear+" - "+lastAirYear;
            case "movie":
                return rel.substr(0,4);
            case "person":
                return year-birthYear;
            default:
                return "undefined";
        }
    }

    return releasedYear({mediaType})
}
