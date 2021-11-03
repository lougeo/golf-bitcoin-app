

export const ACTIONS = {
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};
export const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
}
    
function authSwitch(prevState, action) {
    switch (action.type) {
        case ACTIONS.RESTORE_TOKEN:
            return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            };
        case ACTIONS.SIGN_IN:
            return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            };
        case ACTIONS.SIGN_OUT:
            return {
            ...prevState,
            isSignout: true,
            userToken: null,
            };
        default:
            return {
                isLoading: true,
                isSignout: false,
                userToken: null,
            };
    }
}

export default authSwitch;