import React from 'react';
import { DialogContent, DialogTitle, Dialog, Button } from '@material-ui/core';


import LineChartForActivity from "./LineChartForActivity"

export default function GraphOption(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {props.activityPeriod ?
                <React.Fragment>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        View Graph
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="Graph view"
                        aria-describedby="An area chart using canvasjs to show user\'s  his activity in grapgh">
                        <DialogTitle id="title" style={{ width: "500px" }}></DialogTitle>
                        <DialogContent>
                            <LineChartForActivity activityPeriod={props.activityPeriod} />

                        </DialogContent>

                    </Dialog>
                </React.Fragment> : <div>Somthing went wrong, could not render the canvasjs chart </div>}
        </div >
    );
}
