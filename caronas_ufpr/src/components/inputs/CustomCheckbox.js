import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Black, White } from "../../../assets/colors";

const CustomCheckbox = ({ label, onPress }) => {
    return (
        <BouncyCheckbox
            size={25}
            bouncinessIn={0}
            bouncinessOut={0}
            fillColor={Black}
            unfillColor={White}
            text={label}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ fontFamily: "InterMedium", color: Black, textDecorationLine: "none" }}
            onPress={onPress}
        />
    );
}

export default CustomCheckbox;