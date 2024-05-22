import {
    Platform,
    StyleSheet
} from 'react-native';

import { LightGray, Black, White } from './colors';

export const ICONS = {
    ARROW_DOWN: require("../node_modules/react-native-dropdown-picker/src/themes/light/icons/arrow-down.png"),
    ARROW_UP: require('../node_modules/react-native-dropdown-picker/src/themes/light/icons/arrow-up.png'),
    TICK: require('../node_modules/react-native-dropdown-picker/src/themes/light/icons/tick.png'),
    CLOSE: require('../node_modules/react-native-dropdown-picker/src/themes/light/icons/close.png')
};

export default StyleSheet.create({
    container: {
        width: '100%',
    },
    style: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: 50,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: LightGray
    },
    label: {
        flex: 1,
        color: Black
    },
    labelContainer: {
        flex: 1,
        flexDirection: "row",
    },
    arrowIcon: {
        width: 20,
        height: 20
    },
    tickIcon: {
        width: 20,
        height: 20
    },
    closeIcon: {
        width: 30,
        height: 30
    },
    badgeStyle: {
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: LightGray,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    badgeDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginRight: 8,
        backgroundColor: LightGray
    },
    badgeSeparator: {
        width: 5,
    },
    listBody: {
        height: '100%',
    },
    listBodyContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    dropDownContainer: {
        position: 'absolute',
        backgroundColor: LightGray,
        borderRadius: 8,
        width: '100%',
        overflow: 'hidden',
        zIndex: 1000
    },
    modalContentContainer: {
        flexGrow: 1,
    },
    listItemContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40
    },
    listItemLabel: {
        flex: 1,
        color: Black
    },
    iconContainer: {
        marginRight: 10
    },
    arrowIconContainer: {
        marginLeft: 10
    },
    tickIconContainer: {
        marginLeft: 10
    },
    closeIconContainer: {
        marginLeft: 10
    },
    listParentLabel: {

    },
    listChildLabel: {

    },
    listParentContainer: {

    },
    listChildContainer: {
        paddingLeft: 40,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,
        borderColor: Black,
    },
    searchTextInput: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        color: Black
    },
    itemSeparator: {
        height: 1,
        backgroundColor: Black,
    },
    flatListContentContainer: {
        flexGrow: 1
    },
    customItemContainer: {

    },
    customItemLabel: {
        fontStyle: 'italic',
        fontFamily: "InterRegular"
    },
    listMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    listMessageText: {

    },
    selectedItemContainer: {

    },
    selectedItemLabel: {

    },
    modalTitle: {
        fontFamily: "InterBold",
        fontSize: 18,
        color: Black
    },
    extendableBadgeContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        flex: 1
    },
    extendableBadgeItemContainer: {
        marginVertical: 3,
        marginEnd: 7
    }
});