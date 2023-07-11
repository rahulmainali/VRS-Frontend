import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

interface KycState {
  kycFormStage: number
}

const initialState: KycState = {
  kycFormStage: 0
}

export const getUserThunk = createAsyncThunk('getUser/', async thunkAPI => {
  const url = 'http://localhost:5000/api'
  try {
    const response = await axios.get(`${url}/session`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    // getting user details

    let details = response.data.payload
    let id = details.id

    const user = await axios.get(`${url}/getUser/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    // getting user details

    const userDetails = user.data.data
    console.log(userDetails)

    return {
      phoneVerified: userDetails.phoneVerified,
      emailVerified: userDetails.emailVerified,
      method: userDetails.method,
      status: userDetails.status,
      role: userDetails.role === 'owner' ? 'owner' : 'user',
      payment:
        userDetails?.paymentInfo === 'undefined' ? 'paymentDone' : 'paymentLeft'
    }
  } catch (error: any) {
    console.log(error)
    return ''
  }
})

// action
const kycFormSlice = createSlice({
  name: 'counter',
  initialState,
  // reducer
  reducers: {
    //increment
    proceedKycForm(state) {
      // this works because it uses immer under the hood
      state.kycFormStage++
    },
    backKycForm(state) {
      state.kycFormStage--
    }
    //decrement
    //reset
  },

  extraReducers: builder => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(getUserThunk.fulfilled, (state: any, { payload }: any) => {

      if (payload.phoneVerified === 'verified') state.kycFormStage = 2
      if ((payload.phoneVerified) && (payload.method === 'google' || payload.emailVerified === 'verified'))
        state.kycFormStage = 4
      if(payload.role === 'user' && payload.status === 'verified') state.kycFormStage = 6

      // if user has already posted kyc and waiting
      if (
        (payload.status === 'verified' || payload.status === 'pending') &&
        payload.role === 'owner'
      )
        state.kycFormStage = 6

      // if owner is waiting for verification

      if (payload.status === 'pending' && payload.role === 'owner')
        state.kycFormStage = 7
      // if owner has filled payment also and waiting

      if (payload.status === 'verified' && payload.role === 'owner')
        state.kycFormStage = 8
    })
  }
})

export const { proceedKycForm, backKycForm } = kycFormSlice.actions

export default kycFormSlice.reducer
