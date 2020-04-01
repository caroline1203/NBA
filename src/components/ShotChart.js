// import React, {Component} from 'react';
// import nba from '../nba-client';
// import * as d3 from 'd3';
// import {hexbin} from 'd3-hexbin';
// import {court, shots} from 'd3-shotchart';
// import PropTypes from "prop-types";
//
// window.d3_hexbin = {hexbin : hexbin};
//
//
// class ShotChart extends React.Component {
//     static propTypes = {
//         playerId : PropTypes.number,
//         minCount : PropTypes.number,
//         chartType : PropTypes.string,
//         displayToolTip : PropTypes.bool,
//     }
//
//     componentDidMount() {
//         nba.stats.shots({
//             PlayerID: this.props.playerId
//         }).then((response) =>{
//             console.log(response);
//             const final_shots = response.shot_Chart_Detail.map(shot => ({
//                 x:(shot.locX + 250)/10,
//                 y:(shot.locY + 50)/10,
//                 action_type: shot.actionType,
//                 shot_distance: shot.shotDistance,
//                 shot_made_flag: shot.shotMadeFlag,
//             }));
//
//             const courtSelection = d3.select("#shot_chart");
//             const chart_court = court().width(500);
//             const chart_shorts = shots().shotRenderThreshold(2).displayToolTips(true).displayType("hexbin");
//             courtSelection.call(chart_court);
//             courtSelection.datum(final_shots).call(chart_shorts);
//         });
//     }
//
//     render() {
//         return (
//             <div id="shot_chart">
//             </div>
//         );
//     }
// }
//
// export default ShotChart;

import React from 'react';
import nba from '../nba-client';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import { court, shots } from 'd3-shotchart';
import PropTypes from 'prop-types';

window.d3_hexbin = {hexbin : hexbin}; // workaround library problem

class ShotChart extends React.Component {
    static propTypes = {
        playerId: PropTypes.number,
        minCount: PropTypes.number,
        chartType: PropTypes.string,
        displayTooltip: PropTypes.bool,
    }
    componentDidUpdate(){

        nba.stats.shots({
            PlayerID: this.props.playerId
        }).then((response) => {
            const final_shots = response.shot_Chart_Detail.map(shot => ({
                x: (shot.locX + 250) / 10,
                y: (shot.locY + 50) / 10,
                action_type: shot.actionType,
                shot_distance: shot.shotDistance,
                shot_made_flag: shot.shotMadeFlag,
            }));

            const courtSelection = d3.select("#shot-chart");
            courtSelection.html('');
            const chart_court = court().width(500);
            const chart_shots = shots().shotRenderThreshold(this.props.minCount).displayToolTips(this.props.displayTooltip).displayType(this.props.chartType);
            courtSelection.call(chart_court);
            courtSelection.datum(final_shots).call(chart_shots);
        });
    }
    render() {
        return (
            <div id="shot-chart"></div>
        );
    }
}

export default ShotChart;