import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { setPersistentData, logout } from "./store/actions/authActions";
import Routes from "./routes";
import { AUTH_LOCAL_STORAGE } from "./utilities/constants";
import TopMenu from "./components/uis/TopMenu/index.js";
import {
  showTopMenuForRoute,
  showSideMenuForRoute
} from "./services/routeService";
import SideMenuRoutes from "./routes/SideMenuRoutes";
import { getUserList } from "./http/usersApi";

function App(props) {
  const { pathname } = useLocation();
  const loadPersistentAuthData = () => {
    getUserList()
      .then(res => console.log("res", res))
      .catch(err => console.log("err", err));
    const persistedAuthData = localStorage.getItem(AUTH_LOCAL_STORAGE);
    props.loadAuthData(JSON.parse(persistedAuthData));
  };
  useEffect(loadPersistentAuthData, []);
  return (
    <div className='App'>
      {showTopMenuForRoute(pathname) && (
        <TopMenu selectedKey={pathname} onLogoutPress={props.onLogoutPress} />
      )}
      <div className='body-container'>
        {showSideMenuForRoute(pathname) && (
          <div className='side-menu-route'>
            <SideMenuRoutes />
          </div>
        )}
        <div className='main-route'>
          <Routes {...props} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  loadAuthData: setPersistentData,
  onLogoutPress: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
