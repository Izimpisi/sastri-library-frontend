import { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Box, Button } from '@mui/material';
import axiosInstance from '../../../lib/axiosInstance';

const SearchBarWithFilter = ({ handleSearchEvent }) => {
    // State for search value and selected filter
    const [searchValue, setSearchValue] = useState('');
    const [filter, setFilter] = useState('title');


    // Handle filter selection change
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };


    return (
        <Box display="flex" alignItems="center" gap={2} padding={2}>

            <FormControl variant="outlined" size="small">
                <InputLabel>Filter</InputLabel>
                <Select
                    value={filter}
                    onChange={handleFilterChange}
                    label="Filter"
                >
                    <MenuItem value="isbn">ISBN</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                </Select>
            </FormControl>


            <TextField
                variant="outlined"
                size="small"
                placeholder={`Search by ${filter}`}
                value={searchValue}
                onChange={handleSearchValueChange}
            />


            <Button
                variant="contained"
                onClick={() => handleSearchEvent(filter, searchValue)}
                size="medium"
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBarWithFilter;
