const path = require("path");
const { getVersion } = require("./converter");
const CryptoJS = require("crypto-js");
const xxh = require("xxhashjs");

const sampleCategoryMap = new Map([
    [
        1,
        {
            category: "Bass",
            subCategory: new Map([[0, ""]]),
        },
    ],
    [
        3,
        {
            category: "Accordeon/Harm",
            subCategory: new Map([[0, ""]]),
        },
    ],
    [
        4,
        {
            category: "FX",
            subCategory: new Map([[0, ""]]),
        },
    ],
    [
        5,
        {
            category: "Guitar/Ethnic Str",
            subCategory: new Map([[0, ""]]),
        },
    ],
    [
        6,
        {
            category: "Organ",
            subCategory: new Map([[0, ""]]),
        },
    ],
    [
        7,
        {
            category: "Chromatic Perc",
            subCategory: new Map([[1, ""]]),
        },
    ],
    [
        8,
        {
            category: "Piano",
            subCategory: new Map([[0, ""]]),
        },
    ],
    [
        9,
        {
            category: "Strings",
            subCategory: new Map([
                [1, "Solo"],
                [2, "Ens"],
                [3, "Analog"],
            ]),
        },
    ],
    [
        10,
        {
            category: "Synth",
            subCategory: new Map([
                [1, "Pad"],
                [2, "Ens"],
                [3, "Bass"],
                [4, "Classic"],
                [7, "Lead"],
            ]),
        },
    ],
    [
        11,
        {
            category: "Choir",
            subCategory: new Map([[0, ""]]),
        },
    ],
    [
        12,
        {
            category: "Wind/Brass",
            subCategory: new Map([
                [1, "Solo"],
                [2, "Ens"],
            ]),
        },
    ],
    [
        14,
        {
            category: "Misc",
            subCategory: new Map([[0, ""]]),
        },
    ],
    [
        16,
        {
            category: "Mellotron",
            subCategory: new Map([[0, ""]]),
        },
    ],
    [
        18,
        {
            category: "WoodWind",
            subCategory: new Map([
                [1, "Solo"],
                [2, "Ens"],
            ]),
        },
    ],
    [
        255,
        {
            category: "None",
            subCategory: new Map([[255, ""]]),
        },
    ],
]);

/**
 *
 * @param buffer {Buffer}
 * @param offset
 */
const getString = (buffer, offset) => {
    let ch;
    let str = "";
    do {
        ch = buffer.readInt8(offset++);
        if (ch !== 0) {
            str += String.fromCharCode(ch);
        }
    } while (ch !== 0);
    return str;
};

exports.loadNs3SampleFile = (buffer, filename) => {
    let isPiano = false;

    if (buffer.length > 16) {
        const claviaSignature = buffer.toString("utf8", 0, 4);
        if (claviaSignature !== "CBIN") {
            throw new Error("Invalid Nord file");
        }
        const fileExt = buffer.toString("utf8", 8, 12);
        if (fileExt !== "npno" && fileExt !== "nsmp" && fileExt !== "nsmp3") {
            throw new Error(fileExt + " file are not supported, select a valid npno/nsmp/nsmp3 file");
        }
        isPiano = fileExt === "npno";
    }

    const offset04 = buffer.readUInt8(0x04);
    const offset18 = buffer.readUInt32BE(0x018);

    let versionOffset = 0; // default latest version
    if (offset04 !== 1) {
        //console.log("Offset 0x04 <> 1 switched to legacy mode");
        versionOffset = -20;
    }

    const sampleValue = buffer.readUInt16LE(0x0e);
    const sampleVersion = getVersion(buffer, 0x14);
    // minor version is on one digit only...
    // but of the time except on some older sample (Woodwind Alto recorder version is 3.11)
    if (sampleVersion.version.charAt(sampleVersion.version.length - 1) === "0") {
        sampleVersion.version = sampleVersion.version.slice(0, -1);
    }

    const sampleCategoryValue = buffer.readUInt8(0x12);
    const sampleSubCategoryValue = buffer.readUInt8(0x10);
    const sampleCategory = sampleCategoryMap.get(sampleCategoryValue) || {
        category: "category " + sampleCategoryValue,
        subCategory: new Map([]),
    };
    let sampleSubCategory = sampleCategory.subCategory.get(sampleSubCategoryValue);
    if (sampleSubCategory === undefined) {
        sampleSubCategory = "sub category " + sampleSubCategoryValue;
    }

    const category = `${sampleSubCategory ? sampleSubCategory + " " : ""}${sampleCategory.category}`;

    const fileExt = path.extname(filename);
    const nameOffset = isPiano ? 0x48 : 0x52;

    let sampleName = getString(buffer, nameOffset + versionOffset);
    let sampleNameV6 = (isPiano && sampleVersion.majorVersion) >= 6 ? getString(buffer, 0x68 + versionOffset) : "";

    const sampleInfoOffset = (isPiano && sampleVersion.majorVersion) >= 6 ? 0x88 : 0x94;
    let sampleInfo = getString(buffer, sampleInfoOffset + versionOffset).trim();

    const sampleFileName = path.basename(filename, fileExt);

    // some synth sample (v2) have no information property
    // reading the value from the filename
    // if (!sampleInfo) {
    //     const details = Array.from(new Set(sampleFileName.split("_")));
    //     if (details.length > 1) {
    //         sampleInfo = details[details.length - 1];
    //     }
    //     if (details.length > 2) {
    //         const moreDetails = details[details.length - 2];
    //         if (!sampleName.includes(moreDetails)) {
    //             sampleName += ` ${moreDetails}`;
    //         }
    //     }
    // }

    // on piano sample file, the name and information details are mixed
    // in the same string...
    // ex: "Studio Grand 2 #YaC7     Lrg"
    // final name is "Studio Grand 2 Lrg" and info is "YaC7"...

    const namePos = sampleName.indexOf("#");
    if (namePos > -1) {
        const right = sampleName.slice(-(sampleName.length - namePos - 1));
        const items = Array.from(new Set(right.split(" ")));
        const size = items.pop().trim();
        const info = items.join(" ").trim();
        sampleName = sampleName.substr(0, namePos) + (size ? " " + size : "");
        if (!sampleInfo) {
            sampleInfo += info;
        }
    }

    // Piano sample v6 are using offset 0x68 to define the name...
    if (sampleNameV6) {
        const items = sampleName.split(" ");
        const size = items.pop();
        sampleName = sampleNameV6 + (size ? " " + size : "");
    }

    const hash =xxh.h32(filename, 0x4342).toString(16);  // CryptoJS.SHA3(filename);

    const hashId = hash.toString();


    return {
        version: sampleVersion.version,

        sampleValue: sampleValue,

        sampleName: sampleName,
        sampleInfo: sampleInfo,
        fileName: sampleFileName,
        fileExt: fileExt.replace(".", ""),
        fileSize: buffer.length,
        category: category,
        hashId: hashId,
        offset18: offset18,
    };
};
