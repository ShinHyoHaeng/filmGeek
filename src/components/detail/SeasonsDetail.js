import { Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import React from 'react'
import { IMAGE_BASE_URL } from '../../data/constants';

export default function SeasonsDetail({data, language}) {
    console.log(data)
    const episodes = data.episodes;
    // 시즌 에피소드 영역 높이값 맞추기 필요!
  return (
    <div className='seasonDetail'>
        <Grid container spacing={2}>
            {episodes.map((episode) => (
                <Grid item key={episode.id} id='episode'>
                    <Card>
                        <CardMedia
                            component="img"
                            image={episode.still_path ? `${IMAGE_BASE_URL}w1280/${episode.still_path}`:null}
                            alt={`${episode.name} 스틸 이미지`}
                        />
                        <CardContent>
                            <h3>{episode.name}</h3>
                            <p>{episode.overview}</p>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </div>
  )
}
