import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getToken } from "../selectors/token";

import Layout from "./Layout";

const EditNoteForm = () => {
  const token = useSelector((state) => getToken(state));
  const history = useHistory();
  const params = useParams();

  const [formState, setFormState] = useState({
    title: params.title,
    content: params.content,
  });

  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(BASIC_URL_API.concat("api/notes/").concat(params.id), {
      method: "PUT",
      body: JSON.stringify(formState),
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
            <label htmlFor="noteTitle">Título</label>
            <input
              id="noteTitle"
              type="text"
              value={formState.title}
              onChange={onChange("title")}
            />
            <label htmlFor="noteContent">Contenido</label>
            <input
              id="noteContent"
              type="text"
              value={formState.content}
              onChange={onChange("content")}
            />
            <button>Actualizar</button>{" "}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditNoteForm;
