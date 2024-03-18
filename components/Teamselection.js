import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

let member1,member2;

const Teamselection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const id = localStorage.getItem("employee-id");

    const checkforslotandsendrequest = (initiator, otherteammember, opponent1, opponent2) => {
        const details = {
            initiator,
            otherteammember,
            opponent1,
            opponent2,
            data
        }

        navigate('/bookingpage', {state: details});
    }


    const [teams,setTeams] = useState([]);
    const [opponentTeams, setOpponentTeams] = useState([]);
    const [opponentTeamspage, setOpponentTeamspage] = useState(false);

    useEffect(() => {

       if(opponentTeamspage == false){
            const myteams = async() => {
                const response = await fetch(`${process.env.ENV_URL}/teams/getMyTeams/${id}`)
                const result = await response.json();
                setTeams(result?.teams);
            }
            
            myteams();
       }
        
        else{

            const opponentTeamSelection = async () => {
                const response = await fetch(`${process.env.ENV_URL}/teams/getOpponentTeams/${member1}/${member2}`);
                const result = await response.json();
                console.log("opponent team",result, result?.teams, typeof result?.teams);
                setOpponentTeams(result?.teams);
                
            }

            opponentTeamSelection()
            
        }

    },[opponentTeamspage]);

   

    if(teams.length == 0){
        return (
            <>
                <p>no teams found create a team</p>
                <Link to="/create-team">create team</Link>
            </>
        )
    }

    if(opponentTeams.length == 0 && opponentTeamspage == true){
        return (
            <>
                <p>no opponent teams are available to play</p>
                <Link to="/">Home</Link>
            </>
        )
    }

    if(opponentTeamspage == true){
        return (
            
            <div className="opponent-team-container">
                <h1>{data.hour}: {data.minutes}</h1>
                <h1>select your opponent team</h1>
                
                {opponentTeams.map((team) => (
                    <div className="opponent-team" key={team._id}>
                        <div> team name: {team.name}</div>
                        <div> team member1: {team.members[0].ObjectId.fullname}</div>
                        <div> team member2: {team.members[1].ObjectId.fullname}</div>
                        <button onClick={() => {
                            const initiator = member1.employeeId == id ? member1 : member2;
                            const otherteammember = initiator.employeeId == member1.employeeId ? member2 : member1;
                            checkforslotandsendrequest(initiator,otherteammember, {employeeId: team.members[0].employeeId, name: team.members[0].ObjectId.fullname }, {employeeId: team.members[1].employeeId, name: team.members[1].ObjectId.fullname });
                        }}>select</button>
                    </div>
                ))}
            </div>
        )
    }
    else{
        return (

            <div className="team-container">
                <h1>{data.hour}: {data.minutes}</h1>
                <h1>select your team</h1>
                {teams.map((team) => (
                    <div className="team" key={team._id}>
                        <div>team name: {team.name}</div>
                        <div> team member1: {team.members[0].ObjectId.fullname}</div>
                        <div> team member2: {team.members[1].ObjectId.fullname}</div>
                        <button onClick={() => {
                            member1 = {employeeId: team.members[0].employeeId, name: team.members[0].ObjectId.fullname };
                            member2 = {employeeId: team.members[1].employeeId, name: team.members[1].ObjectId.fullname };
                            setOpponentTeamspage(true);
                        }}>Select</button>
                    </div>
                    
                ))}
                
            </div>
        )
    }
    
}

export default Teamselection;