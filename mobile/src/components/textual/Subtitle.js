import { Text } from 'react-native';
import gs from '../../globalStyles';

const SubTitle = ({ subtitle, centralized, justify }) => {
    return (
        <Text style={[
            gs.regularText,
            { alignSelf: (centralized != null) && centralized ? "center" : null },
            { textAlign: justify != null ? "justify" : null }
        ]}>{subtitle}</Text>
    )
}

export default SubTitle;