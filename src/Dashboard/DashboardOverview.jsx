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
            {/* <MySideNav /> */}
            <div className='dashboard'>
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}

export default DashboardOverview; 