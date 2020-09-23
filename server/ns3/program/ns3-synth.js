const mapping = require("./ns3-mapping");
const converter = require("../../common/converter");
const { ns3SampleLibrary } = require("../../common/nord-library-sample");
const { getMorphSynthOscillatorModulation } = require("./ns3-morph");
const { getMorph } = require("./ns3-morph");
const { getFilter } = require("./ns3-synth-filter");
const { getOscControl } = require("./ns3-synth-osc-control");
const { getVolumeEx } = require("./ns3-utils");
const { getKbZone } = require("./ns3-utils");
const { getKnobDualValues } = require("./ns3-utils");

/***
 * Synth Envelope Decay / Release value
 * @param value
 * @param type
 * @returns {string}
 */
const synthEnvDecayOrReleaseLabel = function (value, type) {
    switch (type) {
        case "mod.decay": {
            if (value === 127) return "Sustain";
            else return mapping.synthEnvDecayOrReleaseMap.get(value);
        }
        case "mod.release": {
            if (value === 127) return "Inf";
            else return mapping.synthEnvDecayOrReleaseMap.get(value);
        }
        case "amp.decay": {
            if (value === 127) return "Sustain";
            else return mapping.synthEnvDecayOrReleaseMap.get(value);
        }
        case "amp.release": {
            return mapping.synthEnvDecayOrReleaseMap.get(value);
        }
    }
    return "";
};

/***
 * returns Synth section
 *
 * @param buffer {Buffer}
 * @param panelOffset
 * @param splitEnabled
 * @param dualKeyboard
 * @param id
 * @returns {{voice: unknown, oscillators: {control: {midi: number, value: string}, fastAttack: boolean, pitch: {midi: number, value: (string|string)}, type: unknown, waveForm1: string, config: unknown, modulations: {lfoAmount: {midi: number, value: string}, modEnvAmount: {midi: number, value: string}}}, unison: unknown, arpeggiator: {kbSync: boolean, rate: {midi: number, value: unknown}, masterClock: boolean, pattern: unknown, range: unknown, enabled: boolean}, kbZone: unknown, sustainPedal: boolean, keyboardHold: boolean, octaveShift: unknown, enabled: boolean, volume: {midi: *, value: unknown}, filter: {highPassCutoffFrequency: {midi: number, value: unknown}, cutoffFrequency: {midi: number, value: unknown}, type: unknown, drive: unknown, resonance: {midi: number, value: (string|string)}, kbTrack: unknown, modulations: {lfoAmount: {midi: number, value: string}, velAmount: {midi: number, value: string}, modEnvAmount: {midi: number, value: string}}}, pitchStick: boolean, lfo: {rate: {midi: number, value: unknown}, masterClock: boolean, wave: unknown}, glide: string, envelopes: {modulation: {attack: {midi: number, value: unknown}, release: {midi: number, value: (string|*)}, decay: {midi: number, value: (string|*)}, velocity: boolean}, amplifier: {attack: {midi: number, value: unknown}, release: {midi: number, value: (string|*)}, decay: {midi: number, value: (string|*)}, velocity: unknown}}, vibrato: unknown}}
 */
exports.getSynth = (buffer, panelOffset, splitEnabled, dualKeyboard, id) => {
    //const synthOffset3b = buffer.readUInt8(0x3b + panelOffset);
    const synthOffset52W = buffer.readUInt16BE(0x52 + panelOffset);
    const synthOffset56 = buffer.readUInt8(0x56 + panelOffset);
    const synthOffset57 = buffer.readUInt8(0x57 + panelOffset);
    const synthOffset80 = buffer.readUInt8(0x80 + panelOffset);
    const synthOffset81 = buffer.readUInt8(0x81 + panelOffset);
    const synthOffset81Ww = buffer.readUInt32BE(0x81 + panelOffset);
    const synthOffset84W = buffer.readUInt16BE(0x84 + panelOffset);
    const synthOffset86 = buffer.readUInt8(0x86 + panelOffset);
    const synthOffset87 = buffer.readUInt8(0x87 + panelOffset);
    const synthOffset87Ww = buffer.readUInt32BE(0x87 + panelOffset);
    const synthOffset8bW = buffer.readUInt16BE(0x8b + panelOffset);
    const synthOffset8cW = buffer.readUInt16BE(0x8c + panelOffset);
    const synthOffset8dW = buffer.readUInt16BE(0x8d + panelOffset);
    const synthOffset8eW = buffer.readUInt16BE(0x8e + panelOffset);
    const synthOffset8f = buffer.readUInt8(0x8f + panelOffset);
    const synthOffset8fW = buffer.readUInt16BE(0x8f + panelOffset);
    const synthOffset94W = buffer.readUInt16BE(0x94 + panelOffset);
    const synthOffset95Ww = buffer.readUInt32BE(0x95 + panelOffset);

    const synthOffsetA5W = buffer.readUInt16BE(0xa5 + panelOffset);
    const synthOffsetA6W = buffer.readUInt16BE(0xa6 + panelOffset);
    const synthOffsetA7W = buffer.readUInt16BE(0xa7 + panelOffset);
    const synthOffsetA8 = buffer.readUInt8(0xa8 + panelOffset);
    const synthOffsetA8W = buffer.readUInt16BE(0xa8 + panelOffset);
    const synthOffsetA9W = buffer.readUInt16BE(0xa9 + panelOffset);
    const synthOffsetAaW = buffer.readUInt16BE(0xaa + panelOffset);
    const synthOffsetAbW = buffer.readUInt16BE(0xab + panelOffset);
    const synthOffsetAc = buffer.readUInt8(0xac + panelOffset);

    const sampleId1 = ((synthOffsetA8W & 0x07f8) >>> 3) * Math.pow(2, 24);
    const sampleId2 = ((synthOffsetA9W & 0x07f8) >>> 3) * Math.pow(2, 16);
    const sampleId3 = ((synthOffsetAaW & 0x07f8) >>> 3) * Math.pow(2, 8);
    const sampleId4 = (synthOffsetAbW & 0x07f8) >>> 3;
    const sampleId = sampleId1 + sampleId2 + sampleId3 + sampleId4;

    const oscillatorType = mapping.synthOscillatorTypeMap.get((synthOffset8dW & 0x0380) >>> 7);

    const waveForm1 = {
        name: "",
        info: "",
        version: "",
        value: 0,
    };
    switch (oscillatorType) {
        case "Classic":
            waveForm1.value = (synthOffset8eW & 0x01c0) >>> 6;
            waveForm1.name = mapping.synthOscillator1ClassicWaveTypeMap.get(waveForm1.value);
            break;
        case "Wave":
            waveForm1.value = (synthOffset8eW & 0x0fc0) >>> 6;
            waveForm1.name = mapping.synthOscillator1WaveWaveTypeMap.get(waveForm1.value);
            break;
        case "Formant":
            waveForm1.value = (synthOffset8eW & 0x03c0) >>> 6;
            waveForm1.name = mapping.synthOscillator1FormantWaveTypeMap.get(waveForm1.value);
            break;
        case "Super":
            waveForm1.value = (synthOffset8eW & 0x01c0) >>> 6;
            waveForm1.name = mapping.synthOscillator1SuperWaveTypeMap.get(waveForm1.value);
            break;
        case "Sample":
            waveForm1.value = (synthOffset8eW & 0x7fc0) >>> 6;
            const lib = ns3SampleLibrary.get(sampleId);
            if (lib) {
                waveForm1.name = lib.name;
                waveForm1.info = lib.info;
                waveForm1.version = lib.version;
            }
            if (!waveForm1.name) {
                waveForm1.name = "Sample " + (waveForm1.value + 1);
            }
            break;
    }

    const oscConfig = mapping.synthOscillatorsTypeMap.get((synthOffset8f & 0x1e) >>> 1);

    const osc2Pitch = ((synthOffset8fW & 0x01f8) >>> 3) - 12;
    const osc2PitchMidi = Math.ceil(((osc2Pitch + 12) * 127) / (48 + 12));

    const oscModulation = getKnobDualValues((synthOffset94W & 0x0fe0) >>> 5);

    const lfoRateMidi = synthOffset87 & 0x7f;
    const lfoRateMasterClock = (synthOffset87 & 0x80) !== 0;

    const envModAttackMidi = (synthOffset8bW & 0xfe00) >>> 9;
    const envModDecayMidi = (synthOffset8bW & 0x01fc) >>> 2;
    const envModReleaseMidi = (synthOffset8cW & 0x03f8) >>> 3;

    const envAmpAttackMidi = (synthOffsetA5W & 0x03f8) >>> 3;
    const envAmpDecayMidi = (synthOffsetA6W & 0x07f0) >>> 4;
    const envAmpReleaseMidi = (synthOffsetA7W & 0x0fe0) >>> 5;

    const arpeggiatorRange = (synthOffset80 & 0x18) >>> 3;
    const arpeggiatorPattern = (synthOffset80 & 0x06) >>> 1;
    const arpeggiatorRateMidi = (synthOffset81 & 0xfe) >>> 1;
    const arpeggiatorMasterClock = (synthOffset80 & 0x01) !== 0;

    const synthEnabled = (synthOffset52W & 0x8000) !== 0;
    const synthKbZoneEnabled =
        id === 0 ? synthEnabled : synthEnabled && (dualKeyboard.enabled === false || dualKeyboard.value !== "Synth");

    const synthKbZone = getKbZone(synthKbZoneEnabled, splitEnabled, (synthOffset52W & 0x7800) >>> 11);

    const synth = {
        debug: {
            sampleId: sampleId.toString(16),
            name: waveForm1.name,
            info: waveForm1.info,
            version: waveForm1.version,
        },

        /**
         * Offset in file: 0x52 (b7)
         *
         * @example
         * O = off, 1 = on
         *
         * @module Synth On
         */
        enabled: synthEnabled,

        /**
         * Offset in file: 0x52 (b6-3)
         * @see {@link ns3-doc.md#organ-kb-zone Organ Kb Zone} for detailed explanation.
         *
         * @module Synth Kb Zone
         */
        kbZone: {
            array: synthKbZone[1],
            value: synthKbZone[0],
        },

        /**
         * Offset in file: 0x52 (b2-0) and 0x53 (b7-4)
         *
         * @example
         *
         * Morph Wheel:
         * 0x53 (b3): polarity (1 = positive, 0 = negative)
         * 0x53 (b2-b0), 0x54 (b7-b4): 7-bit raw value
         *
         * Morph After Touch:
         * 0x54 (b3): polarity (1 = positive, 0 = negative)
         * 0x54 (b2-b0), 0x55 (b7-b4): 7-bit raw value
         *
         * Morph Control Pedal:
         * 0x55 (b3): polarity (1 = positive, 0 = negative)
         * 0x55 (b2-b0), 0x56 (b7-b4): 7-bit raw value
         *
         * @see {@link ns3-doc.md#organ-volume Organ Volume} for detailed explanation.
         *
         * @module Synth Volume
         */
        volume: getVolumeEx(buffer, 0x52 + panelOffset),

        /**
         * Offset in file: 0x56 (b1-0)
         *
         * @example
         * Octave Shift = value - 6
         *
         * @module Synth Octave Shift
         */
        octaveShift: {
            value: (synthOffset56 & 0x07) - 6,
        },
        /**
         * Offset in file: 0x57 (b7)
         *
         * @example
         * O = off, 1 = on
         *
         * @module Synth Pitch Stick
         */
        pitchStick: {
            enabled: (synthOffset57 & 0x80) !== 0,
        },
        //pitchStickRange: mapping.synthPitchShiftRangeMap.get((synthOffset3b & 0xf0) >>> 4),

        /**
         * Offset in file: 0x57 (b6)
         *
         * @example
         * O = off, 1 = on
         *
         * @module Synth Sustain Pedal
         */
        sustainPedal: {
            enabled: (synthOffset57 & 0x40) !== 0,
        },
        /**
         * Offset in file: 0x80 (b7)
         *
         * @example
         * O = off, 1 = on
         *
         * @module Synth Kb Hold
         */
        keyboardHold: {
            enabled: (synthOffset80 & 0x80) !== 0,
        },
        /**
         * Offset in file: 0x84 (b0) and 0x85 (b7)
         *
         * @example
         * 0 = Poly
         * 1 = Legato
         * 2 = Mono
         *
         * @module Synth Voice
         */
        voice: {
            value: mapping.synthVoiceMap.get((synthOffset84W & 0x0180) >>> 7),
        },
        /**
         * Offset in file: 0x85 (b6 to b0) 7 bits, range 0/10
         *
         * @example
         * 0/127 value = 0 / 10
         *
         * @module Synth Glide
         */
        glide: {
            value: converter.midi2LinearStringValue(0, 10, synthOffset84W & 0x007f, 1, ""),
        },
        /**
         * Offset in file: 0x86 (b7/6)
         *
         * @example
         * 0 = Off
         * 1 = 1
         * 2 = 2
         * 3 = 3
         *
         * @module Synth Unison
         */
        unison: {
            value: mapping.synthUnisonMap.get((synthOffset86 & 0xc0) >>> 6),
        },
        /**
         * Offset in file: 0x86 (b5/4/3)
         *
         * @example
         * 0 = Off
         * 1 = Delay 1
         * 2 = Delay 2
         * 3 = Delay 3
         * 4 = Wheel
         * 5 = After Touch
         *
         * @module Synth Vibrato
         */
        vibrato: {
            value: mapping.synthVibratoMap.get((synthOffset86 & 0x38) >>> 3),
        },
        /***
         * Synth Oscillators Definition
         */
        oscillators: {
            /**
             * Offset in file: 0x8D (b1/0) and 0x8E (b7)
             *
             * @example
             * 0 = Classic
             * 1 = Wave
             * 2 = Formant
             * 3 = Super
             * 4 = Sample
             *
             * @module Synth Oscillator Type
             */
            type: {
                value: oscillatorType,
            },
            /**
             * Offset in file: 0x8E (b3-0) and 0x8F (b7/6)
             *
             * @example

             * ID | Classic  | Wave               | Formant         | Super
             * -- | -------- | ------------------ | --------------- | -------------------
             *  O | Sine     | Wave 2nd Harm      | Format Wave Aaa | Super Wave Saw
             *  1 | Triangle | Wave 3rd Harm      | Format Wave Eee | Super Wave Saw 2
             *  2 | Saw      | Wave 4th Harm      | Format Wave Iii | Super Wave Square
             *  3 | Square   | Wave 5th Harm      | Format Wave Ooo | Super Wave Square 2
             *  4 | Pulse 33 | Wave 6th Harm      | Format Wave Uuu | Super Wave Bright
             *  5 | Pulse 10 | Wave 7th Harm      | Format Wave Yyy | Super Wave Bright 2
             *  6 | ESaw     | Wave 8th Harm      | Format Wave AO  | Super Wave Strings
             *  7 | ESquare  | Wave Organ 1       | Format Wave AE  | Super Wave Organ
             *  8 |          | Wave Organ 2       | Format Wave OE  |
             *  9 |          | Wave Principal     |
             * 10 |          | Wave Flute 1       |
             * 11 |          | Wave Flute 2       |
             * 12 |          | Wave Clarinet 1    |
             * 13 |          | Wave Clarinet 2    |
             * 14 |          | Wave Alto Sax      |
             * 15 |          | Wave Tenor Sax     |
             * 16 |          | Wave 2nd Spectra   |
             * 17 |          | Wave 3rd Spectra   |
             * 18 |          | Wave 4th Spectra   |
             * 19 |          | Wave 5th Spectra   |
             * 20 |          | Wave 6th Spectra   |
             * 21 |          | Wave 7th Spectra   |
             * 22 |          | Wave 8th Spectra   |
             * 23 |          | Wave Saw Random    |
             * 24 |          | Wave Saw Bright    |
             * 25 |          | Wave Sqr Bright    |
             * 26 |          | Wave Saw NoFund    |
             * 27 |          | Wave EPiano 1      |
             * 28 |          | Wave EPiano 2      |
             * 29 |          | Wave EPiano 3      |
             * 30 |          | Wave DX 1          |
             * 31 |          | Wave DX 2          |
             * 32 |          | Wave Full Tines    |
             * 33 |          | Wave Ac Piano      |
             * 34 |          | Wave Ice 1         |
             * 35 |          | Wave Ice 2         |
             * 36 |          | Wave Clavinet 1    |
             * 37 |          | Wave Clavinet 2    |
             * 38 |          | Wave Clavinet 3    |
             * 39 |          | Wave Triplets      |
             * 40 |          | Wave Bell          |
             * 41 |          | Wave Bar 1         |
             * 42 |          | Wave Bar 2         |
             * 43 |          | Wave Tines         |
             * 44 |          | Wave Marimba       |
             * 45 |          | Wave Tubular Bells |
             *
             * @module Synth Oscillator 1 Wave Form
             */
            waveForm1: waveForm1,
            /**
             * Offset in file: 0x8F (b4-1)
             *
             * @example
             *
             * 0 = None
             * 1 = Pitch
             * 2 = Shape
             * 3 = Sync
             * 4 = Detune
             * 5 = MixSin
             * 6 = MixTri
             * 7 = MixSaw
             * 8 = MixSqr
             * 9 = MixBell
             * 10 = MixNs1
             * 11 = MixNs2
             * 12 = FM1
             * 13 = FM2
             * 14 = RM
             *
             * @module Synth Oscillator Config
             */
            config: {
                value: oscConfig,
            },
            /**
             * Offset in file: 0x90 (b2/1/0) and 0x91 (b7/6/5/4)
             *
             * @example
             * Type                  Midi value conversion
             * Pitch (1)             0/127 => 0/24
             * Shape (2)             0/127 => 0/100 %
             * Sync (3)              0/127 => 0/10
             * Detune (4)            0/127 => 0/4
             * Mix* (5 to 11)        0/127 => 100/0 to 0/100
             * FM & RM (12 to 14)    0/127 => 0/100 %
             *
             * Morph Wheel:
             * 0x91 (b3): polarity (1 = positive, 0 = negative)
             * 0x91 (b2-b0), 0x92 (b7-b4): 7-bit raw value
             *
             * Morph After Touch:
             * 0x92 (b3): polarity (1 = positive, 0 = negative)
             * 0x92 (b2-b0), 0x93 (b7-b4): 7-bit raw value
             *
             * Morph Control Pedal:
             * 0x93 (b3): polarity (1 = positive, 0 = negative)
             * 0x93 (b2-b0), 0x94 (b7-b4): 7-bit raw value
             *
             * @see {@link ns3-doc.md#organ-volume Organ Volume} for detailed Morph explanation.
             *
             * @module Synth Oscillator Control
             */
            control: getOscControl(buffer, 0x90 + panelOffset, oscConfig),

            /**
             * Offset in file: 0x8f (b0) and 0x90 (b7-3)
             *
             * @example
             * Midi value = 6-bit value + b0 forced to zero to have a standard Midi 7-bit value
             * value conversion: -12 (Sub) to +48
             *
             * @module Synth Pitch
             */
            pitch: {
                /***
                 * Synth Pitch Midi Value
                 */
                midi: osc2PitchMidi,

                /***
                 * Synth Pitch value
                 */
                value: osc2Pitch === -12 ? "Sub" : osc2Pitch + " semi",
            },

            /**
             * Offset in file: 0x94 (b3-0) and 0x95 (b7-5)
             *
             * @example
             * Osc modulation (lfo/env mod) is using this single 7-bit value to define two settings with a single knob.
             * Input Value is not the direct midi value as usual, instead it is coded on a special 0/120 range:
             * 0   = 10.0 (100% left value) 'LFO Amount'
             * 60  = 0.0 for both values
             * 120 = 10.0 (100% right value) 'Mod Env Amount'
             *
             * @module Synth LFO Mod Env
             */
            modulations: {
                /**
                 * LFO Amount
                 */
                lfoAmount: {
                    midi: oscModulation.leftMidi,
                    value: oscModulation.leftLabel,
                    morph: getMorphSynthOscillatorModulation(synthOffset95Ww >>> 5, oscModulation.fromValue, true),
                },
                /**
                 * Env Mod Amount
                 */
                modEnvAmount: {
                    midi: oscModulation.rightMidi,
                    value: oscModulation.rightLabel,
                    morph: getMorphSynthOscillatorModulation(synthOffset95Ww >>> 5, oscModulation.fromValue, false),
                },
            },
            /**
             * Offset in file: 0xAC (b2)
             *
             * @example
             * O = off, 1 = on
             *
             * @module Synth Fast Attack
             */
            fastAttack: {
                enabled: (synthOffsetAc & 0x04) !== 0,
            },
        },

        filter: getFilter(buffer, panelOffset),

        envelopes: {
            modulation: {
                /**
                 * Offset in file: 0x8B (b7-1)
                 *
                 * @example
                 * 0/127 value = 0.5 ms / 45 s
                 * #include synthEnvAttackMap
                 *
                 * @module Synth Mod Env Attack
                 */
                attack: {
                    midi: envModAttackMidi,
                    value: mapping.synthEnvAttackMap.get(envModAttackMidi),
                },

                /**
                 * Offset in file: 0x8B (b0) and 0x8C (b7-2)
                 *
                 * @example
                 * 0/127 value = 3.0 ms / 45 s (Sustain)
                 * #include synthEnvDecayOrReleaseMap
                 *
                 * @module Synth Mod Env Decay
                 */
                decay: {
                    midi: envModDecayMidi,
                    value: synthEnvDecayOrReleaseLabel(envModDecayMidi, "mod.decay"),
                },

                /**
                 * Offset in file: 0x8C (b1-0) and 0x8D (b7-3)
                 *
                 * @example
                 * 0/127 value = 3.0 ms / 45 s (Inf)
                 * #include synthEnvDecayOrReleaseMap
                 *
                 * @module Synth Mod Env Release
                 */
                release: {
                    midi: envModReleaseMidi,
                    value: synthEnvDecayOrReleaseLabel(envModReleaseMidi, "mod.release"),
                },

                /**
                 * Offset in file: 0x8D (b2)
                 *
                 * @example
                 * O = off, 1 = on
                 *
                 * @module Synth Mod Env Velocity
                 */
                velocity: {
                    enabled: (synthOffset8dW & 0x0400) !== 0,
                },
            },
            amplifier: {
                /**
                 * Offset in file: 0xA5 (b1-0) and 0xA6 (b7-3)
                 *
                 * @example
                 * 0/127 value = 0.5 ms / 45 s
                 * #include synthEnvAttackMap
                 *
                 * @module Synth Amp Env Attack
                 */
                attack: {
                    midi: envAmpAttackMidi,
                    value: mapping.synthEnvAttackMap.get(envAmpAttackMidi),
                },

                /**
                 * Offset in file: 0xA6 (b2-0) and 0xA7 (b7-4)
                 *
                 * @example
                 * 0/127 value = 3.0 ms / 45 s (Sustain)
                 * #include synthEnvDecayOrReleaseMap
                 *
                 * @module Synth Amp Env Decay
                 */
                decay: {
                    midi: envAmpDecayMidi,
                    value: synthEnvDecayOrReleaseLabel(envAmpDecayMidi, "amp.decay"),
                },

                /**
                 * Offset in file: 0xA7 (b3-0) and 0xA8 (b7-5)
                 *
                 * @example
                 * 0/127 value = 3.0 ms / 45 s
                 * #include synthEnvDecayOrReleaseMap
                 *
                 * @module Synth Amp Env Release
                 */
                release: {
                    midi: envAmpReleaseMidi,
                    value: synthEnvDecayOrReleaseLabel(envAmpReleaseMidi, "amp.release"),
                },

                /**
                 * Offset in file: 0xA8 (b4-3)
                 *
                 * @example
                 * 0 = Off
                 * 1 = 1
                 * 2 = 2
                 * 3 = 3
                 *
                 * @module Synth Amp Env Velocity
                 */
                velocity: {
                    value: mapping.synthAmpEnvelopeVelocityMap.get((synthOffsetA8 & 0x18) >>> 3),
                },
            },
        },
        lfo: {
            /**
             * Offset in file: 0x86 (b2-0)
             *
             * @example
             * 0 = Triangle
             * 1 = Saw
             * 2 = Neg Saw
             * 3 = Square
             * 4 = S/H
             *
             * @module Synth Lfo Wave
             */
            wave: {
                value: mapping.synthLfoWaveMap.get(synthOffset86 & 0x07),
            },
            /**
             * Offset in file: 0x87 (b6-0)
             *
             * @example
             * 0/127 value = 0.03 Hz / 523 Hz
             * #include synthLfoRateMap
             *
             * if LFO Master Clock is On, 0/127 value = 4/1 to 1/64 Master Clock Division
             * #include synthLfoRateMasterClockDivisionMap
             *
             * Morph Wheel:
             * 0x88 (b7): polarity (1 = positive, 0 = negative)
             * 0x88 (b6-b0): 7-bit raw value
             *
             * Morph After Touch:
             * 0x89 (b7): polarity (1 = positive, 0 = negative)
             * 0x89 (b6-b0): 7-bit raw value
             *
             * Morph Control Pedal:
             * 0x8A (b7): polarity (1 = positive, 0 = negative)
             * 0x8A (b6-b0): 7-bit raw value
             *
             * @see {@link ns3-doc.md#organ-volume Organ Volume} for detailed Morph explanation.
             *
             * @module Synth Lfo Rate
             */
            rate: {
                midi: lfoRateMidi,

                value: lfoRateMasterClock
                    ? mapping.synthLfoRateMasterClockDivisionMap.get(lfoRateMidi)
                    : mapping.synthLfoRateMap.get(lfoRateMidi),

                morph: getMorph(
                    synthOffset87Ww,
                    lfoRateMidi,
                    (x) => {
                        return lfoRateMasterClock
                            ? mapping.synthLfoRateMasterClockDivisionMap.get(x)
                            : mapping.synthLfoRateMap.get(x);
                    },
                    false
                ),
            },

            /**
             * Offset in file: 0x87 (b7)
             *
             * @example
             * O = off, 1 = on
             *
             * @module Synth Lfo Master Clock
             */
            masterClock: {
                enabled: lfoRateMasterClock,
            },
        },
        arpeggiator: {
            /**
             * Offset in file: 0x80 (b6)
             *
             * @example
             * O = off, 1 = on
             *
             * @module Synth Arp On
             */
            enabled: (synthOffset80 & 0x40) !== 0,

            /**
             * Offset in file: 0x81 (b7-1)
             *
             * @example
             * 0/127 value = 16 bpm / Fast 5
             * #include synthArpRateMap
             *
             * if Arpeggiator Master Clock is On, 0/127 value = 1/2 to 1/32 Master Clock Division
             * #include synthArpMasterClockDivisionMap
             *
             * Morph Wheel:
             * 0x81 (b0): polarity (1 = positive, 0 = negative)
             * 0x82 (b7-b1): 7-bit raw value
             *
             * Morph After Touch:
             * 0x82 (b0): polarity (1 = positive, 0 = negative)
             * 0x83 (b7-b1): 7-bit raw value
             *
             * Morph Control Pedal:
             * 0x83 (b0): polarity (1 = positive, 0 = negative)
             * 0x84 (b7-b1): 7-bit raw value
             *
             * @see {@link ns3-doc.md#organ-volume Organ Volume} for detailed Morph explanation.
             *
             * @module Synth Arp Rate
             */
            rate: {
                midi: arpeggiatorRateMidi,

                value: arpeggiatorMasterClock
                    ? mapping.synthArpMasterClockDivisionMap.get(arpeggiatorRateMidi)
                    : mapping.synthArpRateMap.get(arpeggiatorRateMidi),

                morph: getMorph(
                    synthOffset81Ww >>> 1,
                    arpeggiatorRateMidi,
                    (x) => {
                        return arpeggiatorMasterClock
                            ? mapping.synthArpMasterClockDivisionMap.get(x)
                            : mapping.synthArpRateMap.get(x);
                    },
                    false
                ),
            },

            /**
             * Offset in file: 0x80 (b5)
             *
             * @example
             * O = off, 1 = on
             *
             * @module Synth Arp Kb Sync
             */
            kbSync: {
                enabled: (synthOffset80 & 0x20) !== 0,
            },
            /**
             * Offset in file: 0x80 (b0)
             *
             * @example
             * O = off, 1 = on
             *
             * @module Synth Arp Master Clock
             */
            masterClock: {
                enabled: arpeggiatorMasterClock,
            },
            /**
             * Offset in file: 0x80 (b4-3)
             *
             * @example
             * 0 = 1 Octave
             * 1 = 2 Octaves
             * 2 = 3 Octaves
             * 3 = 4 Octaves
             *
             * @module Synth Arp Range
             */
            range: {
                value: mapping.arpeggiatorRangeMap.get(arpeggiatorRange),
            },
            /**
             * Offset in file: 0x80 (b2-1)
             *
             * @example
             * 0 = Up
             * 1 = Down
             * 2 = Up/Down
             * 3 = Random
             *
             * @module Synth Arp Pattern
             */
            pattern: {
                value: mapping.arpeggiatorPatternMap.get(arpeggiatorPattern),
            },
        },
    };

    if (process.env.NODE_ENV === "production") {
        synth.debug = undefined;
    }

    return synth;
};
