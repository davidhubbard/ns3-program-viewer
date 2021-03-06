import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ns3.css";
import NordLabelAndValueWithMorph from "./lib/nord-label-and-value-with-morph";
import NordValueOnOff from "./lib/nord-value-on-off";
import NordLabelAndValue from "./lib/nord-label-and-value";

export default class Ns3SectionSynthOscillators extends Component {
    render() {
        const osc = this.props.data;

        let lfoModEnvTitle = "LFO/Mod Amt";
        let lfoModEnvValue =
            osc.modulations.lfoAmount.midi < 64 ? osc.modulations.lfoAmount : osc.modulations.modEnvAmount;

        if (osc.modulations.lfoAmount.midi < 64) {
            lfoModEnvTitle = "LFO Amt";
        } else if (osc.modulations.modEnvAmount.midi > 64) {
            lfoModEnvTitle = "Mod Env Amt";
        }

        return (
            <React.Fragment>
                <div className={this.props.className}>
                    <div className="">
                        <div className="nord-option-title">OSC</div>

                        <div>
                            <table className="table-borderless">
                                <tbody>
                                    <tr>
                                        <NordLabelAndValue label="Type" data={osc.type} table={true} />
                                    </tr>
                                    <tr>
                                        <NordValueOnOff label="Fast Atk" data={osc.fastAttack} table={true} />
                                    </tr>
                                    <tr>
                                        <NordLabelAndValue label="Config" data={osc.config} table={true} />
                                    </tr>

                                    <NordLabelAndValueWithMorph label="Ctrl" data={osc.control} />
                                    <tr>
                                        <NordLabelAndValue label="OSC 2 Pitch" data={osc.pitch} table={true} />
                                    </tr>
                                    <NordLabelAndValueWithMorph label={lfoModEnvTitle} data={lfoModEnvValue} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
