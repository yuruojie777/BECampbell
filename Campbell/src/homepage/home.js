import React from "react";
import '../css/home.css';
const Home = ()=>{
    return (
        <div className="homeContainer">
            <div className="homeLogo">
                <img src="logo.png"/>
            </div>
            <div className="homeWelcome">
                <div className="homeAvatar">
                    <img src="user.png"/>
                </div>
                <h1>Welcome</h1>
                <h1 className="username">Tom Russo</h1>
                <span>Sales</span>

                <button className="logoutbtn">Logout</button>
            </div>
            <div className="functionalities">
                <div className="functionality">Entering a sales order</div>
                <div className="functionality">Finding and Changing a Sales Order</div>
                <div className="functionality">Managing Sales Order Routes</div>
                <div className="functionality">Invoiceing Data</div>
                <div className="functionality">Loading master data</div>
                <div className="functionality">User Maintenance</div>
            </div>
        </div>
    )
}

export default Home;