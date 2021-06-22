import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getToken } from "../selectors/token";

import Layout from "./Layout";

const NewNoteForm = () => {
  const noteTitleRef = useRef(null);
  const noteContentRef = useRef(null);

  const token = useSelector((state) => getToken(state));
  const history = useHistory();

  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const param = {
      title: noteTitleRef.current.value,
      content: noteContentRef.current.value,
    };

    fetch(BASIC_URL_API.concat("api/notes"), {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-token": token.token.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error == null) {
          setError("");
          history.push("/listnotes");
        } else {
          setError(json.error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("Error en newnoteform: ", error);
    if (error != "") {
      throw Error("Error en acceso a la API de login/register");
    }
  }, [error]);

  return (
    <Layout>
      <div className="row">
        <div className="col-6">
          <form onSubmit={onSubmit}>
            <label htmlFor="noteTitle">Título</label>
            <input
              ref={noteTitleRef}
              id="noteTitle"
              type="text"
              defaultValue=""
            />
            <label htmlFor="noteContent">Contenido</label>
            <input
              ref={noteContentRef}
              id="noteContent"
              type="text"
              defaultValue=""
            />
            <button>Crear</button>{" "}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewNoteForm;
