import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getToken } from "../selectors/token";
import Modal from "./Modal";

import Layout from "./Layout";
import "./css/ListNotes.css";

const ListNotes = () => {
  const [notes, setNotes] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [error, setError] = useState("");

  const token = useSelector((state) => getToken(state));

  const history = useHistory();

  const closeConfirmDelete = () => setShowConfirmDelete(false);

  const getNotes = () => {
    fetch(BASIC_URL_API.concat("api/notes"), {
      method: "GET",
      headers: {
        "api-token": token.token.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error == null) {
          setError("");
          setNotes(json);
        } else {
          setError(json.error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (error != "") {
      throw Error("Error en acceso a la API de login/register");
    }
  }, [error]);

  const borrar = (i) => {
    setSelectedIndex(i);
    setShowConfirmDelete(true);
  };

  const borrarConfirmado = () => {
    setShowConfirmDelete(false);
    fetch(BASIC_URL_API.concat("api/notes/").concat(notes[selectedIndex].id), {
      method: "DELETE",
      headers: {
        "api-token": token.token.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error == null) {
          setError("");
          getNotes();
        } else {
          setError(json.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const editar = (i) => {
    history.push(
      "/editnote/"
        .concat(notes[i].id)
        .concat(",")
        .concat(notes[i].title)
        .concat(",")
        .concat(notes[i].content)
    );
  };

  const consultar = (i) => {
    history.push(
      "/viewnote/".concat(notes[i].title).concat(",").concat(notes[i].content)
    );
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Layout>
      <h6>Lista de notas</h6>
      <ul>
        {notes.map((note, i) => (
          <li key={i} className="listnotes">
            <button className="listnotesbutton" onClick={() => borrar(i)}>
              Borrar
            </button>{" "}
            <button className="listnotesbutton" onClick={() => editar(i)}>
              Editar
            </button>{" "}
            <button className="listnotesbutton" onClick={() => consultar(i)}>
              Consultar
            </button>{" "}
            {note.title}
          </li>
        ))}
      </ul>
      <Modal show={showConfirmDelete} onClose={closeConfirmDelete}>
        <h6>Atención</h6>
        <p>¿Confirma que desea eliminar la nota?</p>
        <button onClick={borrarConfirmado}>Aceptar</button>{" "}
        <button onClick={closeConfirmDelete}>Cancelar</button>
      </Modal>
    </Layout>
  );
};

export default ListNotes;
