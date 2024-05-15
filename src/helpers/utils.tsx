import ICONS from "../assets/icons/index.js";

//Basic String hashing, hash it to the concatenated ASCII values
//e.g h("abba") = 97989897
const hashForAnon = (name: string) => {
    let hash = 0;
    let asciiConcatenation = "";

    for (let i = 0; i < name.length; i++) {
        asciiConcatenation += name.charCodeAt(i).toString();
    }

    hash = parseInt(asciiConcatenation);
    const iconNames = Object.keys(ICONS);
    const iconIndex = Math.abs(hash) % iconNames.length;

    return iconNames[iconIndex];
};

export default hashForAnon