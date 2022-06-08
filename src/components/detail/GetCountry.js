import React from 'react'
import Countries from '../../data/Countries.json'

export default function getCountry({mediaType, prodCountries, placeOfBirth, language}) {

    function getCountryNameByCode({country}){
        if(language === 'ko-KR'){
            // 코드를 활용해 국문 국가명 출력
            const isoCode = country.iso_3166_1 || '';
            const code = isoCode.toLowerCase();
            const filteredCode = Countries.filter((Countries) =>
                Countries.alpha2.includes(code)
            )
            return filteredCode[0].ko;
        }else{
            return country.name;
        }
    }

    function getCountryNameByName({placeOfBirth}){
        const birthCountury = (placeOfBirth||'').split(', ').at(-1);
        if(language === 'ko-KR'){   
            const filteredCtr = Countries.filter((Countries) =>
                Countries.en.includes(birthCountury)
            )
            return filteredCtr[0].ko;
        }else{
            return birthCountury;
        }
    }

    switch(mediaType){
        case 'movie':
            return (
                prodCountries.map((country, index) => (
                    <span key={index}>{getCountryNameByCode({country})}</span>
                ))
            )
        case 'tv':
            return (
                prodCountries.map((country, index) => (
                    <span key={index}>{getCountryNameByCode({country})}</span>
                ))
            )
        case 'person':
            return <span>{getCountryNameByName({placeOfBirth})}</span>;

        default:
            return 'null';
    }

}
