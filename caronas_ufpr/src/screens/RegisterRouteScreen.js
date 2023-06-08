import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import PageTitle from '../components/textual/PageTitle';
import Section from '../components/layout/Section';
import ListPicker from '../components/inputs/ListPicker';
import Screen from '../components/layout/Screen';
import { pickablelize, toCheckboxGroupFormat } from '../contrib';
import CustomSwitch from '../components/inputs/CustomSwitch';
import TimePicker from '../components/inputs/TimePicker';
import WeekDaySelector from '../components/inputs/WeekDaySelector';
import { uniqueIntentions, intentions } from '../consts';
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Black, White } from '../../assets/colors';
import CustomCheckbox from '../components/inputs/CustomCheckbox';

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
    const [uniqueIntention, setUniqueIntention] = useState("");
    const [otherIntentions, setOtherIntentions] = useState([]);

    function getEndpointType(currentType) {
        return currentType === "campus" ? "neighborhood" : "campus";
    }

    function getTimeString(date) {
        return date.getHours().toString() + ":" + date.getMinutes().toString();
    }

    function saveWeekDays(days) {
        setWeekDays(days);
        console.log(weekDays);
    }

    function saveTime(date) {
        setDestinyTime(date.getTime());
        setFormattedDestinyTime(getTimeString(date));
    }

    function saveIntentions(intention) {
        console.log(intention);
    }

    return (
        <Screen>
            <PageTitle title={"Cadastrar Rota"} />
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
                <BouncyCheckboxGroup
                    data={toCheckboxGroupFormat(uniqueIntentions)}
                    onChange={(selectedItem) => {
                        console.log("SelectedItem: ", JSON.stringify(selectedItem));
                    }}
                />
                <FlatList
                    data={intentions}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    renderItem={({ item }) => {
                        return (
                            <CustomCheckbox
                                label={item.label}
                                onPress={() => saveIntentions(item)}

                            />
                            // <BouncyCheckbox
                            //     size={25}
                            //     bouncinessIn={0}
                            //     bouncinessOut={0}
                            //     fillColor={Black}
                            //     unfillColor={White}
                            //     text={item.label}
                            //     innerIconStyle={{ borderWidth: 2 }}
                            //     textStyle={{ fontFamily: "InterMedium", color: Black }}
                            //     onPress={(item) => saveIntentions(item)}
                            // />
                        );
                    }}
                />
            </Section>
        </Screen>
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
    }
})

export default RegisterRouteScreen;