//https://www.youtube.com/watch?v=oUZjO00NkhY&ab_channel=DaveGray
//https://www.youtube.com/watch?v=lhMKvyLRWo0&ab_channel=BenAwad
//https://www.youtube.com/watch?v=UjHT_NKR_gU&ab_channel=PedroTech

import { Navigate, useLocation } from "react-router-dom"
import {useAuth} from "./auth"

export const RequireAuth = ({ children }) =>{
    const auth = useAuth();
    const location = useLocation();

    if(!auth.user){
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children
}