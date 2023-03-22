import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import MySideNav from "../MySideNav";

function DashboardOverview() {
    const navigate = useNavigate()

    function logout() {
        navigate('/')
        auth.signOut()
    }

    return (
        <div>
            <MySideNav />
            <button onClick={logout}>Log the fuck out!</button>
            <div className='dashboard'>Dashboard Overview</div>
        </div>
    )
}

export default DashboardOverview; 