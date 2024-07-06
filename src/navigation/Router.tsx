import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import Snackbar from "react-native-snackbar";

import Spinner from "@/src/components/Spinner";
import AppStack from "@/src/navigation/AppStack";
import AuthStack from "@/src/navigation/AuthStack";
import { AuthUserContext } from "@/src/navigation/AuthUserProvider";
import { getCurrentUser } from "@/src/utils/helper";

const Router = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { user, setUser } = useContext(AuthUserContext)

    useEffect(() => {
        const getInitialData = async () => {
            try {
                setIsLoading(true);
                const response = await getCurrentUser();
                setUser(response);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error(error);
                Snackbar.show({ text: 'Something went wrong!' });
            }
        }
        getInitialData();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <NavigationContainer independent>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Router;
