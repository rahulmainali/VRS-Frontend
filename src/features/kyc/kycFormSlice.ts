import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { formType } from '../../component/kyc/KYCForm'

type kycFormType = { kycDetail: formType }

const initialState: any = {
  kycDetail: {
    firstName: '',
    middleName: '',
    lastName: '',
    id: '',
    province: 0,
    district: '',
    municipality: '',
    wardNumber: 0,
    dateOfBirth: '',
    citizenshipNumber: '',
    citizenshipIssuedBy: '',
    citizenshipIssuedDate: '',
    drivingLicenseNumber: '',
    drivingLicenseIssuedBy: '',
    drivingLicenseIssuedDate: '',
    drivingLicenseExpireDate: '',

    // images
    citizenshipImageFront: null,
    citizenshipImageBack: null,
    drivingLicenseImage: null
  }
}

// action
const kycSlice = createSlice({
  name: 'kycFormDetail',
  initialState,
  // reducer
  reducers: {
    //increment
    saveForm(state, action: PayloadAction<kycFormType>) {
      state.kycDetail = action.payload
    }
  }
})

export const { saveForm } = kycSlice.actions

export default kycSlice.reducer
