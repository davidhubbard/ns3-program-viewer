import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import NordTree from "./nord-tree";
import Ns3 from "./ns3/ns3";
import Ns2 from "./ns2/ns2";
import Ns3y from "./ns3/ns3y/ns3y";
import Ns2s from "./ns2/ns2s/ns2s";

class NordList extends Component {
    render() {
        const listItems = this.props.data.map((data) => {
            let result;
            if (data && (data.ext === "ns3f" || data.ext === "ns3l")) {
                result = (
                    <div className="mb-2">
                        {this.props.production && <Ns3 data={data} />}

                        {!this.props.production && (
                            <Tabs id="uncontrolled-tab-example">
                                <Tab eventKey="panel" title="Panel" disabled={false}>
                                    <Ns3 data={data} />
                                </Tab>

                                <Tab eventKey="debug" title="File Properties" disabled={false} className="nord-tree">
                                    <NordTree data={data} />
                                </Tab>
                            </Tabs>
                        )}
                    </div>
                );
            } else if (data && (data.ext === "ns2p" || data.ext === "ns2l")) {
                result = (
                    <div className="mb-2">
                        {this.props.production && <Ns2 data={data} />}

                        {!this.props.production && (
                            <Tabs id="uncontrolled-tab-example">
                                <Tab eventKey="panel" title="Panel" disabled={false}>
                                    <Ns2 data={data} />
                                </Tab>

                                <Tab eventKey="debug" title="File Properties" disabled={false} className="nord-tree">
                                    <NordTree data={data} />
                                </Tab>
                            </Tabs>
                        )}
                    </div>
                );
            } else if (data && data.ext === "ns3y") {
                result = (
                    <div className="mb-2">
                        {this.props.production && <Ns3y data={data} />}

                        {!this.props.production && (
                            <Tabs id="uncontrolled-tab-example">
                                <Tab eventKey="panel" title="Panel" disabled={false}>
                                    <Ns3y data={data} />
                                </Tab>

                                <Tab eventKey="debug" title="File Properties" disabled={false} className="nord-tree">
                                    <NordTree data={data} />
                                </Tab>
                            </Tabs>
                        )}
                    </div>
                );
            } else if (data && data.ext === "ns2s") {
                result = (
                    <div className="mb-2">
                        {this.props.production && <Ns2s data={data} />}

                        {!this.props.production && (
                            <Tabs id="uncontrolled-tab-example">
                                <Tab eventKey="panel" title="Panel" disabled={false}>
                                    <Ns2s data={data} />
                                </Tab>

                                <Tab eventKey="debug" title="File Properties" disabled={false} className="nord-tree">
                                    <NordTree data={data} />
                                </Tab>
                            </Tabs>
                        )}
                    </div>
                );
            } else if (data && data.ext === "nlas") {
                result = (
                    <div className="mb-2">
                        <NordTree data={data} />
                    </div>
                );
            }
            return (
                <li className="list-group-item" key={data.uuid} style={{ padding: "0" }}>
                    {result}
                </li>
            );
        });
        return <ul className="list-group list-group-flush">{listItems}</ul>;
    }
}

export default class NordDevice extends Component {
    shouldComponentUpdate(nextProps, _nextState, _nextContent) {
        if (this.props.data.length !== nextProps.data.length) {
            return true;
        }
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].uuid !== nextProps.data[i].uuid) {
                return true;
            }
            // name is updated when Show all is selected
            if (this.props.data[i].name !== nextProps.data[i].name) {
                return true;
            }
        }
        return false;
    }

    render() {
        return <NordList data={this.props.data} production={this.props.production} />;
    }
}
