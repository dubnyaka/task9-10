const initialState = {
    isLoading: false,
    list: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_MATH_EXAMPLES': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'RECEIVE_MATH_EXAMPLES': {
            const {
                mathExamples,
            } = action;
            return {
                ...state,
                isLoading: false,
                list: mathExamples,
            };
        }
        default: return state;
    }
};
