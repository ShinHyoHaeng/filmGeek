import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchData, Result } from '../components/search'

//https://react.vlpt.us/integrate-api/01-basic.html
//https://velog.io/@velopert/react-router-v6-tutorial

const search = () => {
  return (
    <div>
        <SearchData />
        <Result />
    </div>
  )
}

export default search