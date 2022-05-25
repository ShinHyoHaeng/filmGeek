import React from 'react'

export default function GetCompanies({prodCompanies}) {
  return (
    prodCompanies.map((prodCompanies, index) => (
        <span key={prodCompanies.id}>{prodCompanies.name}</span>
    ))
  )
}
