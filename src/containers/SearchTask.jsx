import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalComponent from '../components/ModalComponent';
import { searchTask } from '../redux/features/taskSlice';

const SearchTask = () => {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(!open);
    const [searchVal, setSearchVal] = useState({});
    const dispatch = useDispatch();

    const onChangeHandler = (value, fieldName) => {
        const newObj = { ...searchVal, [fieldName]: value };
        setSearchVal({ ...newObj });
    }

    const getSearchValue = async () => {
        dispatch(searchTask(searchVal));
        handleClose();
    }

    return (
        <ModalComponent open={open} handleClose={handleClose}>
            <Grid container spacing={2}>
                <Grid item lg={12} xs={10} sm={10}>
                    <TextField fullWidth label="Filter By Name" name="filterByName" onChange={(e) => onChangeHandler(e.target.value, 'name')} />
                </Grid>
                <Grid item lg={12} xs={10} sm={10}>
                    <TextField fullWidth label="Filter By Description" name="filterByDescription" onChange={(e) => onChangeHandler(e.target.value, 'description')} />
                </Grid>
                <Grid item lg={12} xs={10} sm={10}>
                    <Button variant="outlined" onClick={() => getSearchValue()}>Search</Button>
                </Grid>
            </Grid>
        </ModalComponent>
    )
}

export default SearchTask;