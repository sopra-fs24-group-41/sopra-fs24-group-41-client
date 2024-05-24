import mary_poppins from "../../assets/images/mary_poppins.jpg";
import PixelShiba from "../../assets/images/PixelShiba.jpg";
import Cat from "../../assets/images/Cat.jpg";
import wombo_combo_one_hundred from "../../assets/images/wombo_combo_one_hundred.jpg";
import NeetCode from "../../assets/images/NeetCode.jpg";
import CodeAesthetic from "../../assets/images/CodeAesthetic.jpg";
import doge from "../../assets/images/doge.jpeg";
import Gamer from "../../assets/images/Gamer.jpg";
import sunglasses_gorilla from "../../assets/images/sunglasses_gorilla.jpg";
import out_of_stock from "../../assets/images/out_of_stock.jpg";
import goldblum from "../../assets/images/goldblum.jpg";
import blank_page from "../../assets/images/blank_page.jpeg";
import Hyperplexed from "../../assets/images/Hyperplexed.jpg";
import Puppy from "../../assets/images/Puppy.jpg";
import Primeagen from "../../assets/images/Primeagen.jpg";
import MudMon from "../../assets/images/MudMon.jpg";
import gandalf from "../../assets/images/gandalf.jpg";
import mud from "../../assets/images/mud.jpeg";
import get_over_it from "../../assets/images/get_over_it.jpg";
import CoolPenguin from "../../assets/images/CoolPenguin.jpg";
import Sandcastle from "../../assets/images/Sandcastle.jpg";
import PinkBunny from "../../assets/images/PinkBunny.jpg";
import i_am_speed from "../../assets/images/i_am_speed.jpg";
import Zaddy from "../../assets/images/Zaddy.jpg";
import AnonPenguin from "../../assets/images/AnonPenguin.jpg";
import BroDog from "../../assets/images/BroDog.jpg";
import BlueFrog from "../../assets/images/BlueFrog.jpg";
import aquaman from "../../assets/images/aquaman.jpeg";
import speedrunner from "../../assets/images/speedrunner.jpg";
import sad_bear from "../../assets/images/sad_bear.jpg";
import flash_dc from "../../assets/images/flash_dc.jpg";
import b001 from "../../assets/images/b001.jpg";
import moon from "../../assets/images/moon.jpg";
import RedSquid from "../../assets/images/RedSquid.jpg";
import AlienDude from "../../assets/images/AlienDude.jpg";
import Platypus from "../../assets/images/Platypus.jpg";
import crowned_sad_face from "../../assets/images/crowned_sad_face.jpeg";
import Wizard from "../../assets/images/Wizard.jpg";
import SpaceDude from "../../assets/images/SpaceDude.jpg";
import sandcastle_v2 from "../../assets/images/sandcastle_v2.jpeg";
import octopus from "../../assets/images/octopus.jpg";
import architect from "../../assets/images/architect.jpg";
import pikachu from "../../assets/images/pikachu.jpg";
import Catsy from "../../assets/images/Catsy.jpg";

const convertLowercase = (obj) => {
    return Object.entries(obj).reduce((newObj, [key, value]) => {
        newObj[key.toLowerCase()] = value;

        return newObj;
    }, {});
}

const tmp  = {
    mary_poppins: mary_poppins,
    PixelShiba: PixelShiba,
    Cat: Cat,
    wombo_combo_one_hundred: wombo_combo_one_hundred,
    NeetCode: NeetCode,
    CodeAesthetic: CodeAesthetic,
    doge: doge,
    Gamer: Gamer,
    sunglasses_gorilla: sunglasses_gorilla,
    out_of_stock: out_of_stock,
    goldblum: goldblum,
    blank_page: blank_page,
    Hyperplexed: Hyperplexed,
    Puppy: Puppy,
    Primeagen: Primeagen,
    MudMon: MudMon,
    gandalf: gandalf,
    mud: mud,
    get_over_it: get_over_it,
    CoolPenguin: CoolPenguin,
    Sandcastle: Sandcastle,
    PinkBunny: PinkBunny,
    i_am_speed: i_am_speed,
    Zaddy: Zaddy,
    AnonPenguin: AnonPenguin,
    BroDog: BroDog,
    BlueFrog: BlueFrog,
    aquaman: aquaman,
    speedrunner: speedrunner,
    sad_bear: sad_bear,
    flash_dc: flash_dc,
    b001: b001,
    moon: moon,
    RedSquid: RedSquid,
    AlienDude: AlienDude,
    Platypus: Platypus,
    crowned_sad_face: crowned_sad_face,
    Wizard: Wizard,
    SpaceDude: SpaceDude,
    sandcastle_v2: sandcastle_v2,
    octopus: octopus,
    architect: architect,
    pikachu: pikachu,
    Catsy: Catsy,
};


const IMAGES = convertLowercase(tmp)

export default IMAGES;
