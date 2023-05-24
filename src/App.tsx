import { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@states/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { mainRoutes } from "./routes/main";
import "./styles/global.scss";

function App() {
  return (
    <Suspense fallback={null}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              {mainRoutes.map((r, i) => {
                const Element = r.element;
                return <Route key={i} path={r.path} element={<Element />} />;
              })}
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}

export default App;
