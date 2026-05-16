// function AuthContext() {
// return ( <div>AuthContext</div>
// );
// }

// export default AuthContext;

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// function AuthProvider({ children }) {

//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const access_token = localStorage.getItem("access_token");

//         if (access_token) {
//             setIsAuthenticated(true);
//         }
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{
//                 isAuthenticated,
//                 setIsAuthenticated,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    // LOAD USER ON REFRESH

    // useEffect(() => {

    //     const storedUser =
    //         localStorage.getItem("user");

    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }

    // }, []);

    useEffect(() => {

        try {

            const storedUser =
                localStorage.getItem("user");

            if (
                storedUser &&
                storedUser !== "undefined"
            ) {

                setUser(JSON.parse(storedUser));
            }

        } catch (error) {

            console.log(
                "Invalid user data in localStorage"
            );

            localStorage.removeItem("user");
        }

    }, []);

    // LOGIN

    const login = (userData) => {

        setUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );
    };

    // LOGOUT

    const logout = () => {

        setUser(null);

        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;