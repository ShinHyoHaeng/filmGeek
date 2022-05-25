import React from 'react'
import { Rating } from '@mui/material';

export default function RatingStars({rate}) {
  const rating = rate/2;
  return (
    <div className="rating"><Rating value={rating} precision={0.5} readOnly /><span className="rateLabel">{rate}</span></div>
  )
}
