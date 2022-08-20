import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    user:{name: 'name'},
    page: 'movies',
    headerDd: false ,
    searchBarValue: '',
    searchResults: [],
    resultsLoaded: false,
    matchesTab: false,
    matchesMob: false,
    mobMenuActive: false,
    mobMenuContent: ''
}

export const getSearchResults = createAsyncThunk(
    'header/getSearchResults',
    async ( search, thunkAPI) => {
        try{
            //prevents query for empty search bar value
            const results = search === '' ? [] : await apiQuery(search);
            const resultNames = await results.map(element => element.original_title)
            return resultNames
        }
        catch(error) {
            return thunkAPI.rejectWithValue('request failed')
        }
    }
) 

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.searchBarValue = '';
        },
        setSearchValue: (state, {payload}) => {
            state.searchBarValue = payload;
        },
        toggleResults: (state) => {
            state.resultsLoaded = !state.resultsLoaded
        },
        toggleDD: (state) => {
            state.headerDd = !state.headerDd
        },
        setPage: (state, {payload}) => {
            state.page = payload;
        },
        setMatchesMob: (state, {payload}) => {
            state.matchesMob = payload;
        },
        setMatchesTab: (state, {payload}) => {
            state.matchesTab = payload;
        },
        setMobMenuActive: (state) => {
            state.mobMenuActive = !state.mobMenuActive;
        },
        setMobMenuContent: (state, {payload}) => {
            state.mobMenuContent = payload;
        }
        },
    extraReducers: {
        [getSearchResults.pending]: (state) => {
            state.resultsLoaded = false;
        },
        [getSearchResults.fulfilled]: (state, action) => {
            state.resultsLoaded = true;
            state.searchResults = action.payload;
        },
        [getSearchResults.rejected]: (state) => {
            state.resultsLoaded = true;
        }
    }
    }
)
const apiQuery = async (keyWord) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=e72588d9f899e406d4daa18b5e7b1b00&original_language=en&query=${keyWord.replace(' ', '+')}`);
    const data = await res.json();
    return data.results
}

export default headerSlice.reducer

export const {clearSearch, toggleDD,
     setSearchValue, toggleResults,
     setPage, setMatchesMob ,
     setMatchesTab, setMobMenuActive,
     setMobMenuContent,
                        } = headerSlice.actions;