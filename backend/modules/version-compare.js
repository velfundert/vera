var _ = require('lodash');

module.exports = function(versionA, versionB) {
    if(versionA === versionB) {
        return 0
    }

    if(!comparableVersion(versionA) || !comparableVersion(versionB)) {
        return null;
    }

    return vercmp(versionA, versionB)
}

const vercmp = function (versionA, versionB) {
    const versionASequence = versionA.replace("-SNAPSHOT", "").split(".").map(Number);
    const versionBSequence = versionB.replace("-SNAPSHOT", "").split(".").map(Number)

    _.range(versionASequence.length, versionBSequence.length).forEach(() => {versionASequence.push(0)})
    _.range(versionBSequence.length, versionASequence.length).forEach(() => {versionBSequence.push(0)})

    for(var i = 0; i < versionASequence.length; i++) {
        if(versionASequence[i] === versionBSequence[i]) {
            continue
        }
        if(versionASequence[i] < versionBSequence[i]) {
            return -1
        }
        if(versionASequence[i] > versionBSequence[i]) {
            return 1
        }
    }

    if(versionA.includes("SNAPSHOT")) {
        return -1;
    }

    if(versionB.includes("SNAPSHOT")) {
        return 1;
    }

    return 0;
}

// Will match versions like 1, 1.2, 1.2.3, 1.2.3-SNAPSHOT
// but not 2.0.0-mod-alpha69, QASS294.14HL4.0 and other bat chit crazy version numbers
const comparableVersion = function(version) {
    const parsableVersionPattern = /^[0-9]+(\.[0-9]+|-SNAPSHOT)*?$/
    return parsableVersionPattern.test(version)
}