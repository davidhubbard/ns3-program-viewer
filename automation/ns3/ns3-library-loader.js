const unzipper = require("unzipper");
const fs = require("fs");
const path = require("path");
const { ns3PianoLibrary } = require("../../server/common/nord-library-piano");
const { ns3SampleLibrary } = require("../../server/common/nord-library-sample");
const { loadNs3SampleFile } = require("../../server/ns3/sample/ns3-sample");
const { loadNs3ProgramFile } = require("../../server/ns3/program/ns3-program");
const homedir = require("os").homedir();

const library = new Map();

/**
 *
 * @param buffer {Buffer}
 * @param filename
 */
const loadSample = (buffer, filename) => {
    const sample = loadNs3SampleFile(buffer, filename);

    if (library.has(sample.sampleValue) === false) {
        const lib = {
            sampleName: sample.name,
            sampleId: -1,
            sampleValue: sample.sampleValue,
            info: sample.info,
            filename: sample.filename,
            version: sample.version,
            category: sample.category,
            programLocNames: [],
        };
        library.set(sample.sampleValue, lib);
        //console.log("sample: ", lib.sampleValue, lib.sampleName);
    } else {
        const lib = library.get(sample.sampleValue);
        throw new Error(
            `oops, sample number ${sample.sampleValue} detected in ${lib.sampleName} and in ${sample.sampleValue} !!!!`
        );
    }
};

const loadProgram = (id, synth, filename) => {
    if (synth.oscillators.type.value === "Sample") {
        const sampleValue = synth.oscillators.waveForm1.value;
        const sampleId = synth.debug.sampleId;

        if (library.has(sampleValue) === false) {
            //console.error(`sample loc${sampleValue} is not yet loaded during ${id.name} parsing...`);

            const lib = {
                sampleName: "",
                sampleId: synth.debug.sampleId,
                sampleValue: sampleValue,
                programLocNames: [id.name],
            };
            library.set(sampleValue, lib);
        } else {
            const lib = library.get(sampleValue);
            if (lib.sampleId !== -1 && lib.sampleId !== sampleId) {
                throw new Error("multiple program are using same sample location with different sample ID !!!");
            }
            lib.sampleId = sampleId;
            lib.programLocNames.push(id.name);
        }
    }
};

const run = async (backupFilename) => {
    const zip = fs.createReadStream(backupFilename).pipe(unzipper.Parse({ forceStream: true }));
    for await (const entry of zip) {
        //console.log("loading", entry.path, "...");

        const ext = path.extname(entry.path);
        if (ext === ".nsmp3") {
            const buffer = await entry.buffer();
            loadSample(buffer, entry.path);
        } else if (ext === ".ns3f") {
            const buffer = await entry.buffer();
            const program = loadNs3ProgramFile(buffer, entry.path);

            //console.log(program.name, program.id.name, program.id.value);
            loadProgram(program.id, program.panelA.synth, entry.path);
            loadProgram(program.id, program.panelB.synth, entry.path);
        }
        entry.autodrain();
    }
};

const backupFilename = homedir + "/downloads/Program Bundle Selection.ns3fb";
//const backupFilename = homedir + "/downloads/Backup 2020-09-20.ns3b";

run(backupFilename).then(() => {
    console.log();

    const sorted = new Map(
        [...library].sort((a, b) => {
            // Some sort function comparing keys with a[0] b[0] or values with a[1] b[1]
            // Be sure to return -1 if lower and, if comparing values, return 0 if equal
            // if (typeof a.sampleName === 'undefined') {
            //     console.log(a);
            // }
            return a[1].sampleName.localeCompare(b[1].sampleName);
        })
    );

    let unusedCount = 0;
    sorted.forEach((x) => {
        if (x.programLocNames.length === 0) {
            unusedCount++;
            console.error(`sample (loc ${x.sampleValue}) ${x.sampleName || "unknown"} is not used`);
        } else {
            console.info(
                `sample 0x${x.sampleId} - (loc ${x.sampleValue}) ${x.sampleName || "unknown"} is used in program ${
                    x.programLocNames
                }`
            );
        }
    });
    console.log();
    console.log(unusedCount, "unused sample(s) detected");

    console.log();
    console.log("New Library:");
    let sampleCount = 0;
    const alreadyInLibrary = [];

    sorted.forEach((x) => {
        if (x.sampleId !== -1 && x.version !== undefined) {
            const id = Number("0x" + x.sampleId.toString());
            const pianoLib = ns3PianoLibrary.get(id);
            const sampleLib = ns3SampleLibrary.get(id);
            if (pianoLib || sampleLib) {
                alreadyInLibrary.push(x);
            } else {
                sampleCount++;
                console.info(
                    `    [0x${x.sampleId}, {name: "${x.sampleName}", info: "${x.info}", version: "${x.version}", category: "${x.category}"}],`
                );
            }
        }
    });

    console.log();
    console.log(sampleCount, "fresh new sample(s) to move in the library :)");

    console.log();
    console.log("Already in Library:");

    alreadyInLibrary.forEach((x) => {
        console.warn(
            `    [0x${x.sampleId}, {name: "${x.sampleName}", info: "${x.info}", version: "${x.version}", category: "${x.category}"}],`
        );
    });

    console.log();
    console.log(alreadyInLibrary.length, "sample(s) already in the library :)");
});
