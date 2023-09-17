import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

function Table({ rows = [], columns, pageSize = 10 }) {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: pageSize,
                        },
                    },
                }}
                pageSizeOptions={[pageSize]}
            />
        </Box>
    )
}

export default Table;