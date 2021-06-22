import { useDispatch } from "react-redux";
import { updateToken } from "../actions/token";
import { NavLink } from "react-router-dom";

import { DEFAULT_TOKEN } from "../constants/DefaultToken";
import Layout from "./Layout";

import "./css/CloseSession.css";

const CloseSession = () => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(updateToken(DEFAULT_TOKEN));
  };

  return (
    <Layout>
      <nav className="secondary">
        <NavLink onClick={close} to="/">
          Confirmar cerrar sesión
        </NavLink>
      </nav>
    </Layout>
  );
};

export default CloseSession;
