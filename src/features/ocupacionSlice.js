import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ocupaciones : []
}

export const ocupacionSlice = createSlice({
  name : "ocupacion",
  initialState,
  reducers: {
    setOcupaciones : (state, action) => {
      state.ocupaciones = action.payload
    }
  }
})

export default ocupacionSlice.reducer

export const {setOcupaciones} = ocupacionSlice.actions