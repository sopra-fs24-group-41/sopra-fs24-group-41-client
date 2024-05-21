import PinkBunny from "../../assets/images/PinkBunny.JPG"
import RedSquid from "../../assets/images/RedSquid.JPG"
import BlueFrog from "../../assets/images/BlueFrog.JPG"
import PixelShiba from "../../assets/images/PixelShiba.jpg"
import SunglassesGorilla from "../../assets/images/SunglassesGorilla.jpg"
import AlienDude from "../../assets/images/AlienDude.jpg"
import SpaceDude from "../../assets/images/SpaceDude.jpg"
import AnonPenguin from "../../assets/images/AnonPenguin.jpg"
import Architect from "../../assets/images/Architect.jpg"
import BroDog from "../../assets/images/BroDog.jpg"
import Cat from "../../assets/images/Cat.jpg"
import Catsy from "../../assets/images/Catsy.jpg"
import CoolPenguin from "../../assets/images/CoolPenguin.jpg"
import Gamer from "../../assets/images/Gamer.jpg"
import MaryPoppins from "../../assets/images/MaryPoppins.jpg"
import MudMon from "../../assets/images/MudMon.jpg"
import Sandcastle from "../../assets/images/Sandcastle.jpg"
import Puppy from "../../assets/images/Puppy.jpg"
import Platypus from "../../assets/images/Platypus.jpg"
import Wizard from "../../assets/images/Wizard.jpg"
import Zaddy from "../../assets/images/Zaddy.jpg"


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
    AnonPenguin : AnonPenguin,
    Architect : Architect,
    BroDog : BroDog,
    Cat : Cat,
    Catsy : Catsy,
    CoolPenguin : CoolPenguin,
    Gamer : Gamer,
    MaryPoppins : MaryPoppins,
    MudMon : MudMon,
    Sandcastle : Sandcastle,
    Puppy : Puppy,
    Platypus : Platypus,
    Wizard : Wizard,
    Zaddy : Zaddy
}

IMAGES = convertLowercase(IMAGES)

export default IMAGES

