import { StyleSheet, Pressable, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { Black, LightGray } from '../../../assets/colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: "flex-start",
        marginVertical: 5,
    },
    button: {
        borderRadius: 10,
        minWidth: 45,
    },
    text: {
        fontFamily: "InterBold",
        margin: 10
    },
    teste: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row'
    }
})

const CustomButton = ({ label, onClickHandler, disabled, containerStyle, alignment }) => {
    // label: string; // Texto do botão
    // onClickHandler: function; // Função a ser executada ao clicar no botão
    // disabled: boolean; // Se o botão está desabilitado
    // containerStyle: object; // Estilo do container do botão
    /* alignment: string; // Alinhamento do botão (start, center, end). Para que o alignment funcione, 
        basta envelopar o botão em um View, sem necessidade de estilos
    */
    const [clicked, setClicked] = useState(false);
    const alignmentStyle = determineAlignment();
    let aligStyle = {
        justifyContent: alignmentStyle
    };

    function determineAlignment() {
        if (alignment != null) {
            if (alignment === "center") {
                return "center";
            }else{
                return "flex-" + alignment;
            }
        } else {
            return null;
        }
    }

    function clickButton() {
        setClicked(false);
        onClickHandler(clicked);
    }

    return (
        <View style={[styles.teste, aligStyle]}>
            <Pressable
                disabled={disabled}
                onPressIn={() => setClicked(true)}
                onPressOut={clickButton}
                style={[styles.container, containerStyle]}
            >
                <View style={[styles.button, { backgroundColor: clicked ? Black : LightGray }]}>
                    <Text style={[styles.text, { color: clicked ? LightGray : Black }]}>{label}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default CustomButton;
