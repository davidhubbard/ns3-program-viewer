import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ns3.css";
import Ns3LabelAndValueWithMorph from "./lib/ns3-label-and-value-with-morph";
import Ns3ValueOnOff from "./lib/ns3-value-on-off";
import Ns3LabelAndValue from "./lib/ns3-label-and-value";

export default class Ns3SectionSynthLfo extends Component {
    render() {
        const lfo = this.props.data;

        return (
            <React.Fragment>
                <div className={this.props.className}>
                    <div className="justify-content-center">
                        <div>
                            <strong>LFO</strong>
                        </div>

                        <table className="table-borderless nord-option-on-no-uppercase">
                            <tbody>
                                <tr>
                                    <Ns3LabelAndValueWithMorph label="Rate" data={lfo.rate} />
                                </tr>
                                <tr>
                                    <Ns3LabelAndValue label="Wave" data={lfo.wave}  table={true}/>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <Ns3ValueOnOff label="Mst Clk" data={lfo.masterClock} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}