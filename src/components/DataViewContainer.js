import React, {Component} from 'react';
import lodash from 'lodash'
import {Radio, Row, Col, Switch} from 'antd';

import ShotChart from './ShotChart';
import CounterSlider from './CounterSlider'

class DataViewContainer extends Component {
    state = {
        minCount : 2,
        chartType : "hexbin",

    }
    onCountSliderChange = (count) => {this.setState({minCount : count})}

    onChartTypeChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            chartType: e.target.value,
        });
    };

    render() {
        return (
            <div className="data-view">
                <ShotChart playerId={this.props.playerId} minCount={this.state.minCount} chartType={this.state.chartType}/>
                <div className="filters">
                    <CounterSlider value = {this.state.minCount} onCountSliderChange = {lodash.debounce(this.onCountSliderChange, 500)}/>
                    <br/>
                    <Row>
                        <Col span={9}>
                            <Radio.Group onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </Radio.Group>
                        </Col>

                        <Col span={4}>
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                />

                        </Col>
                    </Row>


                </div>

            </div>


        );
    }
}

export default DataViewContainer;