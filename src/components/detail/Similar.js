import React from 'react'
import { Grid } from "@material-ui/core"
import { IMAGE_BASE_URL } from "../../data/constants";
import Item from '../common/Item'

const Similar = ({data, mediaType, language, query, page, setValue}) => {
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
                mediaType={mediaType}
                title={result.title? result.title:result.name}
                language={language}
                query={query}
                page={page}
                setValue={setValue}
              />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Similar