const converter = require("../../common/converter");
const mapping = require("./ns3-mapping");
const { getMorph } = require("./ns3-morph");

/***
 * returns Rotary Speaker Effect section
 *
 * @param buffer
 * @param panelOffset
 * @returns {{stopMode: {enabled: boolean}, source: {value: string}, drive: {value: string}, enabled: boolean, speed: {morph: {afterTouch: {enabled: boolean}, controlPedal: {enabled: boolean}, wheel: {enabled: boolean}}, value: string}}}
 */
exports.getRotarySpeakerEffect = (buffer, panelOffset) => {
    const organOffset34 = buffer.readUInt8(0x34 + panelOffset);
    const organOffset35 = buffer.readUInt8(0x35 + panelOffset);
    const organOffset35W = buffer.readUInt16BE(0x35 + panelOffset);
    const rotarySpeakerOffset39W = buffer.readUInt16BE(0x39 + panelOffset);
    const rotarySpeakerOffset10B = buffer.readUInt8(0x10b + panelOffset);

    return {
        /**
         * Offset in file: 0x10b (bit7)
         *
         * @example
         * O = off, 1 = on
         *
         * @module Rotary Speaker On
         */
        enabled: (rotarySpeakerOffset10B & 0x80) !== 0,

        /**
         * Offset in file: 0x10b (b6 and b5)
         *
         * @example
         * 0 = Organ, 1, Piano, 2 = Synth
         *
         * @module Rotary Speaker Source
         */
        source: {
            value: mapping.effectSourceMap.get((rotarySpeakerOffset10B & 0b01100000) >>> 5),
        },

        /**
         * Offset in file: 0x39 (b2 to b0) and 0x3a (b7 to b4)
         *
         * @example
         * 7-bit value 0/127 converted to 0/10
         *
         * @module Rotary Speaker Drive
         */
        drive: {
            value: converter.midi2LinearStringValue(0, 10, (rotarySpeakerOffset39W & 0b0000011111110000) >>> 4, 1, ""),
        },

        /**
         * Offset in file: 0x35 (bit7)
         *
         * @example
         * 0 = enabled (Speed Stop), 1 = disabled (Speed Slow)
         *
         * @module Rotary Speaker Stop Mode
         */
        stopMode: {
            enabled: !((organOffset35 & 0x80) >>> 7 !== 0),
        },

        /**
         * Offset in file: 0x34 (bit0)
         *
         * @example
         * 0 = Slow/Stop, 1 = Fast
         *
         * Morph Wheel:         0x35 (b6-4)
         * Morph After Touch:   0x35 (b3-1)
         * Morph Control Pedal: 0x35 (b0) and 0x36 (b7-6)
         *
         * 011 = 0x03 = morph off
         * 100 = 0x04 = morph on
         *
         * @module Rotary Speaker Speed
         */

        /***
         *          With Slow/Stop Enabled                          With Fast Enabled
         *                       0x35       0x36       0x37                      0x35       0x36       0x37
         * off:     B6 DD 15   1011 0110  1101 1101  0001 0101      B6 DD 15   1011 0110  1101 1101  0001 0101
         *
         *                      xxx                                             xxx
         * wheel:   C6 DD 15   1100 0110  1101 1101  0001 0101      C6 DD 15   1100 0110  1101 1101  0001 0101
         *
         *                          xxx     x    x          x                       xxx
         * aTouch:  B8 EE 1F   1011 1000  1110 1110  0001 1111      B8 DD 15   1011 1000  1101 1101  0001 1101
         *
         *                             x  xx                                           x  xx
         * ctrlPed: B7 1D 15   1011 0111  0001 1101  0001 0101      B7 1D 15   1011 0111  0001 1101  0001 0101
         *
         */

        speed: {
            value: mapping.rotarySpeakerSpeedMap.get(organOffset34 & 0x01),
            morph: {
                wheel: {
                    enabled: (organOffset35W & 0x7000) >>> 12 !== 0x03,
                },
                afterTouch: {
                    enabled: (organOffset35W & 0xe00) >>> 9 !== 0x03,
                },
                controlPedal: {
                    enabled: (organOffset35W & 0x01c0) >>> 6 !== 0x03,
                },
            },
        },
    };
};

/***
 * returns Effect 1
 *
 * @param buffer {Buffer}
 * @param panelOffset
 * @returns {{amount: {midi: number, morph: {afterTouch: {to: {midi: *, value: (*|string)}, enabled: *}, controlPedal: {to: {midi: *, value: (*|string)}, enabled: *}, wheel: {to: {midi: *, value: (*|string)}, enabled: *}}, value: string}, rate: {midi: number, morph: {afterTouch: {to: {midi: *, value: (*|string)}, enabled: *}, controlPedal: {to: {midi: *, value: (*|string)}, enabled: *}, wheel: {to: {midi: *, value: (*|string)}, enabled: *}}, value: string}, masterClock: {enabled: (boolean|boolean)}, source: {value: string}, type: {value: unknown}, enabled: boolean}}
 */
exports.getEffect1 = (buffer, panelOffset) => {
    const effectOffset10b = buffer.readUInt8(0x10b + panelOffset);
    const effectOffset10bW = buffer.readUInt16BE(0x10b + panelOffset);
    const effectOffset10cW = buffer.readUInt16BE(0x10c + panelOffset);
    const effectOffset10dWw = buffer.readUInt32BE(0x10d + panelOffset);
    const effectOffset110 = buffer.readUInt8(0x110 + panelOffset);
    const effectOffset110Ww = buffer.readUInt32BE(0x110 + panelOffset);

    const effect1Type = mapping.effect1TypeMap.get((effectOffset10bW & 0x0380) >>> 7);
    const effect1AmountMidi = effectOffset110 & 0x7f;
    const effect1RateMidi = (effectOffset10cW & 0x3f80) >>> 7;

    const effect1MasterClock = (effectOffset10cW & 0x4000) !== 0;
    const effect1MasterClockUsed = effect1MasterClock && (effect1Type === "Panning" || effect1Type === "Tremolo");

    return {
        /**
         * Offset in file: 0x10B (b4)
         *
         * @example
         * O = off, 1 = on
         *
         *  @module Effect 1 On
         */
        enabled: (effectOffset10b & 0x10) !== 0,

        /**
         * Offset in file: 0x10B (b3-2)
         *
         * @example
         * 0 = Organ, 1, Piano, 2 = Synth
         *
         *  @module Effect 1 Source
         */
        source: {
            value: mapping.effectSourceMap.get((effectOffset10b & 0x0c) >>> 2),
        },

        /**
         *  Offset 0 in file: 0x10B (b1-0) and 0x10C (b7)
         *
         * @example
         * 0 = A-Pan
         * 1 = Trem
         * 2 = RM
         * 3 = WA-WA
         * 4 = A-WA1
         * 5 = A-WA2
         *
         *  @module Effect 1 Type
         */
        type: {
            value: effect1Type,
        },

        /**
         * Offset in file: 0x110 (b6-0)
         *
         * @example
         * 7-bit value 0/127 = 0/10
         *
         * Morph Wheel:
         * 0x111 (b7): polarity (1 = positive, 0 = negative)
         * 0x111 (b6-b0): 7-bit raw value
         *
         * Morph After Touch:
         * 0x112 (b7): polarity (1 = positive, 0 = negative)
         * 0x112 (b6-b0): 7-bit raw value
         *
         * Morph Control Pedal:
         * 0x113 (b7): polarity (1 = positive, 0 = negative)
         * 0x113 (b6-b0): 7-bit raw value
         *
         * @see {@link api.md#organ-volume Organ Volume} for detailed Morph explanation.
         *
         * @module Effect 1 Amount
         */
        amount: {
            midi: effect1AmountMidi,

            value: converter.midi2LinearStringValue(0, 10, effect1AmountMidi, 1, ""),

            morph: getMorph(
                effectOffset110Ww,
                effect1AmountMidi,
                (x) => {
                    return converter.midi2LinearStringValue(0, 10, x, 1, "");
                },
                false
            ),
        },

        /**
         * Offset in file: 0x10C (b5-0) and 0x10D (b7)
         *
         * @example
         * 7-bit value 0/127 = 0/10
         *
         * if 'Effect 1 Master Clock' is enabled 7-bit value 0/127 = 4/1 to 1/32
         *
         * Morph Wheel:
         * 0x10D (b6): polarity (1 = positive, 0 = negative)
         * 0x10D (b5-b0) and 0x10E (b7): 7-bit raw value
         *
         * Morph After Touch:
         * 0x10E (b6): polarity (1 = positive, 0 = negative)
         * 0x10E (b5-b0) and 0x10F (b7): 7-bit raw value
         *
         * Morph Control Pedal:
         * 0x10F (b6): polarity (1 = positive, 0 = negative)
         * 0x10F (b5-b0) and 0x110 (b7): 7-bit raw value
         *
         * @see {@link api.md#organ-volume Organ Volume} for detailed Morph explanation.
         *
         * @module Effect 1 Rate
         */
        rate: {
            midi: effect1RateMidi,

            value: effect1MasterClockUsed
                ? mapping.effect1MasterClockDivisionMap.get(effect1RateMidi)
                : converter.midi2LinearStringValue(0, 10, effect1RateMidi, 1, ""),

            morph: getMorph(
                effectOffset10dWw >>> 7,
                effect1RateMidi,
                (x) => {
                    return effect1MasterClockUsed
                        ? mapping.effect1MasterClockDivisionMap.get(x)
                        : converter.midi2LinearStringValue(0, 10, x, 1, "");
                },
                false
            ),
        },

        /**
         *  Offset in file: 0x10C (b6))
         *
         * @example
         * O = off, 1 = on
         *
         *  @module Effect 1 Master Clock
         */
        masterClock: {
            enabled: effect1MasterClockUsed,
        },
    };
};

/***
 * returns Effect 2
 *
 * @param buffer
 * @param panelOffset
 * @returns {{amount: {midi: number, morph: {afterTouch: {to: {midi: *, value: (*|string)}, enabled: *}, controlPedal: {to: {midi: *, value: (*|string)}, enabled: *}, wheel: {to: {midi: *, value: (*|string)}, enabled: *}}, value: string}, rate: {midi: number, value: string}, source: {value: string}, type: {value: string}, enabled: boolean}}
 */
exports.getEffect2 = (buffer, panelOffset) => {
    const effectOffset114 = buffer.readUInt8(0x114 + panelOffset);
    const effectOffset114W = buffer.readUInt16BE(0x114 + panelOffset);
    const effectOffset115W = buffer.readUInt16BE(0x115 + panelOffset);
    const effectOffset116Ww = buffer.readUInt32BE(0x116 + panelOffset);

    const effect2AmountMidi = (effectOffset115W & 0x07f0) >>> 4;
    const effect2RateMidi = (effectOffset114W & 0x03f8) >>> 3;

    return {
        /**
         * Offset in file: 0x114 (b7)
         *
         * @example
         * O = off, 1 = on
         *
         *  @module Effect 2 On
         */
        enabled: (effectOffset114 & 0x80) !== 0,

        /**
         * Offset in file: 0x114 (b6-5)
         *
         * @example
         * 0 = Organ, 1, Piano, 2 = Synth
         *
         *  @module Effect 2 Source
         */
        source: {
            value: mapping.effectSourceMap.get((effectOffset114 & 0x60) >>> 5),
        },

        /**
         * Offset in file: 0x114 (b4-2)
         *
         * @example
         * 0 = PHAS1
         * 1 = PHAS2
         * 2 = FLANG
         * 3 = VIBE
         * 4 = CHOR1
         * 5 = CHOR2
         *
         * @module Effect 2 Type
         */
        type: {
            value: mapping.effect2TypeMap.get((effectOffset114 & 0x1c) >>> 2),
        },

        /**
         * Offset in file: 0x115 (b2-0) and 0x116 (b7-4)
         *
         * @example
         * 7-bit value 0/127 = 0/10
         *
         * Morph Wheel:
         * 0x116 (b3): polarity (1 = positive, 0 = negative)
         * 0x116 (b2-b0) and 0x117 (b7-4): 7-bit raw value
         *
         * Morph After Touch:
         * 0x117 (b3): polarity (1 = positive, 0 = negative)
         * 0x117 (b2-b0) and 0x118 (b7-4): 7-bit raw value
         *
         * Morph Control Pedal:
         * 0x118 (b3): polarity (1 = positive, 0 = negative)
         * 0x118 (b2-b0) and 0x119 (b7-4): 7-bit raw value
         *
         * @see {@link api.md#organ-volume Organ Volume} for detailed Morph explanation.
         *
         * @module Effect 2 Amount
         */
        amount: {
            midi: effect2AmountMidi,

            value: converter.midi2LinearStringValue(0, 10, effect2AmountMidi, 1, ""),

            morph: getMorph(
                effectOffset116Ww >>> 4,
                effect2AmountMidi,
                (x) => {
                    return converter.midi2LinearStringValue(0, 10, x, 1, "");
                },
                false
            ),
        },

        /**
         * Offset in file: 0x114 (b1-0) &nd 0x115 (b7-3)
         *
         * @example
         * 7-bit value 0/127 = 0/10
         *
         * @module Effect 2 Rate
         */
        rate: {
            midi: effect2RateMidi,
            value: converter.midi2LinearStringValue(0, 10, effect2RateMidi, 1, ""),
        },
    };
};

/***
 * returns Compressor
 *
 * @param buffer
 * @param panelOffset
 * @returns {{amount: {midi: number, value: string}, fast: {value: boolean}, enabled: boolean}}
 */
exports.getCompressor = (buffer, panelOffset) => {
    const effectOffset139 = buffer.readUInt8(0x139 + panelOffset);
    const effectOffset139W = buffer.readUInt16BE(0x139 + panelOffset);

    const compressorAmountMidi = (effectOffset139W & 0x1fc0) >>> 6;

    return {
        /**
         * Offset in file: 0x139 (b5)
         *
         * @example
         * O = off, 1 = on
         *
         *  @module Compressor On
         */
        enabled: (effectOffset139 & 0x20) !== 0,

        /**
         * Offset in file: 0x139 (b4-0) and 0x13A (b7-6)
         *
         * @example
         * 7-bit value 0/127 = 0/10
         *
         * @module Compressor Amount
         */
        amount: {
            midi: compressorAmountMidi,

            value: converter.midi2LinearStringValue(0, 10, compressorAmountMidi, 1, ""),
        },

        /**
         * Offset in file: 0x13A (b5)
         *
         * @example
         * O = off, 1 = on
         *
         *  @module Compressor Fast
         */
        fast: {
            enabled: (effectOffset139W & 0x0020) !== 0,
        },
    };
};

exports.getReverb = (buffer, panelOffset) => {
    const reverbOffset134 = buffer.readUInt8(0x134 + panelOffset);
    const reverbOffset134W = buffer.readUInt16BE(0x134 + panelOffset);
    const reverbOffset135W = buffer.readUInt16BE(0x135 + panelOffset);
    const reverbOffset136Ww = buffer.readUInt32BE(0x136 + panelOffset);

    const reverbAmountMidi = (reverbOffset135W & 0x1fc0) >>> 6;

    return {
        /**
         * Offset in file: 0x114 (b7)
         *
         * @example
         * O = off, 1 = on
         *
         *  @module Reverb On
         */
        enabled: (reverbOffset134 & 0x02) !== 0,

        /**
         * Offset in file: 0x134 (b0) and 0x135 (b7-6)
         *
         * @example
         * 0 = Room 1
         * 1 = Room 2
         * 2 = Stage 1
         * 3 = Stage 2
         * 4 = Hall 1
         * 5 = Hall 2
         *
         * @module Reverb Type
         */
        type: {
            value: mapping.reverbTypeMap.get((reverbOffset134W & 0x01c0) >>> 6),
        },

        /**
         * Offset in file: 0x135 (b4-0) and 0x136 (b7-6)
         *
         * @example
         * 7-bit value 0/127 = 0/10
         *
         * Morph Wheel:
         * 0x136 (b5): polarity (1 = positive, 0 = negative)
         * 0x136 (b4-b0) and 0x137 (b7-6): 7-bit raw value
         *
         * Morph After Touch:
         * 0x137 (b5): polarity (1 = positive, 0 = negative)
         * 0x137 (b4-b0) and 0x138 (b7-6): 7-bit raw value
         *
         * Morph Control Pedal:
         * 0x138 (b5): polarity (1 = positive, 0 = negative)
         * 0x138 (b4-b0) and 0x139 (b7-6): 7-bit raw value
         *
         * @see {@link api.md#organ-volume Organ Volume} for detailed Morph explanation.
         *
         * @module Reverb Amount
         */
        amount: {
            midi: reverbAmountMidi,

            value: converter.midi2LinearStringValue(0, 10, reverbAmountMidi, 1, ""),

            morph: getMorph(
                reverbOffset136Ww >>> 6,
                reverbAmountMidi,
                (x) => {
                    return converter.midi2LinearStringValue(0, 10, x, 1, "");
                },
                false
            ),
        },

        /**
         * Offset in file: 0x135 (b5)
         *
         * @example
         * O = off, 1 = on
         *
         *  @module Reverb Bright
         */
        bright: {
            enabled: (reverbOffset134W & 0x0020) !== 0,
        },
    };
};