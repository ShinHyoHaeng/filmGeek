import React from 'react'
import { Grid } from "@material-ui/core"
import { IMAGE_BASE_URL } from "../../data/constants";
import Item from '../common/Item'

const Similar = ({data, mediaType, language, query, page}) => {
  console.log(data)
  const results = data.results
  return (
    <div className='tabArea itemList'>
      <div className='items'>
        <Grid container spacing={2}>
          {results.map((result) => (
              <Item 
                key={result.id}
                id={result.id}
                image={result.poster_path ? `${IMAGE_BASE_URL}w500${result.poster_path}`:null}
                profile={result.profile_path ? `${IMAGE_BASE_URL}w500${result.profile_path}`:null}
                mediaType={result.media_type? result.media_type:mediaType}
                title={result.title? result.title:result.name}
                language={language}
                query={query}
                page={page}
              />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Similar