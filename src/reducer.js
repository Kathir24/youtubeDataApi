const initialState = {
    fetching:false,
    details:{},
    error:null
}
export function reducer(state=initialState,action){
    console.log(action);
    switch (action.type){
        case 'fetching':
            return {
                ...state,
                fetching:true,
                details:{},
                error:null,
            }
        case 'success':
            return{
                ...state,
                fetching:false,
                details:action.response,
                error:null,
            }
    }
}