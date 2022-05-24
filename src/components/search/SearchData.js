import { useState } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchData = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {   
    let value = event.target.value;
    console.log(value);
    checkLanguage(value);
  }

  // 입력 언어에 따라 검색 언어 변경
  const checkLanguage = (value) => {
    props.setCurrentPage(1);
    if(/[a-z]/i.test(value)){
      console.log("english");
      props.setLanguage('en-US');
    }else if(/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)){
      console.log("한글");
      props.setLanguage('ko-KR');
    }
      setSearchValue(value);
      props.setQuery(value);
    
  }
  return (
    <div className="compArea">
      <TextField
        id="searchField"
        label="Search"
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
        value={searchValue||''}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default SearchData