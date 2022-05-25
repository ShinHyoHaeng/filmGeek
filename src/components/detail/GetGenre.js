import React from 'react'

export default function GetGenre({genres}) {
  return (
    genres.map((genre, index) => (
        <span key={index}>{genre.name}</span>
    ))
  )
}
