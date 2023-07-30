import { configureStore } from "@reduxjs/toolkit";
import personaReducer from "../features/personaSlice";
import departamentoReducer from "../features/departamentoSlice";

export const store = configureStore({
  reducer : {
    persona : personaReducer,
    departamento : departamentoReducer
  }
})