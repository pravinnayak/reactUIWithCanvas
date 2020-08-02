import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, TablePagination, Paper, Slide, Typography, Grow } from '@material-ui/core';
import { red } from "@material-ui/core/colors";



import moment from 'moment/moment.js'
import 'moment-timezone';



import './userDetails.css';
import ModalBox from "./modalBox"


const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
        marginTop: 1,

    },
    listCard: {
        margin: 10
    },
    table: {

        position: "absolute",
        bottom: 0,

    },
    error: {
        color: red[500]
    }
}));




//Golden Code to convert any timeZone to Local timeZone 
function timeZoneDifferenceUsingMoment(timeZone, date) {
    var now = moment.utc();

    // get the zone offsets for this time, in minutes
    var tz1_offset = moment.tz.zone(timeZone).utcOffset(now);
    var tz2_offset = moment.tz.zone(moment.tz.guess()).utcOffset(now);

    // calculate the difference in hours
    let diff = (tz1_offset - tz2_offset) * 60 * 1000
    return new Date(new Date(date).getTime() + diff)

}

export default function UserDetails() {
    const classes = useStyles();
    const [userDetails, setUserDetails] = useState({ ok: false, members: [], count: 0, data: [] })
    const [page, setPage] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [details, setDetails] = React.useState({});

    //Fixed to 6 per page.Can be changed to other values
    const rowsPerPage = 6;


    //In functional Component this particular useEffect acts like componentMount of class component react
    useEffect(() => {
        fetch("http://localhost:1234/user/details").then((res) => res.json()).then((response) => {
            if (response.user) {
                // console.log(JSON.parse(response.user))
                let userDetails = JSON.parse(response.user)
                for (let i of userDetails.members) {

                    for (let j of i.activity_periods) {

                        j.start_time = timeZoneDifferenceUsingMoment(i.tz, j.start_time.replace(/PM|AM/gi, ' $&'))
                        j.end_time = timeZoneDifferenceUsingMoment(i.tz, j.end_time.replace(/PM|AM/gi, ' $&'))

                    }

                }
                // console.log(userDetails.members)

                userDetails["count"] = userDetails.members.length;
                userDetails["page"] = Math.ceil(userDetails.count / rowsPerPage)
                let data = []
                for (let i = 0; i < rowsPerPage; i++) {
                    data.push(userDetails.members[i])
                }
                userDetails["data"] = data
                setUserDetails(userDetails)
            }
        })
    }, []);

    //Handle the chane page of pagination
    const handleChangePage = (event, pageNumber) => {

        let removeCount = pageNumber * rowsPerPage
        let limit = (removeCount + rowsPerPage)
        limit = limit > userDetails.count ? userDetails.count : limit;
        let data = [];
        for (let i = removeCount; i < limit; i++) {
            data.push(userDetails.members[i]);
        }
        userDetails.data = data
        setUserDetails(userDetails)
        setPage(pageNumber)
    }

    //Handle users click on the list 
    const handleListClick = (value) => {
        // console.log(value)
        setDetails(value)
        setOpen(true);

        //To add slight animation to the slideup inside the modla box 
        setTimeout(() => {
            setChecked(true)
        }, 300);

    }


    //Used for modal box
    const handleClose = () => {
        setOpen(false);
        setChecked(false)
    };




    return (



        userDetails.count > 0 ?
            <React.Fragment>
                <div>
                    <ModalBox open={open} handleClose={handleClose} checked={checked} details={details} />
                    <List className={classes.root} >
                        <div>
                            {userDetails.ok && userDetails.data.map((value, i) => (
                                <Slide direction="up" timeout={500} key={i} in={true}>
                                    <Paper elevation={3} className="listCard">
                                        <ListItem id={i} onClick={() => { handleListClick(value) }} >
                                            <ListItemAvatar>
                                                <Avatar src={require("./assets/img/profile2.png")}>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={value.real_name} secondary={value.tz} />
                                        </ListItem>
                                    </Paper>
                                </Slide>
                            ))}
                        </div>

                    </List>
                </div>
                <div className={classes.table}>

                    <TablePagination component="div" onChangePage={handleChangePage} count={userDetails.count} page={page} rowsPerPage={rowsPerPage} rowsPerPageOptions={[6]} ></TablePagination>


                </div>
            </React.Fragment >
            : <Grow in={true} timeout={1500}>
                <Paper elevation={0} >
                    <Typography variant="h6" className={classes.error}> Sorry we were not able to fetch user details as of now (The server might be down), Please try again later.
                      </Typography>
                </Paper>
            </Grow>

    );
}
