import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Init from "./components/Init";
import Status from "./components/Status";
import Layout from "./components/Layout";

import store from "./store";

// Componente principal de la aplicación.
const App = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);

  // Mostramos la aplicación
  return (
    <main>
      <p>
        Estado del servidor:
        {loading ? " Cargando..." : <Status status={status} />}
      </p>
      <Provider store={store}>
        <Layout>
          <Init />
        </Layout>
      </Provider>
    </main>
  );
};

export default App;
