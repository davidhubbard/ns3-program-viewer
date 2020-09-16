import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ns3.css";
import Ns3ValueOnOff from "./lib/ns3-value-on-off";
import Ns3LabelAndValue from "./lib/ns3-label-and-value";

export default class Ns3FxCompressor extends Component {
    render() {
        const fx = this.props.data;
        const visible = fx.enabled;
        const align = this.props.other === true ? "align-self-end": "align-self-center";
;
        return (
            <React.Fragment>
                <div className={visible ? "d-flex nord-on " + align : "d-none"}>
                    <div className={this.props.className}>
                        <div className="text-left">
                            <div className="nord-option-title">COMPRESSOR</div>

                            <table className="table-borderless">
                                <tbody>
                                    <Ns3LabelAndValue label="Amount" data={fx.amount} table={true} />
                                    <tr>
                                        <td colSpan="3">
                                            <Ns3ValueOnOff label="Fast" data={fx.fast} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
