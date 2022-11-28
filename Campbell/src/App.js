import './App.css';
import {HashRouter as Router,Route} from 'react-router-dom';
import Sidebar from './login/sidebar';
import Header from './login/header';
import Order from './function/order';
import Users from './login/users';
import Dashboard from './login/dashboard';
import React, {useEffect} from 'react';
import Customer from "./login/customer";
import Material from "./login/material";
import DeliveryRoute from "./login/route";
import UserLogin from "./login/userlogin";
import MyForm from "./function/stepform";
import axios from "axios";
import Invoice from "./login/invoice";
import MyResult from "./login/result";
import AddNewOrderLine from "./login/addneworderline";
import Orderroute from "./login/orderroute";
import server from "./constName/url";

function App(props) {


    // const [user,setUser] = useState({});
    useEffect(()=>{
        document.title = "Campbell";
        async function fetchData(){
            await axios.get(server+'/campbell/user',{withCredentials: true})
                .then(function (response) {
                    // console.log(response.data.data.name);
                    if(response.data.error!==null) props.history.push("/");
                    // setUser(response.data.data.name);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    },[]);

  return (
      <Router>
          <div className='container-header' style={{width: '100%'}}>
              <Header></Header>
          </div>

          <div className='container-sidebar'>
              <Sidebar/>
          </div>
          <div className='container-content'>
              <Route exact path="/" component={Order} />
              {/*<Route path="/home" component={Dashboard} />*/}
              <Route path="/login" component={UserLogin} />
              <Route path="/orders" component={Order} />
              <Route path="/users" component={Users} />
              <Route path="/result" component={MyResult}/>
              <Route path="/invoice" component={Invoice} />
              <Route path="/enter" component={MyForm} />
              <Route path="/routemanagement" component={Orderroute}/>
              <Route path="/neworderline" component={AddNewOrderLine} />
              <Route path="/import/material" component={Material}/>
              <Route path="/import/customer" component={Customer}/>
              <Route path="/import/route" component={DeliveryRoute}/>
          </div>
      </Router>
  );
}

export default App;
