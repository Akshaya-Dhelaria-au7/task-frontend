import { CircularProgress, Grid } from "@mui/material";

function Loader(){
    return (
        <Grid container justifyContent={'center'}>
            <CircularProgress />
        </Grid>
    )
}

export default Loader;