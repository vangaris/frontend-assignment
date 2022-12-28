import { createSlice,  PayloadAction } from '@reduxjs/toolkit'

type StatusType = 'initial' | 'play' | 'pause' | 'repeat'

type InitialState = {
  status: StatusType
  currentStep: number,
  showClusterer: boolean

}

const initialState: InitialState = {
  status: 'initial',
  currentStep: 0,
  showClusterer: true
}


const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {
     setAnimationPlayer: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload
    },
      setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
      setShowClusterer: (state, action: PayloadAction<boolean>) => {
      state.showClusterer = action.payload
    },
      initCurrentStep: (state) => {
      state.currentStep = 0
    },
      

  },

})

export default animationSlice.reducer
export const { setAnimationPlayer, setCurrentStep, initCurrentStep, setShowClusterer} = animationSlice.actions