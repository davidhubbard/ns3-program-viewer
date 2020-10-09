const {ns3SampleLibrary} = require("./ns3-library-sample");
const { ns3PianoLibrary } = require("./ns3-library-piano");

/***
 * returns sample library object
 *
 * @param sampleId
 * @param clavinetModel
 * @param location
 * @returns {{size: (string|string), value: (string|*), version: string, info: string}}
 */
exports.getSample = (sampleId, clavinetModel, location, ) => {
    let sampleLib = ns3PianoLibrary.get(sampleId) || ns3SampleLibrary.get(sampleId);
    let sampleInfo = "";
    let sampleVersion = "";
    let sampleSize = "";

    // special clavinet multi sample case...
    if (sampleLib instanceof Array) {
        if (clavinetModel >= 0 && clavinetModel < sampleLib.length) {
            sampleLib = sampleLib[clavinetModel];
        } else {
            sampleLib = sampleLib[0] + " unknown variation";
        }
        // this is required as all piano library entries are not yet converted to the new format
    } else if (sampleLib && sampleLib.name) {
        sampleVersion = sampleLib.version ? "v" + sampleLib.version : "";
        sampleInfo = sampleLib.info;
        sampleLib = sampleLib.name;
        sampleSize = sampleLib.size;
    }
    if (!sampleLib) {
        // fallback if piano name is unknown
        if (location) {
            sampleLib = "Unknown (Loc " + location + ")";
        } else { // on NS2 the location is not available in the program !
            sampleLib = "Unknown";
        }
    }
    return {
        value: sampleLib,
        info: sampleInfo,
        version: sampleVersion,
        size: sampleSize ? byteSize(sampleSize).toString() : "",
    };
};