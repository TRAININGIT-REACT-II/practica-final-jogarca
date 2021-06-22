import { useHistory, useParams } from "react-router-dom";

const ViewNote = () => {
  const history = useHistory();
  const params = useParams();

  const onClick = () => {
    history.goBack();
  };

  return (
    <div>
      <h3>NOTA COMPLETA</h3>
      <p>
        <h6>Título</h6>
        {params.title}
      </p>
      <p>
        <h6>Contenido</h6>
        {params.content}
      </p>
      <br />
      <button onClick={onClick}>Volver</button>
    </div>
  );
};

export default ViewNote;
