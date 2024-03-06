import login from "../microsoft login/msal";
import Header from "./Header";
import { Link, Outlet } from "react-router-dom";

const Home = ({ data }) => {
    
    return (
        !(data) ? 
        <button onClick={login}>Login with Microsoft</button> : 
        (
            <div>
                <Header/>
                <Outlet/>
                <Link to="/create-team">create team</Link>
            </div>
        )
    );
}


export default Home;