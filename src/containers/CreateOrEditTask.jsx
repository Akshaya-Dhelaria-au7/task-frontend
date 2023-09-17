import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { createTaskApi, editTasksApi } from "../api/tasks";
import ModalComp from "../components/ModalComponent";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { taskStatus } from "../contants/taskStatus";
import { taskPriorities } from "../contants/taskPriorties";
import Comments from "./Comments";

function CreateOrEditTask({ values = {}, reload, snackbarVisibility }) {
    const initialValues = values ? values : {
        name: '', description: '', status: '', dueDate: '', priority: ''
    }

    const [open, setOpen] = useState(true);
    const [initialVal, setInitialVal] = useState(initialValues);

    const onChangeHandler = (value, fieldName) => {
        const newObj = { ...initialVal, [fieldName]: value };
        setInitialVal({ ...newObj });
    }

    const decideTask = (taskType) => {
        switch (taskType) {
            case 'edit':
                editTask();
                break;
            case 'create':
                createTask();
                break;
            default:
                break;
        }
    }

    const createTask = async () => {
        const { name, description } = initialVal || {};
        if (!(name || description)) return null;
        const { data, status: resStatus } = await createTaskApi(initialVal);
        if (resStatus === 200) {
            setOpen(!open);
            snackbarVisibility({ message: data.message });
            await reload();
        }
    }

    const handleClose = () => setOpen(!open);

    const editTask = async () => {
        const response = await editTasksApi(initialVal)
        if (response.status === 200) {
            setOpen(!open)
            snackbarVisibility({ message: response.message })
            await reload()
        }
    }

    return (
        <ModalComp open={open} handleClose={handleClose}>
            <Typography component={'h3'} style={{ textAlign: 'center' }}>{Object.keys(values).length ? 'Edit' : 'Create'} Task</Typography>
            <Divider />
            <Grid container spacing={2} style={{ marginTop: '.5rem' }} justifyContent={'center'}>
                <Grid item lg={12} xs={10} sm={10}>
                    <TextField name="name" required onChange={(e) => onChangeHandler(e.target.value, 'name')} defaultValue={initialVal.name} fullWidth label="Name Of The Task" placeholder="Name of the task" />
                </Grid>
                <Grid item lg={12} xs={10} sm={10}>
                    <TextField name="description" required onChange={(e) => onChangeHandler(e.target.value, 'description')} defaultValue={initialVal.description} fullWidth label="Description Of The Task" placeholder="Description of the task" />
                </Grid>
                <Grid item lg={12} xs={10} sm={10}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select label="Status" name="status" required value={initialVal.status} onChange={(e) => onChangeHandler(e.target.value, 'status')} placeholder="Status">
                            {taskStatus.map((status, index) => (
                                <MenuItem value={status.value} key={index}>{status.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={12} xs={10} sm={10}>
                    <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select label="Priority" name="priority" required value={initialVal.priority} onChange={(e) => onChangeHandler(e.target.value, 'priority')} placeholder="Priority">
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
                                defaultValue={dayjs(initialVal.dueDate)}
                                onChange={(newValue) => onChangeHandler(newValue['$d'], 'dueDate')}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: '1rem' }} justifyContent='space-between'>
                <Grid item>
                    <Button variant="contained" onClick={() => decideTask(Object.keys(values)?.length ? 'edit' : 'create')} color="primary">{Object.keys(values).length ? 'Edit' : 'Create'} Task</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={() => setOpen(!open)}>Cancel</Button>
                </Grid>
            </Grid>
            {values.id && <Comments taskId={values.id} snackbarVisibility={snackbarVisibility} />}
        </ModalComp>
    )
}

export default CreateOrEditTask