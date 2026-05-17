import { createContext, useEffect, useState } from "react";
import { logoutUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

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
                "Invalid user data in localStorage, clearing session..."
            );

            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setUser(null);
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

    // UPDATE USER
    const updateUser = (userData) => {
        if (!user) return;
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    // LOGOUT

    const logout = async () => {

        try {

            await logoutUser();

        } catch (error) {

            console.log(error);

        } finally {

            localStorage.removeItem("access_token");

            localStorage.removeItem("refresh_token");

            localStorage.removeItem("user");

            setUser(null);

            navigate("/");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                // setUser,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;