const globalState = {
    profile: {
        email: "",
        uid: "",
    },
    notes: null,
};

const reducer = (state = globalState, action) => {
    switch (action.type) {
        case "SET_PROFILE":
            return {
                ...state,
                profile: action.data
            }
        case "SET_NOTES":
            return {
                ...state,
                notes: action.data
            }
    
        default:
            break;
    }
    return state;
}

export default reducer;
