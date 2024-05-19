import PinkBunny from "../../assets/images/PinkBunny.JPG"
import RedSquid from "../../assets/images/RedSquid.JPG"
import BlueFrog from "../../assets/images/BlueFrog.JPG"
import PixelShiba from "../../assets/images/PixelShiba.jpg"
import SunglassesGorilla from "../../assets/images/SunglassesGorilla.jpg"
import AlienDude from "../../assets/images/AlienDude.jpg"
import SpaceDude from "../../assets/images/SpaceDude.jpg"
import AnonPenguin from "../../assets/images/AnonPenguin.jpg"


const convertLowercase = (obj) => {
    return Object.entries(obj).reduce((newObj, [key, value]) => {
        newObj[key.toLowerCase()] = value;

        return newObj;
    }, {});
}

let IMAGES = {
    BlueFrog: BlueFrog,
    PinkBunny: PinkBunny,
    RedSquid : RedSquid,
    PixelShiba : PixelShiba,
    SunglassesGorilla : SunglassesGorilla,
    AlienDude : AlienDude,
    spacedude : SpaceDude,
    AnonPenguin : AnonPenguin
}

IMAGES = convertLowercase(IMAGES)

export default IMAGES

