export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const logIn = (token) => {
    return {
        type: LOG_IN,
        token: token
    }
};

export const logOut = () => {
    return {
        type: LOG_OUT
    }
};
