import { useEffect } from "react";
import { Snackbar, Portal } from "react-native-paper";
import { useState } from 'react';

const CustomSnackbar = ({ externalOpen, message, timeout }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(externalOpen);
        if(externalOpen){
            activateSnackbar();
        }

    }, [externalOpen]);

    function activateSnackbar(){
        console.log("Chamou activateSnackbar com a mensagem: " + message + " e tempo: " + timeout??toString());
        setOpen(true);
        console.log("Já deveria ter aparecido");
        setTimeout(() => {
            console.log("Removendo snackbar");
            setOpen(false);
        }, timeout ?? 3000);
    }

    return(
        <Portal>
            <Snackbar
                visible={open}
                onDismiss={() => setOpen(false)}
                action={{label: 'Fechar'}}
            >
                {message}
            </Snackbar>
        </Portal>
    );
};
export default CustomSnackbar;