import React, {
    Component
} from 'react';
import CanvasJSReact from './assets/lib/CanvasJsReact/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class RangeColumnChart extends Component {

    render() {

        // Usage
        let startMinutes = this.props.activityPeriod.start_time.getMinutes()
        let endMinutes = this.props.activityPeriod.end_time.getMinutes()
        startMinutes = startMinutes < 10 ? "0" + startMinutes : startMinutes
        endMinutes = endMinutes < 10 ? "0" + endMinutes : endMinutes
        // console.log(startMinutes, endMinutes)



        let dataPoints = [{
            x: this.props.activityPeriod.start_time,
            y: Number(this.props.activityPeriod.start_time.getHours() + "." + startMinutes),
            markerColor: "green",
            markerType: "circle"
        }, {
            x: this.props.activityPeriod.end_time,
            y: Number(this.props.activityPeriod.end_time.getHours() + "." + endMinutes),
            markerColor: "red",
            markerType: "circle"
        }]
        // console.log(dataPoints)



        const options = {
            theme: "light2",
            zoomEnabled: true,
            zoomType: "y",
            exportEnabled: true,
            animationEnabled: true,
            animationDuration: 2000,
            height: "300",
            axisY: {
                // includeZero: false,
                // interval: 2,
                // viewportMinimum: 0,
                // viewportMaximum: 24,
                labelFormatter: function (e) {
                    if (e.value === 12) {
                        return e.value + " PM"
                    } else if (e.value > 12 && e.value < 13) {
                        return e.value + " PM"
                    } else if (e.value >= 13) {
                        return e.value - 12 + " PM"
                    } else {
                        return e.value + " AM"
                    }
                }
            },

            toolTip: {
                shared: true,
                contentFormatter: function (e) {

                    let content = "";
                    let dataPoint = e.entries.slice(-1).pop().dataPoint
                    let y = dataPoint.y
                    let x = dataPoint.x
                    if (y === 12) {
                        content += "Date:<strong>" + new Date(x).toDateString() + "</strong> <br/>Time:<strong> 12 PM </strong>";
                    } else if (y > 12 && y < 13) {

                        content += "Date:<strong>" + new Date(x).toDateString() + "</strong>"
                        content += "<br> Time:<strong>" + y + " PM </strong>"

                    } else if (y >= 13) {

                        content += "Date:<strong>" + new Date(x).toDateString() + "</strong>"
                        content += "<br> Time:<strong>" + (y - 12).toFixed(2) + " PM </strong>"
                        // console.log(content)

                    } else {
                        content += "Date:<strong>" + new Date(x).toDateString() + "</strong> <br>Time:<strong>" + y + " AM </strong>";
                    }
                    return content;
                }
            },

            title: {
                text: ""
            },
            data: [{
                type: "area",
                dataPoints: dataPoints,

            }]
        }

        return (
            <div >
                <CanvasJSChart options={
                    options
                }
                    onRef={
                        ref => this.chart = ref
                    }
                /> {
                    /*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/
                }
            </div >
        );
    }
}

export default RangeColumnChart;