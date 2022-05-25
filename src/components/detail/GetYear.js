import React from 'react'

export default function GetYear({mediaType, release, firstAir, lastAir}) {
    let first = firstAir || '';
    let last = lastAir || '';
    let rel = release || '';

    function releasedYear({mediaType}){
        const firstAirYear = first.substr(0,4);
        const lastAirYear = last.substr(0,4);
        switch(mediaType){
            case "tv":
            return  firstAirYear === lastAirYear? firstAirYear : firstAirYear+" - "+lastAirYear;
            case "movie":
            return rel.substr(0,4);
            default:
            return "undefined";
        }
    }

    return (
        <span>({releasedYear({mediaType})})</span>
    )
}
