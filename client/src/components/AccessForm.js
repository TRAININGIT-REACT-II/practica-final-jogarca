import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateToken } from "../actions/token";
import { useHistory } from "react-router";
import Layout from "./Layout";
import Modal from "./Modal";

import "./css/AccessForm.css";

const AccessForm = () => {
  const [showExistAccount, setShowExistAccount] = useState(false);
  const [error, setError] = useState("");

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const closeExistAccount = () => setShowExistAccount(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const url = BASIC_URL_API.concat(
      e.nativeEvent.submitter.id === "acceder_cuenta"
        ? "api/login"
        : "api/register"
    );

    fetch(url, {
      method: "POST",
      body: JSON.stringify(formState),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          if (json.error === "El nombre de usuario ya existe") {
            setShowExistAccount(true);
          } else {
            setError(json.error);
          }
        } else {
          setError("");
          dispatch(updateToken(json));
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (error != "") {
      throw Error("Error en acceso a la API de login/register");
    }
  }, [error]);

  const onChange = (key) => {
    return (e) =>
      setFormState({
        ...formState,
        [key]: e.target.value,
      });
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-6">
          <form onSubmit={onSubmit}>
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              id="username"
              type="text"
              value={formState.title}
              onChange={onChange("username")}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              value={formState.title}
              onChange={onChange("password")}
            />
            <button id="crear_cuenta">Crear Cuenta</button>{" "}
            <button id="acceder_cuenta">Acceder</button>
          </form>
        </div>
        <Modal show={showExistAccount} onClose={closeExistAccount}>
          <h3>Usuario ya existe</h3>
          <p>Ya existe un usuario con este nombre. Inténtelo con otro.</p>
        </Modal>
      </div>
    </Layout>
  );
};

export default AccessForm;
