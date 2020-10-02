const converter = require("../../common/converter");
const mapping = require("./ns3-mapping");
const { midi2LinearValue } = require("../../common/converter");
const { getMorph } = require("./ns3-morph");

/***
 * returns Amp Sim / Eq
 *
 * @param buffer {Buffer}
 * @param panelOffset {Number}
 * @returns {{source: {value: string}, type: {value: unknown}, treble: {midi: number, value: string}, drive: {midi: number, morph: {afterTouch: {to: {midi: *, value: (*|string)}, enabled: *}, controlPedal: {to: {midi: *, value: (*|string)}, enabled: *}, wheel: {to: {midi: *, value: (*|string)}, enabled: *}}, value: string}, bassDryWet: {midi: number, value: string}, fltFreq: {midi: number, morph: {afterTouch: {to: {midi: *, value: (*|string)}, enabled: *}, controlPedal: {to: {midi: *, value: (*|string)}, enabled: *}, wheel: {to: {midi: *, value: (*|string)}, enabled: *}}, value: string}, enabled: boolean, midRes: {midi: number, value: string}}}
 */
exports.getAmpSimEq = (buffer, panelOffset) => {
    const eqOffset129 = buffer.readUInt8(0x129 + panelOffset);
    const eqOffset12a = buffer.readUInt8(0x12a + panelOffset);
    const eqOffset12aW = buffer.readUInt16BE(0x12a + panelOffset);
    const eqOffset12bW = buffer.readUInt16BE(0x12b + panelOffset);
    const eqOffset12c = buffer.readUInt8(0x12c + panelOffset);
    const eqOffset12d = buffer.readUInt8(0x12d + panelOffset);
    const eqOffset12dWw = buffer.readUInt32BE(0x12d + panelOffset);
    const eqOffset130W = buffer.readUInt16BE(0x130 + panelOffset);
    const eqOffset131Ww = buffer.readUInt32BE(0x131 + panelOffset);

    const ampSimType = mapping.ampSimTypeMap.get((eqOffset12a & 0xe0) >>> 5);
    const redOptions = (ampSimType === "LP24") || (ampSimType === "HP24");

    const trebleRawValue = (eqOffset12aW & 0x1fc0) >> 6;
    const midResRawValue = (eqOffset12bW & 0x3f80) >> 7;
    const bassDryWetRawValue = eqOffset12c & 0x7f;
    const midFilterFreqMidi = (eqOffset12d & 0xfe) >> 1;
    const drive = (eqOffset130W & 0x01fc) >> 2;

    const midResMidi = midi2LinearValue(0, 127, midResRawValue, 0, 0, 120);
    const bassDryWetMidi = midi2LinearValue(0, 127, bassDryWetRawValue, 0, 0, 120);


    return {
        /**
         * Offset in file: 0x129 (b2)
         *
         * @example
         * O = off, 1 = on
         *
         *  @module NS3 Amp Sim Eq On
         */
        enabled: (eqOffset129 & 0x04) !== 0,

        /**
         * Offset in file: 0x10B (b3-2)
         *
         * @example
         * 0 = Organ, 1, Piano, 2 = Synth
         *
         *  @module NS3 Amp Sim Eq Source
         */
        source: {
            value: mapping.effectSourceMap.get(eqOffset129 & 0x03),
        },

        /**
         *  Offset in file: 0x12A (b7-5)
         *
         * @example
         * 0 = Clean
         * 1 = Twin
         * 2 = JC
         * 3 = Small
         * 4 = LP24
         * 5 = HP24
         *
         *  @module NS3 Amp Sim Eq Amp Type
         */
        ampType: {
            value: ampSimType,
            redOptions: redOptions,
        },

        /**
         * Offset in file: 0x12A (b4-0) and 0x12B (b7-6)
         *
         * @example
         * treble (fixed 4 kHz) frequency boost/cut table:
         * #include ampSimEqdBMap
         *
         * @module NS3 Amp Sim Eq Treble
         */
        treble: {
            midi: midi2LinearValue(0, 127, trebleRawValue, 0, 0, 120),

            value: mapping.ampSimEqdBMap.get(trebleRawValue),
        },

        /**
         * Offset in file: 0x12B (b5-0) and 0x12C (b7)
         *
         * @example
         * if Amp Type is LP24 or HP24 filter resonance = 0 to 10
         * else middle frequency boost/cut table:
         * #include ampSimEqdBMap
         *
         * @module NS3 Amp Sim Eq Mid Res
         */
        midRes: {
            midi: midResMidi,

            value:
                redOptions === true
                    ? converter.midi2LinearStringValue(0, 10, midResMidi, 1, "")
                    : mapping.ampSimEqdBMap.get(midResRawValue),
        },

        /**
         * Offset in file: 0x12C (b6-0)
         *
         * @example
         * if Amp Type is LP24 or HP24 filter dry / wet = 0 to 10
         * else bass (fixed 100 Hz) frequency boost/cut table:
         * #include ampSimEqdBMap
         *
         * @module NS3 Amp Sim Eq Bass Dry Wet
         */
        bassDryWet: {
            midi: bassDryWetMidi,

            value:
                redOptions === true
                    ? converter.midi2LinearStringValue(0, 10, bassDryWetMidi, 1, "")
                    : mapping.ampSimEqdBMap.get(bassDryWetRawValue),
        },

        /**
         * Offset in file: 0x12D (b7-1)
         *
         * @example
         * 7-bit value 0/127 = 200 Hz to 8.0 kHz
         *
         * #include ampSimEqMidFilterFreqMap
         *
         * Morph Wheel:
         * 0x12D (b0): polarity (1 = positive, 0 = negative)
         * 0x12E (b7-b1): 7-bit raw value
         *
         * Morph After Touch:
         * 0x12E (b0): polarity (1 = positive, 0 = negative)
         * 0x12F (b7-b1): 7-bit raw value
         *
         * Morph Control Pedal:
         * 0x12F (b0): polarity (1 = positive, 0 = negative)
         * 0x130 (b7-b1): 7-bit raw value
         *
         * @see {@link ns3-doc.md#organ-volume Organ Volume} for detailed Morph explanation.
         *
         * @module NS3 Amp Sim Eq Mid Flt Freq
         */
        midFilterFreq: {
            midi: midFilterFreqMidi,

            value: mapping.ampSimEqMidFilterFreqMap.get(midFilterFreqMidi),

            morph: getMorph(
                eqOffset12dWw >>> 1,
                midFilterFreqMidi,
                (x) => {
                    return mapping.ampSimEqMidFilterFreqMap.get(x);
                },
                false
            ),
        },

        /**
         * Offset in file: 0x130 (b0) and 0x131 (b7-2)
         *
         * @example
         * 7-bit value 0/127 = 0 to 10.0
         *
         * Morph Wheel:
         * 0x131 (b1): polarity (1 = positive, 0 = negative)
         * 0x131 (b0) and 0x132 (b7-2): 7-bit raw value
         *
         * Morph After Touch:
         * 0x132 (b1): polarity (1 = positive, 0 = negative)
         * 0x132 (b0) and 0x133 (b7-2): 7-bit raw value
         *
         * Morph Control Pedal:
         * 0x133 (b1): polarity (1 = positive, 0 = negative)
         * 0x133 (b0) and 0x134 (b7-2): 7-bit raw value
         *
         * @see {@link ns3-doc.md#organ-volume Organ Volume} for detailed Morph explanation.
         *
         * @module NS3 Amp Sim Eq Drive
         */
        overdrive: {
            midi: drive,

            value: converter.midi2LinearStringValue(0, 10, drive, 1, ""),

            morph: getMorph(
                eqOffset131Ww >>> 2,
                drive,
                (x) => {
                    return converter.midi2LinearStringValue(0, 10, x, 1, "");
                },
                false
            ),
        },
    };
};
