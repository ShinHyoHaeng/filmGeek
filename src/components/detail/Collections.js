import React from 'react'
import { Grid } from "@material-ui/core"
import { IMAGE_BASE_URL } from "../../data/constants";
import Item from '../common/Item'

export default function Collections({data,mediaType,language}) {
  console.log(data)
  const results = data.parts;

  return (
    <div className='collections'>
      <div className='itemList'>
          <Grid container spacing={2}>
            {results
              .sort(function(i, j) { 
                let x = i.release_date;
                let y = j.release_date;
                if(x < y) return -1;
                if(x > y) return 1;
                return 0;
              })
              .map((result) => (
                <Item 
                  key={result.id}
                  id={result.id}
                  image={result.poster_path ? `${IMAGE_BASE_URL}w500${result.poster_path}`:null}
                  profile={result.profile_path ? `${IMAGE_BASE_URL}w500${result.profile_path}`:null}
                  mediaType={result.media_type? result.media_type:mediaType}
                  title={result.title? result.title:result.name}
                  language={language}
                />
            ))}
          </Grid>
        </div>
    </div>
  )
}
