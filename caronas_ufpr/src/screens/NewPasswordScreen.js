import { View } from 'react-native';
import CustomTextInput from '../components/inputs/CustomTextInput';
import CustomButton from '../components/inputs/CustomButton';
import Screen from '../components/layout/Screen';
import Comment from '../components/textual/Comment';
import { useState } from 'react';

const NewPasswordScreen = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [passConf, setPassConf] = useState('');
    const [warn, setWarn] = useState(null);

    function checkPass(text) {
        warn = null;
        if (text != password) {
            alert("As senhas não coincidem!");
            return;
        }
        setPassConf(text);
    }

    return (
        <Screen title="Nova senha" centralized>
            <Comment comment="Dessa vez anota num papelzinho, hem ;)" centralized />
            <CustomTextInput placeholder="Nova senha" secureTextEntry text={password} setText={setPassword} />
            <CustomTextInput placeholder="Confirme a nova senha" text={passConf} setText={checkPass} secureTextEntry />
            {warn != null ? <Comment comment={warn} /> : null}
            <View>
                <CustomButton label="Salvar" disabled={false} alignment="end" />
            </View>
        </Screen>
    );
};

export default NewPasswordScreen;