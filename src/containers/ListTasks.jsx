import { Delete, Edit, FilterAlt, ManageSearch } from '@mui/icons-material';
import { Button, Card, CardContent, Chip, Grid, SpeedDialIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskApi } from '../api/tasks';
import SimpleSnackbar from '../components/Snackbar';
import Table from '../components/Table';
import CreateOrEditTask from './CreateOrEditTask';
import { getTasks } from '../redux/features/taskSlice';
import FilterTask from './FilterTask';
import SearchTask from './SearchTask';
import { findLabel } from '../utils/findlabel';
import { taskPriorities } from '../contants/taskPriorties';
import { taskStatus } from '../contants/taskStatus';

function ListTask() {
    const [editTask, setEditTask] = useState();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [filterModal, setShowFilterModal] = useState(false);
    const [searchModal, setShowSearchModal] = useState(false);
    const [createTaskComp, setCreateTaskComp] = useState(false);
    const [showSnackbarMessage, setShowSnackbarMessage] = useState();
    const dispatch = useDispatch();

    const { task: { tasks } } = useSelector((state) => {
        return state
    })
    const reload = () => {
        dispatch(getTasks())
    }

    useEffect(() => {
        reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const snackbarVisibility = ({ message }) => {
        setShowSnackbar(true)
        setShowSnackbarMessage(message)
    }

    const deleteTask = async (task) => {
        const { key, id } = task || {}
        const resultAfterDeletingTask = await deleteTaskApi(id, key)
        if (resultAfterDeletingTask.status === 200) {
            snackbarVisibility({ message: 'Deleted Task Successfully' })
            reload()
        }
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 300,
            editable: false,
        },
        {
            field: 'priority',
            headerName: 'Task Priority',
            width: 150,
            editable: false,
            renderCell: ({ row }) => (
                <Chip label={findLabel(row.priority, taskPriorities)} color={row.priority === 'critical' ? 'error' : row.priority === 'normal' ? 'success' : row.priority === 'urgent' ? 'warning' : 'primary'} variant="contained" />
            )
        },
        {
            field: 'status',
            headerName: 'Task Status',
            width: 150,
            editable: false,
            renderCell: ({ row }) => (
                <Chip label={findLabel(row.status, taskStatus)} color={row.status === 'inProgress' ? 'info' : row.status === 'todo' ? 'primary' : row.status === 'done' ? 'success' : 'secondary'} variant="outlined" />
            )
        },
        {
            field: 'dueDate',
            headerName: 'Due Date',
            width: 150,
            editable: false,
        },
        {
            field: "Edit Task",
            width: 200,
            renderCell: ({ row }) => {
                return (
                    <Button
                        variant="contained"
                        color="success"
                        size='small'
                        startIcon={<Edit />}
                        onClick={() => setEditTask(row)}
                    >
                        Edit Task
                    </Button>
                );
            }
        },
        {
            field: "Delete Task",
            width: 200,
            renderCell: ({ row }) => {
                return (
                    <Button
                        variant="contained"
                        color="error"
                        size='small'
                        startIcon={<Delete />}
                        onClick={() => deleteTask(row)}
                    >
                        Delete Task
                    </Button>
                );
            }
        }
    ];

    const rows = tasks.map((p) => {
        return { id: p.id, name: p.name, description: p.description, status: p.status, priority: p.priority, dueDate: p.dueDate?.toString().split('T')[0] }
    })

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <Grid container justifyContent={'flex-end'} item lg={6} sm={6} xl={6} xs={6}>
                            <Typography>Task List</Typography>
                        </Grid>
                        <Grid container spacing={2} justifyContent={'flex-end'} item lg={12} sm={6} xl={6} xs={6}>
                            <Grid item>
                                <Button variant='outlined' onClick={() => setShowFilterModal(!filterModal)} startIcon={<FilterAlt />}>Filter</Button>
                            </Grid>
                            <Grid item>
                                <Button variant='outlined' onClick={() => setShowSearchModal(!searchModal)} startIcon={<ManageSearch />}>Search</Button>
                            </Grid>
                            <Grid item>
                                <Button variant='outlined' onClick={() => setCreateTaskComp(!createTaskComp)} startIcon={<SpeedDialIcon />}>Create</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <Table rows={rows} columns={columns} />
            </Card>
            {createTaskComp && <CreateOrEditTask reload={reload} snackbarVisibility={({ message }) => snackbarVisibility({ message })} />}
            {editTask && <CreateOrEditTask values={editTask} reload={reload} snackbarVisibility={({ message }) => snackbarVisibility({ message })} />}
            <SimpleSnackbar message={showSnackbarMessage} setOpen={setShowSnackbar} open={showSnackbar} />
            {filterModal && <FilterTask />}
            {searchModal && <SearchTask />}
        </>
    )
}

export default ListTask;