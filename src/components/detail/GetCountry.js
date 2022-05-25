import React from 'react'
import CountriesKr from '../../data/CountriesKr.json'

export default function getCountry({prodCountries, language}) {

    function getCountryName({country}){
        if(language === 'ko-KR'){
            const isoCode = country.iso_3166_1 || '';
            const code = isoCode.toLowerCase();
            const filteredCode = CountriesKr.filter((Countries) =>
            Countries.alpha2.includes(code)
            )
            return filteredCode[0].name;
        }else{
            return country.name;
        }
    
    }

    return (
        prodCountries.map((country, index) => (
            <span key={index}>{getCountryName({country})}</span>
        ))
    )
}
