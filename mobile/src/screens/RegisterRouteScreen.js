import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Section from '../components/layout/Section';
import ListPicker from '../components/inputs/ListPicker';
import Screen from '../components/layout/Screen';
import CustomSwitch from '../components/inputs/CustomSwitch';
import { intentions } from '../consts';
import CustomCheckbox from '../components/inputs/CustomCheckbox';
import CustomButton from '../components/inputs/CustomButton';
import { validateData } from '../components/apis/caronasApi';
import { Snackbar, Portal } from 'react-native-paper';
import { saveRoute } from '../cruds/route';
import { getPlaces } from '../cruds/place';
import CustomTextInput from '../components/inputs/CustomTextInput';
import WeekDaySelector from '../components/inputs/WeekDaySelector';

const EndpointLayout = ({ placesOptions, setPlace, placeType, switchPlaceType }) => {
    const [listPickerValue, setListPickerValue] = useState(null);
    
    function returnPlace(endpoint) {
        setPlace(endpoint);
        setListPickerValue(endpoint.name);
    }

    function changePlaceType(){
        switchPlaceType();
        setListPickerValue(null);
    }

    return (
        <View style={styles.endpoint}>
            <ListPicker
                value={listPickerValue}
                placeholder={"Selecione um local"}
                list={placesOptions[placeType]}
                returnValue={returnPlace}
            />
            <View style={styles.endpointType}>
                <Text style={styles.endpointTypeText}>Bairro</Text>
                <CustomSwitch
                    customStyle={{marginHorizontal: 10}}
                    switchValue={placeType === "campus"}
                    onSwitchHandler={changePlaceType}
                />
                <Text style={styles.endpointTypeText}>Campus</Text>
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

    const [arriveHour, setArriveHour] = useState("");
    const [arriveMinute, setArriveMinute] = useState("");

    const [weekDays, setWeekDays] = useState([]);
    const [userIntentions, setUserIntentions] = useState([]);
    const [validationMessage, setValidationMessage] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);

    useFocusEffect(
        useCallback(() => {
            async function fetchData (){
                let allEndpoints = [];
                try{
                    allEndpoints = await getPlaces();
                }catch(error){
                    activateSnackbar("Não foi possível carregar os lugares", 5000);
                }
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
        }, [])
      );


    function activateSnackbar(message, time){
        console.log("Chamou activateSnackbar com a mensagem: " + message + " e tempo: " + time ?? toString());
        setValidationMessage(message);
        setShowSnackbar(true);
        console.log("Já deveria ter aparecido");
        setTimeout(() => {
            console.log("Removendo snackbar");
            setShowSnackbar(false);
            setValidationMessage(message);
        }, time ?? 3000);
    }

    function getEndpointType(currentType) {
        return currentType === "campus" ? "neighborhood" : "campus";
    }

    function filterNum(raw_time){
        return raw_time.replace(/[^0-9]/g, '')
    }

    function setArriveHourNumber(value) {
        let time = filterNum(value);
        setArriveHour(time.slice(-2));
    }

    function setArriveMinuteNumber(value) {
        let time = filterNum(value);
        setArriveMinute(time.slice(-2));
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
        let arriveTime = arriveHour + ":" + arriveMinute;
        try{
            validateData(origin, destiny, arriveHour, arriveMinute, weekDays, userIntentions);
            await saveRoute(origin, destiny, arriveTime, weekDays, userIntentions);
            activateSnackbar("Rota salva!!", 5000);
            navigation.navigate("Início");
        }catch(error){
            activateSnackbar(error.message);
            return;
        }
    }

    return (
        <ScrollView>
            <Screen title="Cadastrar Rota">
                <Section title="A ideia é simples: nos conte de onde sai, e pra onde vai :)" description="Ps: nos horários, dê preferência para múltiplos de meia hora. Ex: 18h30, 19h, 19h30, 20h. Vai ser mais fácil de achar alguém :D" />
                <Section title="Saída">
                    <EndpointLayout
                        placesOptions={places}
                        setPlace={setOrigin}
                        placeType={originType}
                        switchPlaceType={() => { setOriginType(getEndpointType(originType)) }}
                    />
                </Section>
                <Section title="Chegada">
                    <EndpointLayout
                        placesOptions={places}
                        setPlace={setDestiny}
                        placeType={destinyType}
                        switchPlaceType={() => { setDestinyType(getEndpointType(destinyType)) }}
                    />
                </Section>
                <Section title="Horário de chegada">
                    <View style={{ flexDirection: "row", justifyContent: "start" }}>
                        <View style={{ width: "50px" }}>
                            <CustomTextInput placeholder={"hora"} text={arriveHour} setText={setArriveHourNumber} />
                        </View>
                        <View style={{ width: "50px", marginLeft: "10px" }}>
                            <CustomTextInput placeholder={"min"} text={arriveMinute} setText={setArriveMinuteNumber} />
                        </View>
                    </View>
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
                <Portal>
                    <Snackbar
                        visible={showSnackbar}
                        onDismiss={() => setShowSnackbar(false)}
                        action={{
                            label: 'Fechar'
                        }}
                        >
                        {validationMessage}
                    </Snackbar>
                </Portal>
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