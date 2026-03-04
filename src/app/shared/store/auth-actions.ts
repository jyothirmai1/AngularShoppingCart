import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginRequest, RegisterRequest } from "../services/auth-api";


export const authActions = createActionGroup({
    source:'Auth',
    events:{
        login:props<LoginRequest>(),
        loginSuccess:props<{token:string,userId:number|null}>(),
        loginFailure:props<{error:string|null}>(),
        register:props<RegisterRequest>(),
        registerSuccess:emptyProps(),
        registerFailure:props<{error:string|null}>(),
        logout:emptyProps(),
        logoutSuccess:emptyProps()

    }
})