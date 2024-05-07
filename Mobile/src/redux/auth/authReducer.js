const { LOGIN, AUTHENTICATED, NOT_AUTHENTICATED } = require("./authTypes")

const initialInfoState = {
    authChecked: false,
    loggedIn: false,
    token: null,
    currentUser: {}
}

const authReducer = (state = initialInfoState, action) => {
    const payload = action.payload;

    switch(action.type){
        case AUTHENTICATED: return{
            authChecked: true,
            loggedIn: true,
            token: payload.token,
            currentUser: payload.currentUser
        }
        case NOT_AUTHENTICATED: return{
            authChecked: false,
            loggedIn: false,
            token: null,
            currentUser: {}
        }
        default: 
            return state;
    }
}

export default authReducer;