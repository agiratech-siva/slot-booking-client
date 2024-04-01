
import styles from "./Slotarea.module.css"
import { useNavigate } from "react-router-dom";

const Slotarea = ({data}) => {
    data.hour = data.hour % 12 == 0 ? 12 : data.hour % 12;
    let navigate = useNavigate();

    const routeChange = (hour, minutes) =>{ 
        const date = {
            hour: hour,
            minutes: minutes
        }
        navigate('/teamselection', {state: date});
    }

    return (
        <div className={styles.timeslot}>
            {
                data.timing.map((time) => {
                    return (
                        <div className={styles[time.status]} key={data.hour + time.time} onClick={() => {
                            routeChange(data.hour, time.time);
                        }}>
                            <p>{data.hour}:{time.time}</p>
                            <p>{time.status}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Slotarea;