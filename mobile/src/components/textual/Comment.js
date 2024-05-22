import { StyleSheet, Text } from 'react-native';
import { Black } from '../../../assets/colors';

const style = StyleSheet.create({
    comment: {
        fontFamily: "InterMedium",
        fontSize: 12,
        color: Black
    },

})

const Comment = ({ comment, centralized, expand }) => {
    return (
        <Text style={[
            style.comment,
            { alignSelf: (centralized != null) && centralized ? "center" : null },
            { maxWidth: (expand != null) && expand ? "100%" : null }
        ]}>{comment}</Text>
    )
}

export default Comment;