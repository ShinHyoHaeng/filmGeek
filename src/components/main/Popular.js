import React from 'react'
import { IMAGE_BASE_URL } from '../../data/constants';
import { Grid } from "@material-ui/core"
import Item from '../common/Item'

export default function Popular({data, mediaType, language, query, page}) {
    const results = data.results
  return (
    <div className="popularArea">
        <h2>Popular</h2>
        <div className="listArea itemList">
            <Grid container spacing={2}>
            {results.map((result, index) => (
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
