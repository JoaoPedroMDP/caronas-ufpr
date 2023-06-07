import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import PageTitle from '../components/textual/PageTitle';
import Section from '../components/layout/Section';
import ListPicker from '../components/inputs/ListPicker';
import Screen from '../components/layout/Screen';
import { pickablelize } from '../contrib';
import CustomSwitch from '../components/inputs/CustomSwitch';
import TimePicker from '../components/inputs/TimePicker';

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

    function getEndpointType(currentType) {
        return currentType === "campus" ? "neighborhood" : "campus";
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
                <Text>{origin.label}</Text>
                <TimePicker time={destinyTime} returnTime={setDestinyTime} />
            </Section>
            <Section title="Chegada">
                <EndpointLayout
                    endpointOptions={teste}
                    setEndpoint={setDestiny}
                    endpointType={destinyType}
                    switchEndpointType={() => { setDestinyType(getEndpointType(destinyType)) }}
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