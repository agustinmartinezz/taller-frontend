import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departamentos : []
}

export const departamentoSlice = createSlice({
  name : "departamento",
  initialState,
  reducers: {
    setDepartamentos : (state, action) => {
      state.departamentos = action.payload
    }
  }
})

export default departamentoSlice.reducer

export const { setDepartamentos } = departamentoSlice.actions