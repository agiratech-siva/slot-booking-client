import { Link } from "react-router-dom";

const Teamuser = ({data}) => {

        return (
            <div className="teamuser">
                <h1>{data.fullname}</h1>
                <button><Link to="">give request to be a part of team member</Link></button>
                <h2>{data.mail}</h2>
            </div>
        )
        
    
}

export default Teamuser;