import { StyleSheet, Pressable, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { Black, LightGray, MediumGray, White } from '../../../assets/colors';

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
    smallButton: {
        borderRadius: 8,
        minWidth: 30,
    },
    text: {
        fontFamily: "InterBold",
        margin: 10
    },
    smallText: {
        fontFamily: "InterBold",
        margin: 5,
        fontSize: 14
    }
})

const CustomButton = ({ label, onClickHandler, disabled, containerStyle, alignment, inverted, small, bgColor, txColor }) => {
    // label: string; // Texto do botão
    // onClickHandler: function; // Função a ser executada ao clicar no botão
    // disabled: boolean; // Se o botão está desabilitado
    // containerStyle: object; // Estilo do container do botão
    /* alignment: string; // Alinhamento do botão (start, center, end). Para que o alignment funcione, 
        basta envelopar o botão em um View, sem necessidade de estilos
    */
    // inverted: boolean; // Se o botão está invertido
    // small: boolean; // Se o botão é pequeno

    const [clicked, setClicked] = useState(false);
    const alignmentStyle = determineAlignment();
    let aligStyle = {
        justifyContent: alignmentStyle,
        display: 'flex',
        flexGrow: alignment != null ? 1 : 0,
        flexDirection: 'row'
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

    let textColor = txColor ?? White;
    let backgroundColor = bgColor ?? Black;

    if (disabled) textColor = MediumGray;

    if (clicked || inverted != undefined) {
      textColor = LightGray;
      backgroundColor = Black; 
    }

    return (
      <View style={[styles.teste, aligStyle]}>
          <Pressable
              disabled={disabled}
              onPressIn={() => setClicked(true)}
              onPressOut={clickButton}
              style={[styles.container, containerStyle]}
          >
              <View style={[small ? styles.smallButton : styles.button, { backgroundColor: backgroundColor }]}>
                  <Text style={[small ? styles.smallText : styles.text, { color: textColor }]}>{label}</Text>
              </View>
          </Pressable>
      </View>
    );
}

export default CustomButton;
