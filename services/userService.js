export const userService = {
    getUserName : () => {
        return localStorage.getItem("User") ;
    },
    getEmail : () => {
        return localStorage.getItem("Email") ;
    },
    getToken: () => {
        return localStorage.getItem("AuthToken");
    }
} 