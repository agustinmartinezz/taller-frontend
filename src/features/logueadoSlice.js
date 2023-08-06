import { createSlice } from "@reduxjs/toolkit";
import { getCredentials } from '../utils/utils'


const initialState = {
  logueado : {
    apiKey: getCredentials().apiKey,
    userId: getCredentials().userId
  }
}

export const logueadoSlice = createSlice({
  name : "departamento",
  initialState,
  reducers: {
    setUsuario : (state, action) => {
      state.logueado = action.payload
    }
  }
})

export default logueadoSlice.reducer

export const { setUsuario } = logueadoSlice.actions