import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {  getVessel } from '../../services/vessel.service'
import { VesselTrackType } from '../../types/vessel'

export type PositionType = {
    lat: number;
    lng: number;
}

type InitialState = {
  loading: boolean
  vessel: VesselTrackType[]
  path: PositionType[]
  error: string
  selectedMarker:PositionType
  startPosition: PositionType
  lastPosition: PositionType
  center: PositionType
  zoom: number
}

const initialPositionState: PositionType = {
    lat: 0,
    lng: 0
}
const initialState: InitialState = {
  loading: false,
  vessel: [],
  path: [],
  error: '',
  selectedMarker: initialPositionState,
  startPosition: initialPositionState,
  lastPosition: initialPositionState,
  center: initialPositionState,
  zoom: 7
}

// Generates pending, fulfilled and rejected action types
export const fetchVessel = createAsyncThunk('vessel/fetchVessel', async () => {
  const response = await getVessel({})
  return response.data
  
})

const vesselSlice = createSlice({
  name: 'vessel',
  initialState,
  reducers: {
     setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload
    },
     setCenter: (state, action: PayloadAction<PositionType>) => {
      state.center = action.payload
    },
     setPath: (state, action: PayloadAction<VesselTrackType[]>) => {
      state.path = action.payload.map(track =>({lat:Number(track.LAT), lng: Number(track.LON)}))
    },
     selectMarker: (state, action: PayloadAction<PositionType>) => {
      state.selectedMarker = action.payload
    },
     initSelectedMarker: (state) => {
      state.selectedMarker = { lat: 0, lng: 0 }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchVessel.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchVessel.fulfilled,
      (state, action: PayloadAction<VesselTrackType[]>) => {
        state.loading = false
        state.vessel = action.payload
        state.path = action.payload.map(track =>({lat:Number(track.LAT), lng: Number(track.LON)}))
        state.center = {lat: Number(action.payload[0]?.LAT), lng: Number(action.payload[0]?.LON)}
        state.startPosition = {lat: Number(action.payload[0]?.LAT), lng: Number(action.payload[0]?.LON)}
        state.lastPosition = {lat: Number(action.payload[action.payload.length -1]?.LAT), lng: Number(action.payload[action.payload.length -1]?.LON)}
        state.error = ''
      }
    )
    builder.addCase(fetchVessel.rejected, (state, action) => {
      state.loading = false
      state.vessel = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default vesselSlice.reducer
export const { setZoom, setCenter, selectMarker, initSelectedMarker } = vesselSlice.actions