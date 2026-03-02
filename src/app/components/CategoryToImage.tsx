
import ForKnife from "../../assets/ForkKnife.png";
import DesktopTower from "../../assets/DesktopTower.png";
import Car from "../../assets/Car.png";
import Wrench from "../../assets/Wrench.png";
import Vector from "../../assets/Vector.png";



export const CategoryToImage = (category: string) => {


    switch (category) {

        case "food":
            return ForKnife;
        case "hosting":
            return DesktopTower;
        case "transport":
            return Car;
        case "services":
            return Wrench;
        case "others":
            return Vector;



    }

}