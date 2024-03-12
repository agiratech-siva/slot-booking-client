import login from "../microsoft login/msal";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Home = ({ data }) => {
    
    return (
        !(data) ? 
        <button onClick={login}>Login with Microsoft</button> : 
        (
            <div>
                <Header/>
                <Outlet/>
            </div>
        )
    );
}


export default Home;