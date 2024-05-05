import {Button, Dialog, DialogActions, DialogTitle, Grid} from "@mui/material";
import {useEquipmentOccupancyList, useRoomOccupancyList} from "../../hooks/rooms";
import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import dayjs from "dayjs";

export const OccupancyViewModal = ({ open, handleClose, id, isRoom}) => {

    const columns = [
        { field: 'dateFrom',
            headerName: 'Nuo',
            width: 200,
            renderCell: (params) => {
                return dayjs(params.row.dateFrom).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        {
            field: 'dateTo',
            headerName: 'Iki',
            width: 200,
            renderCell: (params) => {
                return dayjs(params.row.dateTo).format('YYYY-MM-DD HH:mm:ss');
            },
        },
    ];


    const {data: roomData} = useRoomOccupancyList(id);
    const {data: equipmentData} = useEquipmentOccupancyList(id);

    const [gridRows, setGridRows] = useState([]);
    useEffect(() => {
        if (isRoom) {
            setGridRows(roomData || []);
        } else {
            setGridRows(equipmentData || []);
        }
    }, [roomData, equipmentData]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Užimtumas</DialogTitle>
            <Grid style={{margin: '0 auto'}}>
                <DataGrid
                    autoHeight
                    rows={gridRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    columnVisibilityModel={{
                        floor: false,
                        description: false,
                    }}
                />
            </Grid>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Uždaryti</Button>
            </DialogActions>
        </Dialog>
    )
}