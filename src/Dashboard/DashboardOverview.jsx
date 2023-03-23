import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import MySideNav from "../MySideNav";


function DashboardOverview() {
    const navigate = useNavigate()

    function logout() {
        navigate('/')
        auth.signOut()
    }

    function HouseCard(props){
        return(
            <div className="dash--card">
                <img className="dash--card-image" src={props.img} />
                <div className="dash--card-info">
                    <h4 className={props.rating ? "card--rated": "card--created"}
                    >
                        {props.name}
                    </h4>
                    {props.rating && <h4>{props.rating + "⭐"}</h4>}
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* <MySideNav /> */}
            <div className='dashboard'>
                <h1 className="admin--header">Dashboard</h1>
                <div className="dash--content">
                    <h3 className="dash--header">Highest Rated</h3>
                    <div className="dash--cards">
                        <HouseCard
                            img="./icons/house.png"
                            name="Guest house Name here"
                            rating={5}
                        />

                        <HouseCard
                            img="./icons/house.png"
                            name="Guest house Name here"
                            rating={5}
                        />

                        <HouseCard
                            img="./icons/house.png"
                            name="Guest house Name here"
                            rating={5}
                        />

                    </div>

                    <h3 className="dash--header">Recently Created</h3>
                    <div className="dash--cards">
                        <HouseCard
                            img="./icons/house.png"
                            name="Guest house Name here"
                        />

                        <HouseCard
                            img="./icons/house.png"
                            name="Guest house Name here"
                        />

                        <HouseCard
                            img="./icons/house.png"
                            name="Guest house Name here"
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardOverview; 