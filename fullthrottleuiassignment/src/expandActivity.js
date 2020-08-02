import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import moment from 'moment/moment.js'
import 'moment-timezone';
import { green, red } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Paper, Grid, makeStyles } from '@material-ui/core';
import GraphOption from "./graphOption";



const useStyles = makeStyles((theme) => ({
    active: { fontSize: 10, color: green[500] },
    lastSeen: { fontSize: 10, color: red[500] },
    error: {
        color: red[500]
    }

}));


const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },

    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 66,
        '&$expanded': {
            minHeight: 66,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

export default function ExpandActivity(props) {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            {props.details.activity_periods.length > 0 ?
                props.details.activity_periods.map((value, key) => (
                    <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Activity {key + 1} started on {moment(value.start_time).format("DD MMM YY")}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item sm={9} xs={12}>
                                    <Typography variant="subtitle2">
                                        You were active from <br />
                                        <FiberManualRecordIcon className={classes.active} /> {moment(value.start_time).format("DD MMM YY hh:mm:ss A")}&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;<FiberManualRecordIcon className={classes.lastSeen} />{moment(value.end_time).format("DD MMM YY hh:mm:ss A")}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} xs={12}>
                                    <GraphOption activityPeriod={value} />
                                </Grid>

                            </Grid>

                        </AccordionDetails>
                    </Accordion>

                ))
                : <Paper elevation={0} > <Typography variant="h6" className={classes.error}> Looks like you dont have Any activity between the selected dates please choose some other dates</Typography>   </Paper>}
        </div>
    );
}
