import React from 'react'

const Container = ({Children}) => {
  return (
    <div className='container'>
        {Children}
    </div>
  )
}

export default Container;
