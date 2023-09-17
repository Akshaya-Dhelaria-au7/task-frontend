import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createComment } from "../api/comments";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../redux/features/commentsSlice";

const Comments = ({ taskId, snackbarVisibility }) => {
    const [commentInput, setCommentInput] = useState()
    const dispatch = useDispatch()
    const { comments: { comments: userComments } } = useSelector((state) => {
        return state
    });

    const getComment = async () => {
        dispatch(getComments(taskId));
    }

    const saveComment = async () => {
        const { status, message } = await createComment({ comment: commentInput, taskId });
        if (status === 200) {
            snackbarVisibility({ message });
            getComment();
        }
    }

    useEffect(() => {
        getComment()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId])

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
            {Boolean(userComments.length) &&
                <Card sx={{ p: 2, marginTop: '1rem' }}>
                    <Typography>Previous Comments</Typography>
                    {userComments.map(({ comment, createdAt, id, user }) => (
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