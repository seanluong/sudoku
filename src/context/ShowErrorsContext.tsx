import { createContext, PropsWithChildren, useContext, useState } from 'react';

const ShowErrorsContext = createContext<ShowErrorsContextType>({
    showErrors: true,
    toggleShowErrors: () => {}
});

interface ShowErrorsContextType {
    showErrors: boolean;
    toggleShowErrors: () => void;
};

export const ShowErrorsProvider = ({ children }: PropsWithChildren) => {
    const [showErrors, setShowErrors] = useState<boolean>(false);

    const toggleShowErrors = () => setShowErrors((currentValue: boolean) => !currentValue);

    return (
        <ShowErrorsContext.Provider value={{
            showErrors,
            toggleShowErrors,
        }} >
            {children}
        </ShowErrorsContext.Provider>
    );
};

export const useShowErrorsContext = () => useContext(ShowErrorsContext);