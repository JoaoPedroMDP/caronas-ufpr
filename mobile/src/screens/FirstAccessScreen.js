import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import Section from "../components/layout/Section";
import Vspacer from "../components/layout/Vspacer";
import { StyleSheet, View, Text } from "react-native";
import gs from "../globalStyles";

const FirstAccessScreen = ({ navigation }) => {
    let vocative = "Acabou de chegar?? Veja como funciona o app:";
    let steps = [
        "Você cadastra suas rotas e os horários",
        "Te mostramos as pessoas que fazem o mesmo trajeto",
        "Você pede uma parceria, e...",
        "Se a pessoa aceitar, vocês combinam como farão o trajeto!"
    ];
    let importantPoints = [
        "Não pedimos o endereço exato da sua casa: Por hora, vamos nos preocupar apenas com o bairro. Preferimos deixar que você decida se revelará seu endereço, ou se marcará um ponto de encontro em comum",
        "Não traçamos rotas: Uai, quem manda é você!!",
        "Não garantimos carona gratuita: A verdade é que a demanda por carona é maior que a oferta. Então vamos juntar você com pessoas que fazem o mesmo trajeto, e vocês decidem se racham uma corrida de aplicativo, se dão carona um ao outro ou se apenas serão parceiros de busão!"
    ];
    let end = "E pra finalizar: este app foi feito por estudantes, para estudantes. Embora desejamos entregar o melhor para vocês, ainda estamos em processo de aprendizado!! Ficaremos felizes em receber feedbacks e sugestões de melhorias!!";

    return (
        <ScrollView>
            <Screen title="Caronas UFPR">
                <Section title={vocative}>
                    {steps.map((step, index) => {
                        return (
                            <Text key={index}>{(index + 1).toString() + ". " + step}</Text>
                        );
                    })}
                </Section>
                <Vspacer h={10} />
                <Section title={"Importante!!"}>
                    {importantPoints.map((point, index) => {
                        return (
                            <View key={index}>
                                <Text key={index}>{(index + 1).toString() + ". " + point}</Text>
                                <Vspacer h={5} />
                            </View>
                        );
                    })}
                </Section>
                <Vspacer h={20} />
                <Text style={styles.end}>{end}</Text>
                <View style={[gs.flexRow, gs.justifyEnd, {marginBottom: 10}]}>
                    <CustomButton label="Começar" onClickHandler={() => {navigation.navigate("Cadastrar-se")}}/>
                </View>
            </Screen>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    end: {
        textAlign: "left",
        fontSize: 15,
        fontFamily: "InterBold",
    }
});


export default FirstAccessScreen;