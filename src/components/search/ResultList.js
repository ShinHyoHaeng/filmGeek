import * as React from "react";
import { Grid, IconButton } from "@material-ui/core"
import { IMAGE_BASE_URL } from "../../data/constants";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Item from '../common/Item'

const ResultList = ({ data, mediaType, language, query, currentPage, setCurrentPage }) => {
  const totalCnt = data.total_results;
  const results = data.results;
  const page = data.page;
  const totalPages = data.total_pages;
  console.log("results>>",results, "totalCnt>>>",totalCnt, "currentPage>>>", currentPage);

  return (
    <div className="compArea resultList">
      <div className="listInfo">
        <p className="total">검색 결과: 총 {totalCnt.toLocaleString({language})}건({page.toLocaleString({language})}/{totalPages.toLocaleString({language})}) 페이지)</p>
        <ul className="pageNavigate">
          <li className="prevButton">
            <IconButton aria-label="prev page" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <ArrowBackIosNewRoundedIcon />
            </IconButton>
          </li>
          <li className="nextButton">
            <IconButton aria-label="next page" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === data.total_pages}>
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </li>
        </ul>
      </div>
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
            />
        ))}
      </Grid>
    </div>
  )
}

export default ResultList