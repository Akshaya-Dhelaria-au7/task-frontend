import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalComponent from '../components/ModalComponent';
import { taskStatus } from '../contants/taskStatus';
import { taskPriorities } from '../contants/taskPriorties';
import { filterTask } from '../redux/features/taskSlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const FilterTask = () => {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(!open);
    const [filteredVal, setFilteredVal] = useState({});
    const dispatch = useDispatch()


    const onChangeHandler = (value, fieldName) => {
        if (fieldName === 'dueDate') {
            value = `${value['$y']}-${value['$M'] + 1}-${value['$D']}`
        }
        const newObj = { ...filteredVal, [fieldName]: value };
        setFilteredVal({ ...newObj });
    }

    const getFilteredTask = async () => {
        dispatch(filterTask(filteredVal));
        handleClose();
    }

    return (
        <ModalComponent open={open} handleClose={handleClose}>
            <Grid container spacing={2}>
                <Grid item lg={12} xs={10} sm={10}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select label="Status" name="status" required onChange={(e) => onChangeHandler(e.target.value, 'status')} placeholder="Status">
                            {taskStatus.map((status, index) => (
                                <MenuItem value={status.value} key={index}>{status.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={12} xs={10} sm={10}>
                    <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select label="Priority" name="priority" required onChange={(e) => onChangeHandler(e.target.value, 'priority')} placeholder="Priority">
                            {taskPriorities.map((priority, index) => (
                                <MenuItem value={priority.value} key={index}>{priority.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={12} xs={10} sm={10}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                sx={{ width: "100%" }}
                                label="Due Date"
                                format="DD/MM/YYYY"
                                onChange={(newValue) => onChangeHandler(newValue, 'dueDate')}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item lg={12} xs={10} sm={10}>
                    <Button variant="outlined" onClick={() => getFilteredTask()}>Filter</Button>
                </Grid>
            </Grid>
        </ModalComponent>
    )
}

export default FilterTask;