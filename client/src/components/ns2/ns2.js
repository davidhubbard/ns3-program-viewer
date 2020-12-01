import React, { Component } from "react";
import "../lib/ns3.css";
import Ns2Slot from "./ns2-slot";
import NordLabelAndValue from "./lib/nord-label-and-value";
import NordLabel from "./lib/nord-label";

export default class Ns2 extends Component {
    render() {
        const data = this.props.data;

        return (
            <div className={data.slotA.enabled === false && data.slotB.enabled === false ? "d-none" : ""}>
                <div className="row no-gutters ns3-header justify-content-between d-flex flex-wrap">
                    <div className="col align-self-center">
                        <h3 className="ns3-header-name">
                            {data.id.name} {data.name}
                        </h3>
                        <div className="nord-option-on">
                            Category {data.category} <small className="nord-option-on">V{data.version}</small>
                        </div>
                    </div>

                    <div className="col-2 text-right nord-option-on">
                        <NordLabel label="Master Clock" />
                        <br />
                        <NordLabelAndValue data={data.masterClock.rate} />
                    </div>
                    <div className="col-1 text-right nord-option-on">
                        <NordLabel label="Transpose" enabled={data.transpose.enabled} />
                        <br />
                        <NordLabelAndValue data={data.transpose}  enabled={data.transpose.enabled}/>
                    </div>
                    <div className={data.split.enabled ? "col-1 text-right mr-1" : "col-1 text-right mr-1"  }>
                        <NordLabel enabled={data.split.enabled} label="Split" />
                    </div>
                    <div className={data.split.enabled ? "col-1 mt-1" : "d-none"}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="nord-split ">{data.split.low.note}</span>
                                    </td>
                                    <td>
                                        <span className="nord-split ">{data.split.high.note}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-1 text-right nord-option-on">
                        <NordLabel enabled={data.dualKeyboard.enabled} label="Dual KB" />
                        {/*<br />*/}
                        {/*<NordLabelAndValue enabled={data.dualKeyboard.enabled} data={data.dualKeyboard} />*/}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className={data.slotA.enabled ? "nord-on" : "nord-off"}>
                            <Ns2Slot name="A" data={data.slotA} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={data.slotB.enabled ? "nord-on" : "nord-off"}>
                            <Ns2Slot name="B" data={data.slotB} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
