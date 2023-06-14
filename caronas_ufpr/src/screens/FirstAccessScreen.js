import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import Section from "../components/layout/Section";
import Vspacer from "../components/layout/Vspacer";
import Comment from "../components/textual/Comment";
import SubTitle from "../components/textual/Subtitle";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({});

const FirstAccessScreen = ({ navigation }) => {
    let vocative = "Acabou de chegar?? Veja como funciona o app:";
    let steps = [
        "Você cadastra suas rotas e os horários",
        "Te mostramos as pessoas que fazem o mesmo trajeto",
        "Você economiza e ainda ganha uma companhia!"
    ];
    let importantPoints = [
        "Não pedimos o endereço exato da sua casa: Por hora, vamos nos preocupar apenas com o bairro. Preferimos deixar que você decida se revelará seu endereço, ou se marcará um ponto de encontro em comum",
        "Não traçamos rotas: Uai, quem manda é você!!",
        "Não garantimos carona gratuita: A verdade é que a demanda por carona é maior que a oferta. Então vamos juntar você com pessoas que fazem o mesmo trajeto, e vocês decidem se racham uma corrida de aplicativo, se dão carona um ao outro ou se apenas serão parceiros de busão!"
    ];
    let end = "E pra finalizar: este app foi feito por estudantes, para estudantes. Embora desejamos entregar o melhor para vocês, ainda estamos em processo de aprendizado!! Ficaremos felizes em receber feedbacks e sugestões de melhorias!!";

    return (
        <Screen title="Caronas UFPR" centralized>
            <Section title={vocative}>
                {steps.map((step, index) => {
                    return (
                        <Comment
                            key={index}
                            comment={(index + 1).toString() + ". " + step}
                        />
                    );
                })}
            </Section>
            <Vspacer h={10} />
            <SubTitle subtitle={"Importante!!"} />
            {importantPoints.map((point, index) => {
                return (
                    <View key={index}>
                        <Comment
                            key={index}
                            comment={(index + 1).toString() + ". " + point}
                        />
                        <Vspacer h={5} />
                    </View>
                );
            })}
            <Vspacer h={10} />
            <SubTitle subtitle={end} justify />
            <View>
                <CustomButton label="Começar" alignment="end" />
            </View>
        </Screen>
    );
};

export default FirstAccessScreen;