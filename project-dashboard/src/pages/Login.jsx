import { useStateContext } from "../contexts/ContextProvider"

const Login = () =>{
    const {activeMenu, setActiveMenu} = useStateContext();

    setActiveMenu(false);

    return (
        <div>HII</div>
    )
}

export default Login