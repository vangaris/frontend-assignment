import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {  getVessel } from '../../services/vessel.service'
import { VesselTrackType } from '../../types/vessel'

export type PositionType = {
    lat: number;
    lng: number;
}

type InitialStateTypes = {
  loading: boolean
  vessel: VesselTrackType[]
  clusterer: VesselTrackType[]
  path: PositionType[]
  error: string
  selectedMarker:PositionType
  startPosition: PositionType
  lastPosition: PositionType
  center: PositionType
  zoom: number
  modal: boolean
}

const initialPositionState: PositionType = {
    lat: 0,
    lng: 0
}
const initialState: InitialStateTypes = {
  loading: false,
  vessel: [],
  clusterer: [],
  path: [],
  error: '',
  selectedMarker: initialPositionState,
  startPosition: initialPositionState,
  lastPosition: initialPositionState,
  center: initialPositionState,
  zoom: 7,
  modal: false,
}

type ParamTypes = {
  period?: string
  days?: number,
  mmsi?: number,
  protocol?: string
}

// Generates pending, fulfilled and rejected action types
export const fetchVessel = createAsyncThunk('vessel/fetchVessel', async ( { period = 'hourly', days = 10, mmsi=241486000, protocol= 'jsono'}:ParamTypes) => {
  try {
  const response = await getVessel({period, days, mmsi, protocol})
  return response?.data
  } catch (err) { 
      throw err
  }
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
     setClustererByDay: (state, action: PayloadAction<VesselTrackType[]>) => {
      state.clusterer = action.payload
    },
      setModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload
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
        state.path = action?.payload.length > 0  ? action?.payload?.map(track => ({ lat: Number(track.LAT), lng: Number(track.LON) })) : []
        state.center =  action?.payload.length > 0  ? {lat: Number(action.payload[0]?.LAT), lng: Number(action.payload[0]?.LON)} : initialPositionState
        state.startPosition =  action?.payload.length > 0  ?  {lat: Number(action?.payload[0]?.LAT), lng: Number(action?.payload[0]?.LON)} : initialPositionState
        state.lastPosition = action?.payload.length > 0 ? {lat: Number(action?.payload[action?.payload?.length -1]?.LAT), lng: Number(action?.payload[action?.payload?.length -1]?.LON)} : initialPositionState
        state.modal = action?.payload.length === 0 ? true : false
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
export const { setZoom, setCenter, selectMarker, initSelectedMarker, setClustererByDay, setModal } = vesselSlice.actions