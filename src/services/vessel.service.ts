import axios from "./axios";

type ParamTypes = {
  period?: string
  days?: number,
  mmsi?: number,
  protocol?: string
}

const keyParam = 'cf8f05df0b57bfae43e762cc61fd381239c4c042'


export const getVessel = ({ period, days, mmsi, protocol}: ParamTypes) => {
  return axios.get(
    `/exportvesseltrack/${keyParam}/v:3/period:${period}/days:${days}/mmsi:${mmsi}/protocol:${protocol}`,
  );
};