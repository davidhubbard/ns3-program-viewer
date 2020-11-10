// this file is auto-generated with builder.js

const { loadTestCase } = require("./helpers");

const root = __dirname + "/ns2/synth/oscillators/";

describe("/ns2/synth/oscillators", () => {
    test("slotA.synth.filter.frequency.value eq 20 Hz and slotA.synth.filter.frequency.morph.wheel.to.value eq 21 kHz", async () => {
        const file = "slotA.synth.filter.frequency.value eq 20 Hz and slotA.synth.filter.frequency.morph.wheel.to.value eq 21 kHz.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.frequency.value eq 21 kHz and slotA.synth.filter.frequency.morph.wheel.to.value eq 20 Hz", async () => {
        const file = "slotA.synth.filter.frequency.value eq 21 kHz and slotA.synth.filter.frequency.morph.wheel.to.value eq 20 Hz.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.frequency.value eq 385 Hz and slotA.synth.filter.frequency.morph.wheel.to.value eq 21 kHz", async () => {
        const file = "slotA.synth.filter.frequency.value eq 385 Hz and slotA.synth.filter.frequency.morph.wheel.to.value eq 21 kHz.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.modulation2.value eq 0.0 and slotA.synth.filter.modulation2.label eq VEL AMT", async () => {
        const file = "slotA.synth.filter.modulation2.value eq 0.0 and slotA.synth.filter.modulation2.label eq VEL AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.modulation2.value eq 0.0 and slotA.synth.filter.modulation2.label eq VEL@aEnv AMT", async () => {
        const file = "slotA.synth.filter.modulation2.value eq 0.0 and slotA.synth.filter.modulation2.label eq VEL@aEnv AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.modulation2.value eq 10.0 and slotA.synth.filter.modulation2.label eq Mod Env AMT", async () => {
        const file = "slotA.synth.filter.modulation2.value eq 10.0 and slotA.synth.filter.modulation2.label eq Mod Env AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.modulation2.value eq 10.0 and slotA.synth.filter.modulation2.label eq VEL AMT", async () => {
        const file = "slotA.synth.filter.modulation2.value eq 10.0 and slotA.synth.filter.modulation2.label eq VEL AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.modulation2.value eq 5.0 and slotA.synth.filter.modulation2.label eq Mod Env AMT", async () => {
        const file = "slotA.synth.filter.modulation2.value eq 5.0 and slotA.synth.filter.modulation2.label eq Mod Env AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.modulation2.value eq 5.0 and slotA.synth.filter.modulation2.label eq VEL AMT", async () => {
        const file = "slotA.synth.filter.modulation2.value eq 5.0 and slotA.synth.filter.modulation2.label eq VEL AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.type.value eq BP", async () => {
        const file = "slotA.synth.filter.type.value eq BP.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.type.value eq HP", async () => {
        const file = "slotA.synth.filter.type.value eq HP.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.type.value eq LP12", async () => {
        const file = "slotA.synth.filter.type.value eq LP12.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.type.value eq LP24", async () => {
        const file = "slotA.synth.filter.type.value eq LP24.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.filter.type.value eq NOTCH", async () => {
        const file = "slotA.synth.filter.type.value eq NOTCH.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.shapeCtrl.value eq 0.0 and slotA.synth.oscillators.shapeCtrl.morph.wheel.enabled eq false", async () => {
        const file = "slotA.synth.oscillators.shapeCtrl.value eq 0.0 and slotA.synth.oscillators.shapeCtrl.morph.wheel.enabled eq false.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.shapeCtrl.value eq 0.0 and slotA.synth.oscillators.shapeCtrl.morph.wheel.to.value eq 10.0", async () => {
        const file = "slotA.synth.oscillators.shapeCtrl.value eq 0.0 and slotA.synth.oscillators.shapeCtrl.morph.wheel.to.value eq 10.0.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.shapeCtrl.value eq 10.0 and slotA.synth.oscillators.shapeCtrl.morph.wheel.to.value eq 0.0", async () => {
        const file = "slotA.synth.oscillators.shapeCtrl.value eq 10.0 and slotA.synth.oscillators.shapeCtrl.morph.wheel.to.value eq 0.0.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.shapeMod.value eq 0.0 and slotA.synth.oscillators.shapeMod.label eq LFO AMT", async () => {
        const file = "slotA.synth.oscillators.shapeMod.value eq 0.0 and slotA.synth.oscillators.shapeMod.label eq LFO AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.shapeMod.value eq 0.0 and slotA.synth.oscillators.shapeMod.label eq LFO@aEnv AMT", async () => {
        const file = "slotA.synth.oscillators.shapeMod.value eq 0.0 and slotA.synth.oscillators.shapeMod.label eq LFO@aEnv AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.shapeMod.value eq 10.0 and slotA.synth.oscillators.shapeMod.label eq LFO AMT", async () => {
        const file = "slotA.synth.oscillators.shapeMod.value eq 10.0 and slotA.synth.oscillators.shapeMod.label eq LFO AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.shapeMod.value eq 10.0 and slotA.synth.oscillators.shapeMod.label eq Mod Env AMT", async () => {
        const file = "slotA.synth.oscillators.shapeMod.value eq 10.0 and slotA.synth.oscillators.shapeMod.label eq Mod Env AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.shapeMod.value eq 5.0 and slotA.synth.oscillators.shapeMod.label eq LFO AMT", async () => {
        const file = "slotA.synth.oscillators.shapeMod.value eq 5.0 and slotA.synth.oscillators.shapeMod.label eq LFO AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.shapeMod.value eq 5.0 and slotA.synth.oscillators.shapeMod.label eq Mod Env AMT", async () => {
        const file = "slotA.synth.oscillators.shapeMod.value eq 5.0 and slotA.synth.oscillators.shapeMod.label eq Mod Env AMT.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.type.value eq SAMPLE and slotA.synth.oscillators.waveForm1.location eq 0", async () => {
        const file = "slotA.synth.oscillators.type.value eq SAMPLE and slotA.synth.oscillators.waveForm1.location eq 0.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.type.value eq SAMPLE and slotA.synth.oscillators.waveForm1.location eq 998", async () => {
        const file = "slotA.synth.oscillators.type.value eq SAMPLE and slotA.synth.oscillators.waveForm1.location eq 998.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.type.value eq WAVE and slotA.synth.oscillators.waveForm1.location eq 0", async () => {
        const file = "slotA.synth.oscillators.type.value eq WAVE and slotA.synth.oscillators.waveForm1.location eq 0.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.type.value eq WAVE and slotA.synth.oscillators.waveForm1.location eq 30", async () => {
        const file = "slotA.synth.oscillators.type.value eq WAVE and slotA.synth.oscillators.waveForm1.location eq 30.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.type.value eq WAVE and slotA.synth.oscillators.waveForm1.location eq 61", async () => {
        const file = "slotA.synth.oscillators.type.value eq WAVE and slotA.synth.oscillators.waveForm1.location eq 61.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq FM 9.1", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq FM 9.1.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq FM 9.12", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq FM 9.12.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq FM Sin", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq FM Sin.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq PULSE ShP", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq PULSE ShP.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq PULSE Snc", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq PULSE Snc.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq PULSE dtn", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq PULSE dtn.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq SAW ---", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq SAW ---.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq SAW ShP", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq SAW ShP.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq SAW Snc", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq SAW Snc.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq SAW dtn", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq SAW dtn.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq TRI ---", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq TRI ---.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq TRI ShP", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq TRI ShP.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq TRI Snc", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq TRI Snc.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

    test("slotA.synth.oscillators.waveForm1.value eq TRI dtn", async () => {
        const file = "slotA.synth.oscillators.waveForm1.value eq TRI dtn.ns2p";
        const sut = await loadTestCase(root + file);
        sut.data.forEach((d) => {
            expect(d.actual).toEqual(d.expected);
        });
    });

});
