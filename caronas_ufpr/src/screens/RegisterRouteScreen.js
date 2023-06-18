import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Section from '../components/layout/Section';
import ListPicker from '../components/inputs/ListPicker';
import Screen from '../components/layout/Screen';
import CustomSwitch from '../components/inputs/CustomSwitch';
import TimePicker from '../components/inputs/TimePicker';
import WeekDaySelector from '../components/inputs/WeekDaySelector';
import { intentions } from '../consts';
import CustomCheckbox from '../components/inputs/CustomCheckbox';
import CustomButton from '../components/inputs/CustomButton';
import { saveRoute, getPlaces } from '../components/apis/caronasApi';
import { getFormattedDateTimeString } from '../contrib';

const EndpointLayout = ({ endpointOptions, setEndpoint, endpointType, switchEndpointType }) => {
    function returnEndpoint(endpoint) {
        setEndpoint(endpoint);
    }

    return (
        <View style={styles.endpoint}>
            <ListPicker
                items={endpointOptions[endpointType]}
                returnValue={returnEndpoint}
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
    const [places, setPlaces] = useState({});
    const [origin, setOrigin] = useState("");
    const [originType, setOriginType] = useState("campus");
    const [destiny, setDestiny] = useState("");
    const [destinyType, setDestinyType] = useState("campus");
    const [destinyTime, setDestinyTime] = useState(new Date());
    const [formattedDestinyTime, setFormattedDestinyTime] = useState(null);
    const [weekDays, setWeekDays] = useState([]);
    const [userIntentions, setUserIntentions] = useState([]);


    useFocusEffect(
        useCallback(() => {
          let isActive = true;
      
          const fetchData = async () => {
            let allEndpoints = await getPlaces();
            let classified = {}
            allEndpoints.forEach((endpoint) => {
                if(!classified[endpoint.type]) {
                    classified[endpoint.type] = [];
                }

                // Preciso adicionar o label e o key para o ListPicker
                classified[endpoint.type].push({
                    ...endpoint,
                    label: endpoint.name,
                    key: endpoint.id
                });
            })
            setPlaces(classified);
          };

          fetchData();      
          return () => {
            isActive = false;
          };
        }, [])
      );


    function getEndpointType(currentType) {
        return currentType === "campus" ? "neighborhood" : "campus";
    }

    function saveTime(date) {
        setDestinyTime(date.getTime());
        setFormattedDestinyTime(getFormattedDateTimeString(date));
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

    async function registerRoute() {
        let succeed = await saveRoute(origin, destiny, formattedDestinyTime, weekDays, userIntentions, 1);
        if (succeed) {
            console.log("Rota cadastrada com sucesso");
        }else{
            console.log("Erro ao cadastrar rota");
        }
    }

    return (
        <ScrollView>
            <Screen title="Cadastrar Rota">
                <Section title="A ideia é simples: nos conte de onde sai, e pra onde vai :)" description="Ps: nos horários, dê preferência para múltiplos de meia hora. Ex: 18h30, 19h, 19h30, 20h. Vai ser mais fácil de achar alguém :D" />
                <Section title="Saída">
                    <EndpointLayout
                        endpointOptions={places}
                        setEndpoint={setOrigin}
                        endpointType={originType}
                        switchEndpointType={() => { setOriginType(getEndpointType(originType)) }}
                    />
                </Section>
                <Section title="Chegada">
                    <EndpointLayout
                        endpointOptions={places}
                        setEndpoint={setDestiny}
                        endpointType={destinyType}
                        switchEndpointType={() => { setDestinyType(getEndpointType(destinyType)) }}
                    />
                    <TimePicker time={destinyTime} returnTime={saveTime} pickerLabel={formattedDestinyTime} />
                </Section>
                <Section title={"Dias da semana"}>
                    <WeekDaySelector
                        weekDays={weekDays}
                        returnWeekDays={setWeekDays}
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
                <CustomButton
                    containerStyle={{ marginBottom: 10 }}
                    label="Cadastrar"
                    onClickHandler={registerRoute}
                    alignment="end"
                />
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