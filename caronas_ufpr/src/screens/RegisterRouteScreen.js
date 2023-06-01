import { Text } from 'react-native';
import { useState } from 'react';
import PageTitle from '../components/textual/PageTitle';
import Section from '../components/layout/Section';
import Dropdown from '../components/inputs/Dropdown';
import Screen from '../components/layout/Screen';
import {dropdownize} from '../contrib';

const RegisterRouteScreen = ({navigation}) => {
    const teste = ["Opção 1", "Opção 2", "Opção 3", "Opção 4"];
    const [opcao, setOpcao] = useState("");

    return(
        <Screen>
            <PageTitle title={"Cadastrar Rota"}/>
            <Section title="Saída">
                <Dropdown items={dropdownize(teste)} returnValue={setOpcao}/>
            </Section>
        </Screen>
    );
}

export default RegisterRouteScreen;