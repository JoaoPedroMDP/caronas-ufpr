import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Section from '../components/layout/Section';
import ListPicker from '../components/inputs/ListPicker';
import Screen from '../components/layout/Screen';
import CustomSwitch from '../components/inputs/CustomSwitch';
import { intentions } from '../consts';
import CustomCheckbox from '../components/inputs/CustomCheckbox';
import CustomButton from '../components/inputs/CustomButton';
import { saveRoute } from '../cruds/route';
import { getPlaces } from '../cruds/place';
import CustomTextInput from '../components/inputs/CustomTextInput';
import WeekDaySelector from '../components/inputs/WeekDaySelector';
import { SnackbarContext } from '../contexts/snackbarContext';
import gs from '../globalStyles';

const EndpointLayout = ({ placesOptions, setPlace, placeIsCampus, switchPlaceType }) => {
    const [listPickerValue, setListPickerValue] = useState(null);
    const placeIsCampusLabel = placeIsCampus ? "campus" : "bairro";

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
                placeholder={"Selecione um " + placeIsCampusLabel}
                list={placesOptions[placeIsCampus]}
                returnValue={returnPlace}
            />
            <View style={styles.endpointType}>
                <CustomSwitch
                    activeText={"C"}
                    inactiveText={"B"}
                    switchValue={placeIsCampus}
                    onSwitchHandler={changePlaceType}
                />
            </View>
        </View>
    );
}

const RegisterRouteScreen = ({ navigation }) => {
    const [places, setPlaces] = useState({});
    const [origin, setOrigin] = useState("");
    const [originIsCampus, setOriginIsCampus] = useState(true);
    const [destiny, setDestiny] = useState("");
    const [destinyIsCampus, setDestinyIsCampus] = useState(false);

    const [arriveHour, setArriveHour] = useState("");
    const [arriveMinute, setArriveMinute] = useState("");

    const [weekDays, setWeekDays] = useState([]);
    const [userIntentions, setUserIntentions] = useState([]);
    const {showSnackbar, setSnackbarMessage} = useContext(SnackbarContext);

    useFocusEffect(
        useCallback(() => {
            async function fetchData (){
                let allEndpoints = [];
                try{
                    allEndpoints = await getPlaces();
                }catch(error){
                    showSnackbar("Não foi possível carregar os lugares", 5000);
                }
                let classified = {}
                allEndpoints.forEach((endpoint) => {
                    if(!classified[endpoint.type == "campus"]) {
                        classified[endpoint.type == "campus"] = [];
                    }

                    // Preciso adicionar o label e o key para o ListPicker
                    classified[endpoint.type == "campus"].push({
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

    function validateData(origin, destiny, arriveHour, arriveMinute, weekDays, userIntentions){
        if(origin === null || origin == ""){
            throw new Error("Origem não pode ser nula");
        }
    
        if(destiny === null || destiny == ""){
            throw new Error("Destino não pode ser nulo");
        }
    
        if(arriveHour === null || arriveHour == "" || Number(arriveHour) < 0 || Number(arriveHour) > 23){
            throw new Error("Verifique o horário de chegada");
        }
    
        if(arriveMinute === null || arriveMinute == "" || Number(arriveMinute) < 0 || Number(arriveMinute) > 59){
            throw new Error("Verifique o minuto de chegada");
        }
    
        if(userIntentions == []){
            throw new Error("Intenções não podem ser nulas");
        }
    }

    async function registerRoute() {
        let arriveTime = arriveHour + ":" + arriveMinute;
        try{
            validateData(origin, destiny, arriveHour, arriveMinute, weekDays, userIntentions);
            await saveRoute(origin, destiny, arriveTime, weekDays, userIntentions);
            showSnackbar("Rota salva!!");
            navigation.navigate("Início");
        }catch(error){
            showSnackbar(error.message);
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
                        placeIsCampus={originIsCampus}
                        switchPlaceType={() => { setOriginIsCampus(!originIsCampus) }}
                    />
                </Section>
                <Section title="Chegada">
                    <EndpointLayout
                        placesOptions={places}
                        setPlace={setDestiny}
                        placeIsCampus={destinyIsCampus}
                        switchPlaceType={() => { setDestinyIsCampus(!destinyIsCampus) }}
                    />
                </Section>
                <Section title="Horário de chegada">
                    <View style={{ flexDirection: "row", justifyContent: "start" }}>
                        <View style={gs.flexRow}>
                            <CustomTextInput placeholder={"hh"} text={arriveHour} setText={setArriveHourNumber} />
                            <Text style={gs.regularText}> : </Text>
                            <CustomTextInput placeholder={"mm"} text={arriveMinute} setText={setArriveMinuteNumber} />
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
                <View style={styles.registerButton}>
                    <CustomButton
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
        ...gs.flexRow,
        ...gs.alignCenter,
        ...gs.justifyBetween
    },
    endpointTypeSwitch: {
        marginLeft: 10
    },
    endpointDropdown: {
        width: "60%"
    },
    endpointType: {
        ...gs.flexRow,
        ...gs.alignCenter,
        alignSelf: "center"
    },
    endpointTypeText: {
        fontFamily: "InterRegular",
        marginRight: 5
    },
    registerButton: {
        ...gs.flexRow,
        flexGrow: 1,
        justifyContent: "flex-end",
        marginVertical: 25
    }
})

export default RegisterRouteScreen;