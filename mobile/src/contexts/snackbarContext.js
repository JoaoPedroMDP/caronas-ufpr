import { createContext } from 'react';
import { useState } from 'react';
import { Snackbar, Portal } from 'react-native-paper';


export const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [duration, setDuration] = useState(5000);

    function showSnackbar(message, duration = 3000){
        setSnackbarMessage(message);
        setDuration(duration);
        setVisible(true);
    }

    return (
        <SnackbarContext.Provider value={{ showSnackbar, snackbarMessage, setSnackbarMessage }}>
            {children}
            <Portal>
                <Snackbar
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    duration={duration}
                    action={{
                        label: "Fechar",
                    }}
                    >
                    {snackbarMessage}
                </Snackbar>
            </Portal>
        </SnackbarContext.Provider>
    );
}
