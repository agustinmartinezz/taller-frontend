import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personas : []
}

export const personaSlice = createSlice({
  name : "persona",
  initialState,
  reducers: {
    setPersonas : (state, action) => {
      state.personas = action.payload
    },
    eliminarPersona: (state, action) => {
      state.personas = state.personas.filter((persona) => persona.id != action.payload)
    },
    addPersona: (state, action) => {
      state.personas.push(action.payload)
    }
  }
})

export default personaSlice.reducer

export const { setPersonas, eliminarPersona, addPersona } = personaSlice.actions