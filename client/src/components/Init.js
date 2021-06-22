import NewNoteForm from "./NewNoteForm";
import ListNotes from "./ListNotes";
import CloseSession from "./CloseSession";
import AccessForm from "./AccessForm";
import ViewNote from "./ViewNote";
import EditNoteForm from "./EditNoteForm";
import { useSelector } from "react-redux";
import { getToken } from "../selectors/token";

import "./css/Init.css";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const Init = () => {
  const token = useSelector((state) => getToken(state));

  const onReset = () => {};

  if (token.token != null && token.token.token !== "") {
    return (
      <Router>
        <ErrorBoundary message="Error al acceder a la API." onReset={onReset}>
          <h6>Puede realizar las siguientes acciones</h6>
          <nav className="secondary">
            <NavLink activeClassName="active" to="/newnote">
              Crear Nota
            </NavLink>
            <NavLink activeClassName="active" to="/listnotes">
              Consultar Notas
            </NavLink>
            <NavLink activeClassName="active" to="/close">
              Cerrar Sesión
            </NavLink>
          </nav>
          <Route path="/newnote">
            <NewNoteForm />
          </Route>
          <Route path="/listnotes">
            <ListNotes />
          </Route>
          <Route path="/viewnote/:title,:content">
            <ViewNote />
          </Route>
          <Route path="/editnote/:id,:title,:content">
            <EditNoteForm />
          </Route>
          <Route path="/close">
            <CloseSession />
          </Route>
        </ErrorBoundary>
      </Router>
    );
  } else {
    return (
      <Router>
        <ErrorBoundary message="Error al acceder a la API." onReset={onReset}>
          <h6>Página de inicio</h6>
          <p>Para poder continuar debe acceder al servicio.</p>
          <nav className="secondary">
            <NavLink activeClassName="active" to="/login">
              Acceder
            </NavLink>
          </nav>
          <Route path="/login">
            <AccessForm />
          </Route>
        </ErrorBoundary>
      </Router>
    );
  }
};

export default Init;
