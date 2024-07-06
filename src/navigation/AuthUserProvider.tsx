import React, { createContext, useState } from "react";

import { AuthUserContextType, UserType } from "@/src/utils/types";

export const AuthUserContext =
    createContext<AuthUserContextType>({ user: null, setUser: () => null });

export const AuthUserProvider = ({ children }: { children: React.ReactElement }) => {
    const [user, setUser] = useState<UserType | null>(null);

    return (
        <AuthUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthUserContext.Provider>
    );
};
