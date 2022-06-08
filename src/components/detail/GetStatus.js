import React from 'react'

export default function GetStatus({status}) {
    function getStatustoKr({status}){
        switch (status){
            case 'Rumored':
                return ""
            case 'Planned':
                return ""
            case "In Production":
                return ""
            case "Post Production":
                return ""
            case "Released":
                return "개봉"
            case "Canceled":
                return "제작 취소"
            default:
                return null;
        }
    }

  return getStatustoKr({status})
}
