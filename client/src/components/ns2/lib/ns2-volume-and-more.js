import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../lib/ns3.css";
import NordValueOnOff from "./nord-value-on-off";
import NordLabelAndValue from "./nord-label-and-value";
import NordLabelAndValueWithMorph from "./nord-label-and-value-with-morph";
import NordLabel from "./nord-label";

export default class Ns2VolumeAndMore extends Component {
    render() {
        const section = this.props.data;
        const octaveShift =
            (section.octaveShift.value >= 0 ? "+" + section.octaveShift.value : section.octaveShift.value) + " oct";

        return (
            <React.Fragment>
                <div className="m-1 text-center">
                    <div>
                        <h6 className="mt-1 font-weight-bold">{this.props.name}</h6>

                        <div className="my-2">
                            <NordLabel label="Level" />
                            <table className="text-left" style={{ marginLeft: "auto", marginRight: "auto" }}>
                                <tbody>
                                    <NordLabelAndValueWithMorph data={section.volume} upperCase={false} />
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <NordLabel label="Kb Zone" />
                            <div className="">
                                <span className={section.kbZone.array[0] ? "dot dot-kb-zone " : "dot"} />
                                <span className={section.kbZone.array[1] ? "dot dot-kb-zone " : "dot"} />
                                <span className={section.kbZone.array[2] ? "dot dot-kb-zone " : "dot"} />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <NordLabelAndValue enabled={section.octaveShift.value !== 0} data={{ value: octaveShift }} />
                    </div>

                    <div>
                        <NordValueOnOff label="Pstick" data={section.pitchStick} />
                        <span className="m-1" />
                        <NordValueOnOff label="LatchPed" data={section.latchPedal} />
                    </div>

                    <div>
                        <NordValueOnOff label="SustPed" data={section.sustainPedal} />
                        <span className="m-1" />
                        <NordValueOnOff label="KbGate" data={section.kbGate} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
