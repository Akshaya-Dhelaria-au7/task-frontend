import { Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

export default function SimpleSnackbar({ message, open, setOpen }) {
    const handleClose = () => setOpen(false);

    return (
        <Grid>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={message}
            />
        </Grid>
    );
}