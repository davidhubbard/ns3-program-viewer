const mapping = require("./mapping");
const converter = require("./converter");
const {Morph} = require("./model/ns3");



const getDrawbars = function (buffer, offset) {
    const organDrawbar0Flag = buffer.readUInt8(offset);                 // 0xbe
    const organDrawbar1Flag = buffer.readUInt8(offset + 2);       // 0xc0
    const organDrawbar2Flag = buffer.readUInt16BE(offset + 4);    // 0xc2
    const organDrawbar3Flag = buffer.readUInt8(offset + 7);       // 0xc5
    const organDrawbar4Flag = buffer.readUInt8(offset + 9);       // 0xc7
    const organDrawbar5Flag = buffer.readUInt16BE(offset + 11);    // 0xc9
    const organDrawbar6Flag = buffer.readUInt8(offset + 14);       // 0xcc
    const organDrawbar7Flag = buffer.readUInt16BE(offset + 16);    // 0xce
    const organDrawbar8Flag = buffer.readUInt8(offset + 19);       // 0xd1

    return [
        (organDrawbar0Flag & 0xf0) >> 4,
        (organDrawbar1Flag & 0x1e) >> 1,
        (organDrawbar2Flag & 0b0000001111000000) >> 6,  //0x03c0
        (organDrawbar3Flag & 0b01111000) >> 3,
        (organDrawbar4Flag & 0x0f),
        (organDrawbar5Flag & 0b0000000111100000) >> 5,
        (organDrawbar6Flag & 0b00111100) >> 2,
        (organDrawbar7Flag & 0b0000011110000000) >> 7,
        (organDrawbar8Flag & 0xf0) >> 4
    ];
}

const getVolume = function(value) {
    return {
        midi: value,
        //label: (value === 0) ? "Off": mapping.dBMap.get(value)
        label: mapping.dBMap.get(value)
    };
}

/***
 * Returns two values from a single knob (and equivalent midi value).
 * Settings like Osc modulation (lfo/env mod) and Filter modulation (vel/env mod) are using this option
 * to define two settings with a single knob.
 * Input Value is not the direct midi value as usual, instead it is coded on a special 0/120 range:
 * 0   = 10.0 (100% left value, example LFO Amount),
 * 60  = 0.0 for both values,
 * 120 = 10.0 (100% right value, example Mod Env Amount)
 * @param valueRange120
 * @returns {{midi: number, leftValue: string, rightValue: string}}
 */
const getKnobDualValues = function(valueRange120) {
    const valueRange127 = Math.ceil(((valueRange120) * 127 / (120)));
    const value = converter.midi2LinearValue(-10, 10, valueRange120, 1, 0, 120);
    let leftValue = "0.0";
    let rightValue = "0.0";
    if (value < 0) {
        leftValue = Math.abs(value).toFixed(1);
    } else {
        rightValue = value.toFixed(1);
    }
    return {
        midi: valueRange127,
        leftValue: leftValue,
        rightValue: rightValue
    }
}

const getPanel = function(buffer, id) {

    // Panel enabled flag is offset 0x31 (b5 & b6)
    // 0 = A only
    // 1 = B only
    // 2 = A & B
    // Panel selected flag is offset 0x31 (b7);
    // A = 0, B = 1 (not used here)

    const panelOffset31 = buffer.readUInt8(0x31);
    const panelEnabledFlag = (panelOffset31 & 0x60) >> 5;
    const panelEnabled = (id === 0)
        ? (panelEnabledFlag === 0 || panelEnabledFlag === 2)
        : (panelEnabledFlag === 1 || panelEnabledFlag === 2);


    // all hardcoded offset are for Panel A, offset value is for Panel B

    const panelOffset = id * 263;

    // Piano section

    const pianoFlag1 = buffer.readUInt16BE(0x43 + panelOffset);
    const pianoFlag2 = buffer.readUInt8(0x48 + panelOffset);

    const piano = {
        enabled: (pianoFlag1 & 0x8000) !== 0,
        volume: getVolume((pianoFlag1 & 0x7F0) >> 4),
        type: mapping.pianoTypeMap.get((pianoFlag2 & 0x38) >> 3),
        name: mapping.pianoNameMap.get(buffer.readBigUInt64BE(0x49)),
        pitchStick: (pianoFlag2 & 0x80) !== 0,
        sustainPedal: (pianoFlag2 & 0x40) !== 0,
    };

    // Organ Section

    const organFlag34 = buffer.readUInt8(0x34 + panelOffset);
    const organOffset35 = buffer.readUInt8(0x35 + panelOffset);
    const organOffsetB6 = buffer.readUInt16BE(0xb6 + panelOffset);
    const organOffsetBa = buffer.readUInt8(0xba + panelOffset);
    const organOffsetBb = buffer.readUInt8(0xbb + panelOffset);
    const organOffsetD3 = buffer.readUInt8(0xd3 + panelOffset);
    const rotarySpeakerOffset39 = buffer.readUInt16BE(0x39 + panelOffset);
    const rotarySpeakerOffset10B = buffer.readUInt8(0x10b + panelOffset);

    const organ = {
        enabled: ((organOffsetB6 & 0x8000) !== 0),
        volume: getVolume((organOffsetB6 & 0x7F0) >> 4),
        type: mapping.organTypeMap.get((organOffsetBb & 0x70) >> 4),
        preset1: getDrawbars(buffer, 0xbe).join(""),
        preset2: getDrawbars(buffer, 0xd9).join(""),
        octaveShift: (organOffsetBa & 0x07) - 6,
        pitchStick: ((organFlag34 & 0x10) !== 0),
        sustainPedal: ((organOffsetBb & 0x80) !== 0),
        live: ((organOffsetBb & 0x08) !== 0),
        vibrato: {
            enabled: ((organOffsetD3 & 0x10) !== 0),
            mode: mapping.organVibratoModeMap.get((organFlag34 & 0b00001110) >> 1),
        },
        percussion: {
            enabled: ((organOffsetD3 & 0x08) !== 0),
            volumeSoft: ((organOffsetD3 & 0x01) !== 0),
            decayFast: ((organOffsetD3 & 0x02) !== 0),
            harmonicThird: ((organOffsetD3 & 0x04) !== 0),
        },
    };

    const rotarySpeaker = {
        drive: converter.midi2LinearStringValue(0, 10, (rotarySpeakerOffset39 & 0b0000011111110000) >> 4, 1, ""),
        source: mapping.sourceMap.get((rotarySpeakerOffset10B & 0b01100000) >> 5),
        stopMode: !(((organOffset35 & 0x80) >> 7) !== 0),
        speed: mapping.rotarySpeakerSpeedMap.get(organFlag34 & 0x01),
    };

    // synth section

    const synthOffset3b = buffer.readUInt8(0x3b + panelOffset);
    const synthOffset52W = buffer.readUInt16BE(0x52 + panelOffset);
    const synthOffset56 = buffer.readUInt8(0x56 + panelOffset);
    const synthOffset57 = buffer.readUInt8(0x57 + panelOffset);
    const synthOffset80 = buffer.readUInt8(0x80 + panelOffset);
    const synthOffset84W = buffer.readUInt16BE(0x84 + panelOffset);
    const synthOffset86 = buffer.readUInt8(0x86 + panelOffset);
    const synthOffset87 = buffer.readUInt8(0x87 + panelOffset);
    const synthOffset8bW = buffer.readUInt16BE(0x8b + panelOffset);
    const synthOffset8cW = buffer.readUInt16BE(0x8c + panelOffset);
    const synthOffset8dW = buffer.readUInt16BE(0x8d + panelOffset);
    const synthOffset8eW = buffer.readUInt16BE(0x8e + panelOffset);
    const synthOffset8f = buffer.readUInt8(0x8f + panelOffset);
    const synthOffset8fW = buffer.readUInt16BE(0x8f + panelOffset);
    const synthOffset90W = buffer.readUInt16BE(0x90 + panelOffset);
    const synthOffset94W = buffer.readUInt16BE(0x94 + panelOffset);
    const synthOffset98 = buffer.readUInt8(0x98 + panelOffset);
    const synthOffsetA0W = buffer.readUInt16BE(0xa0 + panelOffset);
    const synthOffsetA4W = buffer.readUInt16BE(0xa4 + panelOffset);
    const synthOffsetA8 = buffer.readUInt8(0xa8 + panelOffset);
    const synthOffsetA5W = buffer.readUInt16BE(0xa5 + panelOffset);
    const synthOffsetA6W = buffer.readUInt16BE(0xa6 + panelOffset);
    const synthOffsetA7W = buffer.readUInt16BE(0xa7 + panelOffset);
    const synthOffsetAc = buffer.readUInt8(0xac + panelOffset);

    const oscillatorType = mapping.synthOscillatorTypeMap.get((synthOffset8dW & 0x0380) >> 7);
    let oscillator1WaveForm = "";
    switch (oscillatorType) {
        case "Classic":
            oscillator1WaveForm = mapping.synthOscillator1ClassicWaveFormMap.get((synthOffset8eW & 0x01c0) >> 6);
            break;
        case "Wave":
            oscillator1WaveForm = mapping.synthOscillator1WaveWaveFormMap.get((synthOffset8eW & 0x0fc0) >> 6);
            break;
        case "Formant":
            oscillator1WaveForm = mapping.synthOscillator1FormantWaveFormMap.get((synthOffset8eW & 0x03c0) >> 6);
            break;
        case "Super":
            oscillator1WaveForm = mapping.synthOscillator1SuperWaveFormMap.get((synthOffset8eW & 0x01c0) >> 6);
            break;
        case "Sample":
            oscillator1WaveForm = "Sample " + (((synthOffset8eW & 0x7fc0) >> 6) + 1);
            break;
    }

    const oscConfig = mapping.synthOscillatorsTypeMap.get((synthOffset8f & 0x1e) >> 1);

    const osc2Pitch = ((synthOffset8fW & 0x01f8) >> 3) - 12;
    const osc2PitchMidi = Math.ceil(((osc2Pitch + 12) * 127 / (48 + 12)));

    const oscCtrlMidi = (synthOffset90W & 0x07f0) >> 4;
    const oscModulation = getKnobDualValues((synthOffset94W & 0x0fe0) >> 5);


    let oscCtrl = "";
    switch (oscConfig) {
        case '1 Pitch':
            oscCtrl = converter.midi2LinearStringValue(0, 24, oscCtrlMidi, 1, "");
            break;
        case '2 Shape':
            oscCtrl = converter.midi2LinearStringValue(0, 100, oscCtrlMidi, 0, "%");
            break;
        case '3 Sync':
            oscCtrl = converter.midi2LinearStringValue(0, 10, oscCtrlMidi, 1, "");
            break;
        case '4 Detune':
            oscCtrl = converter.midi2LinearStringValue(0, 4, oscCtrlMidi, 2, "");
            break;
        case '5 MixSin':
            oscCtrl = converter.midi2LinearValueAndComplement(oscCtrlMidi);
            break;
        case '6 MixTri':
            oscCtrl = converter.midi2LinearValueAndComplement(oscCtrlMidi);
            break;
        case '7 MixSaw':
            oscCtrl = converter.midi2LinearValueAndComplement(oscCtrlMidi);
            break;
        case '8 MixSqr':
            oscCtrl = converter.midi2LinearValueAndComplement(oscCtrlMidi);
            break;
        case '9 MixBell':
            oscCtrl = converter.midi2LinearValueAndComplement(oscCtrlMidi);
            break;
        case '10 MixNs1':
            oscCtrl = converter.midi2LinearValueAndComplement(oscCtrlMidi);
            break;
        case '11 MixNs2':
            oscCtrl = converter.midi2LinearValueAndComplement(oscCtrlMidi);
            break;
        case '12 FM1':
            oscCtrl = converter.midi2LinearStringValue(0, 100, oscCtrlMidi, 0, "%");
            break;
        case '13 FM2':
            oscCtrl = converter.midi2LinearStringValue(0, 100, oscCtrlMidi, 0, "%");
            break;
        case '14 RM':
            oscCtrl = converter.midi2LinearStringValue(0, 100, oscCtrlMidi, 0, "%");
            break;
    }


    const lfoRateMidi = synthOffset87 & 0x7f;

    const envModAttackMidi = (synthOffset8bW & 0xfe00) >> 9;
    const envModDecayMidi = (synthOffset8bW & 0x01fc) >> 2;
    const envModReleaseMidi = (synthOffset8cW & 0x03f8) >> 3;

    const envAmpAttackMidi = (synthOffsetA5W & 0x03f8) >> 3;
    const envAmpDecayMidi = (synthOffsetA6W & 0x07f0) >> 4;
    const envAmpReleaseMidi = (synthOffsetA7W & 0x0fe0) >> 5;

    const filterLfoMidi = (synthOffsetA0W & 0x0fe0) >> 5;
    const filterModulation2 = getKnobDualValues((synthOffsetA4W & 0x1fc0) >> 6);


    const synth = {
        enabled: ((synthOffset52W & 0x8000) !== 0),
        volume: getVolume((synthOffset52W & 0x7F0) >> 4),

        octaveShift: mapping.synthOctaveShiftMap.get(synthOffset56 & 0x03),
        pitchStick: ((synthOffset57 & 0x80) !== 0),
        pitchStickRange: mapping.synthPitchShiftRangeMap.get((synthOffset3b & 0xf0) >> 4),
        sustainPedal: ((synthOffset57 & 0x40) !== 0),
        keyboardHold: ((synthOffset80 & 0x80) !== 0),

        voice: mapping.synthVoiceMap.get((synthOffset84W & 0x0180) >> 7),
        glide: converter.midi2LinearStringValue(0, 10,synthOffset84W & 0x007f, 1, ""),
        unison: mapping.synthUnisonMap.get((synthOffset86 & 0xc0) >> 6),
        vibrato: mapping.synthVibratoMap.get((synthOffset86 & 0x38) >> 3),

        oscillators: {
            type: oscillatorType,
            waveForm1: oscillator1WaveForm,
            config: oscConfig,
            control: {
                midi: oscCtrlMidi,
                label: oscCtrl,
            },
            pitch: {
                midi: osc2PitchMidi,
                label: (osc2Pitch === -12) ? 'Sub': osc2Pitch + ' semi',
            },
            modulation: {
                midi: oscModulation.midi,
                lfoAmount: oscModulation.leftValue,
                modEnvAmount: oscModulation.rightValue,
                //label: oscModulationLabel,
            },
            fastAttack: ((synthOffsetAc & 0x04) !== 0),
        },
        filter: {
            type: mapping.synthFilterTypeMap.get((synthOffset98 & 0x1c) >> 2),
            kbTrack: mapping.synthFilterKbTrackMap.get((synthOffsetA5W & 0x3000) >> 12),
            drive:mapping.synthFilterDriveMap.get((synthOffsetA5W & 0x0c00) >> 10),
            modulation1: {
                lfoAmount: {
                  midi: filterLfoMidi,
                  label: converter.midi2LinearStringValue(0, 10, filterLfoMidi, 1, ""),
                },
            },
            modulation2: {
                midi: filterModulation2.midi,
                velAmount: filterModulation2.leftValue,
                modEnvAmount: filterModulation2.rightValue,
            },
            frequency: {
                midi: '',
                label: ''
            },
            resonanceFreqHp: {
                midi: '',
                resonance: '',
                freqHp: ''
            },
        },
        envelopes: {
            modulation: {
                attack: {
                    midi: envModAttackMidi,
                    label: mapping.synthEnvAttackMap.get(envModAttackMidi),
                },
                decay: {
                    midi: envModDecayMidi,
                    label: mapping.synthEnvDecayOrReleaseLabel(envModDecayMidi, "mod.decay"),
                },
                release: {
                    midi: envModReleaseMidi,
                    label: mapping.synthEnvDecayOrReleaseLabel(envModReleaseMidi, "mod.release"),
                },
                velocity: ((synthOffset8dW & 0x0400) !== 0),
            },
            amplifier: {
                attack: {
                    midi: envAmpAttackMidi,
                    label: mapping.synthEnvAttackMap.get(envAmpAttackMidi),
                },
                decay: {
                    midi: envAmpDecayMidi,
                    label: mapping.synthEnvDecayOrReleaseLabel(envAmpDecayMidi, "amp.decay"),
                },
                release: {
                    midi: envAmpReleaseMidi,
                    label: mapping.synthEnvDecayOrReleaseLabel(envAmpReleaseMidi, "amp.release"),
                },
                velocity: mapping.synthAmpEnvelopeVelocityMap.get((synthOffsetA8 & 0x18) >> 3),
            }
        },
        lfo: {
            wave: mapping.synthLfoWaveMap.get(synthOffset86 & 0x07),
            rate: {
                midi: lfoRateMidi,
                label: mapping.synthLfoRateMap.get(lfoRateMidi),
            },
            masterClock: ((synthOffset87 & 0x80) !== 0),
        },
        arpeggiator: {

        }
    };


    return {
        enabled: panelEnabled,
        organ: organ,
        piano: piano,
        synth: synth,
        effect: {
            rotarySpeaker: rotarySpeaker,
            effect1: {},
            effect2: {},
            delay: {},
            ampSimEq: {},
            compressor: {},
            reverb: {}
        },
        morph: {
            wheel: new Morph(),
            afterTouch: new Morph(),
            controlPedal: new Morph(),
        },
    };
}

exports.loadNs3fFile = (buffer) => {

    if (buffer.length > 16) {
        const claviaSignature = buffer.toString("utf8", 0, 4);
        if (claviaSignature !== "CBIN") {
            throw new Error("Invalid Nord file");
        }
        const fileExt = buffer.toString("utf8", 8, 12);
        if (fileExt !== "ns3f") {
            throw new Error(fileExt + " file are not supported, select a valid ns3f file");
        }
    }
    if (buffer.length !== 592) {
        throw new Error("Invalid file, unexpected file length");
    }

    // const fileId = buffer.readUInt32LE(0x0e);


    return {
        name: '',
        //fileId: fileId,
        panelA: getPanel(buffer, 0),
        panelB: getPanel(buffer, 1),
        masterClock:  {
            rate: '',
            keyboardSync: ''
        },
        transpose: '',
        split: {
            enabled: '',
            low: {
                width: '',
                key: '',
            },
            mid: {
                width: '',
                key: '',
            },
            high: {
                width: '',
                key: '',
            },
        },
        monoOut: '',
        dualKeyboard: ''
    };
}



