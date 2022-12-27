import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../redux/store'
import { useEffect } from 'react'
import { fetchVessel } from './vesselSlice'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useVessel = () => {
    const vesselInfo = useAppSelector((state) => state.vessel.vessel);
    const path = useAppSelector((state) => state.vessel.path);
    const center = useAppSelector((state) => state.vessel.center) || { lat: 0, lng: 0 };
    const currentZoom = useAppSelector((state) => state.vessel.zoom);
    const currentStep = useAppSelector((state) => state.animation.currentStep);
    const selectedMarker = useAppSelector((state) => state.vessel.selectedMarker);
  
    const dispatch = useAppDispatch();

    
  useEffect(() => {
    dispatch(fetchVessel({}));
  }, [dispatch]);
    
    
    return { vesselInfo, center, currentZoom, path, currentStep, selectedMarker, dispatch}
}

export default useVessel