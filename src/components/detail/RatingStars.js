import React from 'react'
import { Rating } from '@mui/material';

export default function RatingStars({mediaType, rate, popular}) {
  const rating = rate/2;
  switch(mediaType) {
    case 'movie':
      return <div className="rating"><Rating value={rating} precision={0.5} readOnly /><span className="rateLabel">{rate}</span></div>
    case 'tv':
      return <div className="rating"><Rating value={rating} precision={0.5} readOnly /><span className="rateLabel">{rate}</span></div>
    case 'person':
      return <div className="rating"><span className="rateLabel">{popular}</span></div>
    default:
      return "null"
  }
}
