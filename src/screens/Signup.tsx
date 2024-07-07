import React, { useContext, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Snackbar from "react-native-snackbar";
import Icon from "react-native-vector-icons/FontAwesome";

import { AuthUserContext } from "@/src/navigation/AuthUserProvider";
import { ThemeContext } from "@/src/navigation/ThemeProvider";
import { SCREENS } from "@/src/utils/constants";
import { signupUser } from "@/src/utils/helper";
import { NavigationType, ThemeColorPaletteType } from "@/src/utils/types";

export default function SignupScreen({ navigation }: { navigation: NavigationType }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(AuthUserContext)
    const { theme } = useContext(ThemeContext)

    const styles = useStyles(theme)

    const handleSignup = async () => {
        setLoading(true);
        const response = await signupUser(email, password);
        if (response) {
            setUser(response)
            Snackbar.show({ text: 'Signed up successfully!' })
        }
        setLoading(false);
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.scrollViewWrapper}>
                <ScrollView style={styles.avoidView}>
                    <Text style={styles.loginHeader}>Sign Up</Text>
                    <Text style={styles.labelText}>E-mail</Text>
                    <TextInput
                        textContentType="emailAddress"
                        style={{
                            color: theme?.chipColor,
                            borderBottomColor: theme?.chipColor,
                            borderBottomWidth: 1,
                            paddingTop: 5,
                            paddingBottom: 5,
                            marginBottom: 30,
                        }}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <Text style={styles.labelText}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={{
                            color: theme?.chipColor,
                            borderBottomColor: theme?.chipColor,
                            borderBottomWidth: 1,
                            paddingTop: 5,
                            paddingBottom: 5,
                            marginBottom: 30,
                        }}
                        onChangeText={(password) => setPassword(password)}
                    />
                    <Text
                        style={styles.navigateText}
                        onPress={() => navigation.navigate(SCREENS.LOGIN)}
                    >
                        Already have an account? Login
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-around",
                            padding: 10,
                            marginTop: 20,
                        }}
                    >
                        <ActivityIndicator
                            size="large"
                            color={theme?.chipColor}
                            animating={loading}
                        />
                    </View>
                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <TouchableHighlight
                        style={[{ opacity: 0.6 }, styles.button]}
                        onPress={handleSignup}
                    >
                        <Icon
                            name="angle-right"
                            color={theme?.colorAccentPrimary}
                            size={32}
                            style={styles.icon}
                        />
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}

const useStyles = (theme: ThemeColorPaletteType | null) => {
    return StyleSheet.create({
        wrapper: {
            display: "flex",
            flex: 1,
            backgroundColor: theme?.colorAccentPrimary,
        },
        scrollViewWrapper: {
            marginTop: 70,
            flex: 1,
        },
        avoidView: {
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 20,
            flex: 1,
        },
        loginHeader: {
            fontSize: 28,
            color: theme?.chipColor,
            fontWeight: "300",
            marginBottom: 40,
        },
        labelText: {
            fontWeight: "700",
            marginBottom: 10,
            fontSize: 14,
            color: theme?.chipColor,
        },
        buttonWrapper: {
            alignItems: "flex-end",
            right: 20,
            bottom: 20,
            paddingTop: 0,
        },
        button: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            width: 60,
            height: 60,
            backgroundColor: theme?.chipColor,
        },
        icon: {
            marginRight: -2,
            marginTop: -2,
        },
        navigateText: {
            color: theme?.chipColor,
            fontSize: 15,
            textAlign: "center",
        },
    });
};
