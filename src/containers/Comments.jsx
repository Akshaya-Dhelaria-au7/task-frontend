import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createComment, getComment } from "../api/comments";
import Loader from '../components/Loader';

const Comments = ({ taskId, snackbarVisibility }) => {
    const [previousComments, setPreviousCommentData] = useState([])
    const [commentInput, setCommentInput] = useState()

    const getComments = async () => {
        const data = await getComment(taskId);
        setPreviousCommentData(data)
    }

    const saveComment = async () => {
        const { status, message } = await createComment({ comment: commentInput, taskId });
        if (status === 200) {
            snackbarVisibility({ message })
        }
    }

    useEffect(() => {
        getComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId])

    if (!previousComments.length && taskId) return <Loader />

    return (
        <>
            <Grid container spacing={2} style={{ marginTop: '.5rem' }} justifyContent={'center'}>
                <Typography>Comments</Typography>
                <Grid item lg={12} xs={10} sm={10}>
                    <TextField name="comment" fullWidth onChange={(e) => setCommentInput(e.target.value)} label="Comment On The Task" placeholder="Comment on the task" />
                </Grid>
                <Grid item lg={12} xs={10} sm={10}>
                    <Button variant="outlined" disabled={!commentInput?.length} onClick={saveComment} color="primary">Save</Button>
                </Grid>
            </Grid>
            {Boolean(previousComments.length) &&
                <Card sx={{ p: 2, marginTop: '1rem' }}>
                    <Typography>Previous Comments</Typography>
                    {previousComments.map(({ comment, createdAt, id, user }) => (
                        <CardContent>
                            <Grid container spacing={2} key={id} justifyContent={'space-between'}>
                                <Grid item lg={12}>
                                    <TextField disabled fullWidth label={comment} />
                                </Grid>
                                <Grid container justifyContent={'flex-end'} item lg={12}>
                                    <Typography variant="caption">{user.name} : {(createdAt.toString().split('T')[0])}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    ))}
                </Card>
            }
        </>
    )
}

export default Comments;