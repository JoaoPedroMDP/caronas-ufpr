import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import Title from '../components/textual/Title';
import Section from '../components/layout/Section';
import ListPicker from '../components/inputs/ListPicker';
import Screen from '../components/layout/Screen';
import { pickablelize } from '../contrib';
import CustomSwitch from '../components/inputs/CustomSwitch';
import TimePicker from '../components/inputs/TimePicker';
import WeekDaySelector from '../components/inputs/WeekDaySelector';
import { intentions } from '../consts';
import CustomCheckbox from '../components/inputs/CustomCheckbox';
import CustomButton from '../components/inputs/CustomButton';

const EndpointLayout = ({ endpointOptions, setEndpoint, endpointType, switchEndpointType }) => {
    return (
        <View style={styles.endpoint}>
            <ListPicker
                items={pickablelize(endpointOptions[endpointType])}
                returnValue={setEndpoint}
                placeholder="Selecione um local"
            />
            <View style={styles.endpointType}>
                <Text style={styles.endpointTypeText}>{endpointType === "campus" ? "Campus" : "Bairro"}</Text>
                <CustomSwitch
                    switchValue={endpointType === "campus"}
                    onSwitchHandler={switchEndpointType}
                />
            </View>
        </View>
    );
}

const RegisterRouteScreen = ({ navigation }) => {
    const teste = {
        "campus": ["Campus1", "Campus2", "Campus3", "Campus4", "Campus5", "Campus6", "Campus7", "Campus8"],
        "neighborhood": ["Bairro1", "Bairro2", "Bairro3", "Bairro4", "Bairro5", "Bairro6", "Bairro7", "Bairro8"]
    };

    const [origin, setOrigin] = useState("");
    const [originType, setOriginType] = useState("campus");
    const [destiny, setDestiny] = useState("");
    const [destinyType, setDestinyType] = useState("campus");
    const [destinyTime, setDestinyTime] = useState(new Date());
    const [formattedDestinyTime, setFormattedDestinyTime] = useState(null);
    const [weekDays, setWeekDays] = useState([]);
    const [userIntentions, setUserIntentions] = useState([]);

    function getEndpointType(currentType) {
        return currentType === "campus" ? "neighborhood" : "campus";
    }

    function getTimeString(date) {
        return date.getHours().toString() + ":" + date.getMinutes().toString();
    }

    function saveWeekDays(days) {
        setWeekDays(days);
    }

    function saveTime(date) {
        setDestinyTime(date.getTime());
        setFormattedDestinyTime(getTimeString(date));
    }

    function saveIntentions(intention) {
        let intentionValue = intention.value;
        let newIntentions = userIntentions;
        if (newIntentions.includes(intentionValue)) {
            newIntentions = newIntentions.filter((item) => item !== intentionValue);
        }
        else {
            newIntentions.push(intentionValue);
        }
        setUserIntentions(newIntentions);
    }

    function registerRoute() {
        console.log("Rota registrada!");
        console.log("Origem: " + origin);
        console.log("Tipo de origem: " + originType);
        console.log("Destino: " + destiny);
        console.log("Tipo de destino: " + destinyType);
        console.log("Horário: " + formattedDestinyTime);
        console.log("Dias da semana: " + weekDays);
        console.log("Intenções: " + userIntentions);
        navigation.navigate("Home");
    }

    return (
        <ScrollView>
            <Screen title="Cadastrar Rota">
                <Section title="A ideia é simples: nos conte de onde sai, e pra onde vai :)" description="Ps: nos horários, dê preferência para múltiplos de meia hora. Ex: 18h30, 19h, 19h30, 20h. Vai ser mais fácil de achar alguém :D" />
                <Section title="Saída">
                    <EndpointLayout
                        endpointOptions={teste}
                        setEndpoint={setOrigin}
                        endpointType={originType}
                        switchEndpointType={() => { setOriginType(getEndpointType(originType)) }}
                    />
                </Section>
                <Section title="Chegada">
                    <EndpointLayout
                        endpointOptions={teste}
                        setEndpoint={setDestiny}
                        endpointType={destinyType}
                        switchEndpointType={() => { setDestinyType(getEndpointType(destinyType)) }}
                    />
                    <TimePicker time={destinyTime} returnTime={saveTime} pickerLabel={formattedDestinyTime} />
                </Section>
                <Section title={"Dias da semana"}>
                    <WeekDaySelector
                        weekDays={weekDays}
                        returnWeekDays={saveWeekDays}
                    />
                </Section>
                <Section title={"Intenção"} description="Agora, nos diga o que você deseja para essa rota. Você pode selecionar mais de uma opção ;)">
                    <View>
                        {intentions.map((item, index) => {
                            return (
                                <CustomCheckbox
                                    key={index}
                                    label={item.label}
                                    onPress={() => saveIntentions(item)}
                                />
                            );
                        })}
                    </View>
                </Section>
                <View style={styles.registerButton}>
                    <CustomButton
                        containerStyle={{ alignSelf: "flex-end" }}
                        label="Cadastrar"
                        onClickHandler={registerRoute}
                    />
                </View>
            </Screen>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    endpoint: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    endpointTypeSwitch: {
        marginLeft: 10
    },
    endpointDropdown: {
        width: "60%"
    },
    endpointType: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    },
    endpointTypeText: {
        fontFamily: "InterRegular",
        marginRight: 5
    },
    registerButton: {
        display: "flex",
        marginBottom: 20
    }
})

export default RegisterRouteScreen;