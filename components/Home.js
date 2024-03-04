
import login from "../msal";
import Header from "./Header";
import Userinfo from "./Userinfo";

const Home = ({ data }) => {
    
    return (
        !(data) ? 
        <button onClick={login}>Login with Microsoft</button> : 
        (
            <div>
                <Header/>
                <Userinfo/>
            </div>
        )
    );
}


export default Home;