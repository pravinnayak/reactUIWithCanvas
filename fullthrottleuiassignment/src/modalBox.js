import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Slide, Grid, Typography, Backdrop, Modal, IconButton } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import moment from 'moment/moment.js'
import 'moment-timezone';
import CloseIcon from '@material-ui/icons/Close';
import { red } from "@material-ui/core/colors"

import ExpandActiviy from "./expandActivity"



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: "85%",
        minHeight: "85%",
        // height: "85%",
        padding: theme.spacing(2),
        "&:focus": {
            outline: "none"
        }
    },
    b: {
        fontWeight: "bolder"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    close: {
        float: "right",
        marginTop: -10,
        "&:hover": {
            color: red[500]
        }
    }

}));

export default function ModalBox(props) {
    const classes = useStyles();


    //Function to give the new Activity Period Based on selected Dates from user
    const selectActivityBetween = (startDate, endDate) => {
        // console.log(startDate, endDate)
        let details = []
        for (let i of props.details.activity_periods) {
            // console.log(new Date(i.end_time), endDate, new Date(i.end_time) <= endDate)
            if (new Date(i.start_time) >= startDate && new Date(i.end_time) <= endDate) {
                details.push(i)
            }
        }
        let copyJson = JSON.parse(JSON.stringify(props.details))
        copyJson.activity_periods = details
        // console.log(copyJson)
        setDetails(copyJson);
    }

    //The object that is passedd to Expand Accordion and will change if the user changes his calendar date
    const [details, setDetails] = React.useState({})

    //2 Calendar date one is from date
    const [fromDate, setFromDate] = React.useState(null);
    //Other is to date
    const [toDate, setToDate] = React.useState(null);



    //Called when the user changes his selectection from the list of users
    const init = () => {
        props.details.activity_periods.sort(function (obj1, obj2) {
            // console.log(new Date(obj1.start_time), new Date(obj2.start_time), new Date(obj1.start_time) > new Date(obj2.start_time))
            return new Date(obj1.start_time) < new Date(obj2.start_time) ? -1 : 1
        })
        setDetails(props.details)

        if (props.details.activity_periods.length > 0) {
            let fromDate = new Date(new Date(props.details.activity_periods[0].start_time).setHours(0, 0, 0))
            setFromDate(fromDate);

            let toDate = new Date(new Date(props.details.activity_periods.slice(-1).pop().end_time).setHours(23, 59, 59))
            setToDate(toDate)
            selectActivityBetween(fromDate, toDate)
        }
    }
    if (props.details.activity_periods && !fromDate && !toDate) {
        //Called for the first time
        init()
    } else if (props.details.real_name !== details.real_name) {
        //Called when the user changes
        init()
    }






    //Handler for from date change
    const handleFromDateChange = (date) => {
        setFromDate(date);
        selectActivityBetween(new Date(date), new Date(toDate))
    };

    //Handler for TO date changer
    const handleToDateChange = (date) => {
        let toDate = new Date(new Date(date).setHours(23, 59, 59))
        setToDate(toDate);
        selectActivityBetween(new Date(fromDate), toDate)
    };



    return (
        <div>
            {props.details.real_name ?
                <Modal
                    // disableEnforceFocus
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={props.open}
                    onClose={props.handleClose}
                    closeAfterTransition

                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 700,
                    }}
                >
                    {/* { Slider Animation for Modal content } */}
                    <Slide direction="up" in={props.checked && props.open} mountOnEnter unmountOnExit>
                        <Paper id="ModalPaper" className={classes.paper} elevation={4} >
                            <IconButton className={classes.close} onClick={props.handleClose} >
                                <CloseIcon />
                            </IconButton>


                            <h3 id="title">{props.details.real_name + "'s  Activity" || "UserNamePlaceHolder's Activity"}</h3>

                            <Typography variant="subtitle2" display="inline" style={{ color: "#5f5f5f" }}>
                                All users activity is converted to
                            <Typography variant="inherit" display="inline" style={{ fontWeight: "bolder" }}>  Local Time({" " + moment.tz.guess() + " "})</Typography>
                                <br />
                                <Typography variant="caption" display="inline" >  Below selected default dates are from the start of your activity to the end.</Typography>

                            </Typography>

                            <Grid container spacing={1}>
                                <Grid item sm={3} xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="datePickerFrom"
                                            label="Select From date (dd-mm-yyyy)"
                                            format="dd-MM-yyyy"
                                            value={fromDate}
                                            onChange={handleFromDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="datePickerTo"
                                            label="Select To date (dd-mm-yyyy)"
                                            format="dd-MM-yyyy"
                                            value={toDate}
                                            onChange={handleToDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>


                                </Grid>
                                {/* Accordion for each user */}
                                <Grid item sm={12} xs={12}>
                                    <ExpandActiviy details={details} />
                                </Grid>





                            </Grid>

                        </Paper>
                    </Slide>


                </Modal> : <div> </div>}
        </div >
    );
}
