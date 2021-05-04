import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { ns3Model } from "./nord/ns3/model/ns3-model";
import NordDevice from "./nord/nord-device";
import Button from "react-bootstrap/Button";
import { buildExport } from "./export/export-pdf";
import Home from "./Home";
import LoadButton from "./LoadButton";

const clonedeep = require("lodash.clonedeep");

const isElectron = /electron/i.test(navigator.userAgent);
console.log("Electron:", isElectron);

class Main extends Component {
    constructor(props) {
        super(props);

        this.title = ""; //`v${process.env.REACT_APP_VERSION}`;
        this.production = true; //process.env.NODE_ENV === "production";

        if (this.production) {
            if (ns3Model.slotA) {
                ns3Model.slotA.enabled = false;
                ns3Model.slotB.enabled = false;
            }
            if (ns3Model.panelA) {
                ns3Model.panelA.enabled = false;
                ns3Model.panelB.enabled = false;
            }
        }
        this.state = {
            loaded: false,
            loading: false,
            data: [ns3Model],
            originalData: clonedeep([ns3Model]),
            error: null,
            showAll: false,
            exporting: false,
            exportDetails: "",
        };
    }

    onSuccess = (data) => {
        //console.log("success: ", data);
        if (data.success) {
            this.setState({
                loaded: true,
                loading: false,
                data: data.data,
                originalData: clonedeep(data.data),
                error: null,
                showAll: false,
            });
        } else {
            this.onError(data);
        }
    };

    onError = (err) => {
        this.setState({ loaded: false, loading: false, error: err.error, showAll: false });
        toast.error(this.state.error);
    };

    handleFile = async (files) => {
        if (!files) return;

        this.setState({ loading: true });

        if (isElectron) {
            try {
                const bundle = [];
                for (const file of files) {
                    bundle.push({
                        path: file.path,
                        name: file.name,
                    });
                }
                const response = await window.electron.downloadFiles(bundle);
                this.onSuccess(response);
            } catch (e) {
                this.onError({ error: e.message });
            }
            return;
        }

        const formData = new FormData();
        for (const file of files) {
            formData.append("nordFiles", file);
        }

        await axios
            .post("api/upload", formData, {})
            .then((res) => {
                this.onSuccess(res.data);
            })
            .catch((err) => {
                this.onError(err.response.data);
            });
    };

    handleShowAll = () => {
        if (!this.state.showAll) {
            const newData = clonedeep(this.state.data);
            for (const item of newData) {
                if (item.ext === "ns3f" || item.ext === "ns2p") {
                    item.name += " - (All Instruments Visible)";
                    const panelA = item.panelA || item.slotA;
                    const panelB = item.panelB || item.slotB;

                    panelA.organ.dimmed = !panelA.enabled || !panelA.organ.enabled;
                    panelA.piano.dimmed = !panelA.enabled || !panelA.piano.enabled;
                    panelA.synth.dimmed = !panelA.enabled || !panelA.synth.enabled;
                    panelA.extern.dimmed = !panelA.enabled || !panelA.extern.enabled;

                    panelA.enabled = true;
                    panelA.organ.enabled = true;
                    panelA.piano.enabled = true;
                    panelA.synth.enabled = true;
                    panelA.extern.enabled = true;

                    panelB.organ.dimmed = !panelB.enabled || !panelB.organ.enabled;
                    panelB.piano.dimmed = !panelB.enabled || !panelB.piano.enabled;
                    panelB.synth.dimmed = !panelB.enabled || !panelB.synth.enabled;
                    panelB.extern.dimmed = !panelB.enabled || !panelB.extern.enabled;

                    panelB.enabled = true;
                    panelB.organ.enabled = true;
                    panelB.piano.enabled = true;
                    panelB.synth.enabled = true;
                    panelB.extern.enabled = true;
                }
            }

            this.setState((prevState) => ({
                showAll: true,
                data: newData,
            }));
        } else {
            this.setState((prevState) => ({
                showAll: false,
                data: clonedeep(prevState.originalData),
            }));
        }
    };

    handleExport = () => {
        const callback = (name) => {
            this.setState({ exportDetails: name });
        };
        this.setState({ exporting: true }, async () => {
            await buildExport(this.state.data, this.state.showAll, callback).catch((e) => toast.error(e.message));
            this.setState({ exporting: false });
        });
    };

    render() {
        return (
            <>
                {!this.state.loaded && (
                    <Home loading={this.state.loading} loaded={this.state.loaded} handleFile={this.handleFile} />
                )}

                {this.state.loaded && (
                    <div className=" d-flex flex-column min-vh-100">
                        <div className=" flex-grow-1">
                            <Container>
                                <div className="row mt-2">
                                    {this.state.loaded && (
                                        <>
                                            <div className="col-auto align-self-start">
                                                <LoadButton
                                                    loading={this.state.loading}
                                                    loaded={this.state.loaded}
                                                    handleFile={this.handleFile}
                                                />
                                            </div>

                                            <div className="col-auto align-self-center">
                                                <span className="mr-2">Show All Instruments</span>

                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    className={this.state.showAll ? "mr-1" : "mr-1 disabled"}
                                                    //className="mr-1"
                                                    //disabled={!this.state.showAll}
                                                    onClick={this.handleShowAll}
                                                >
                                                    On
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    className={this.state.showAll ? "mr-1 disabled" : "mr-1"}
                                                    //className="mr-1"
                                                    //disabled={this.state.showAll}
                                                    onClick={this.handleShowAll}
                                                >
                                                    Off
                                                </Button>
                                            </div>

                                            <div className="col-auto align-self-center" />

                                            <div className="col-auto align-self-center">
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    //className={this.state.exporting ? "disabled" : "active"}
                                                    disabled={this.state.exporting}
                                                    onClick={this.handleExport}
                                                >
                                                    {this.state.exporting
                                                        ? "Saving " + this.state.exportDetails
                                                        : "Save"}
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Container>

                            <NordDevice
                                data={this.state.data}
                                showAll={this.state.showAll}
                                production={this.production}
                            />
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Main;
