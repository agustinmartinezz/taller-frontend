import { configureStore } from "@reduxjs/toolkit";
import personaReducer from "../features/personaSlice";
import departamentoReducer from "../features/departamentoSlice";
import ocupacionReducer from "../features/ocupacionSlice";
import logueadoReducer from "../features/logueadoSlice";

export const store = configureStore({
  reducer : {
    persona: personaReducer,
    departamento: departamentoReducer,
    ocupacion: ocupacionReducer,
    logueado: logueadoReducer
  }
})