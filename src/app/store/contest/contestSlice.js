import { createSlice } from "@reduxjs/toolkit"
import { cabrilloToQSON } from "@ham2k/lib-qson-cabrillo"
import { parseCallsign } from "@ham2k/lib-callsigns"
import { annotateFromCountryFile } from "@ham2k/lib-country-files"
import { useBuiltinCountryFile } from "@ham2k/lib-country-files/builtinData"

// Not sure why ESLint thinks this is a hook 🤷
useBuiltinCountryFile() // eslint-disable-line react-hooks/rules-of-hooks

const initialState = {
  status: "idle",
  qsos: undefined,
  ref: undefined,
}

export const contestSlice = createSlice({
  name: "contest",

  initialState,

  reducers: {
    setQSOs: (state, action) => {
      state.qsos = action.payload
    },

    loadCabrillo: (state, action) => {
      const qson = cabrilloToQSON(action.payload)
      qson.qsos.forEach((qso) => {
        parseCallsign(qso.our.call, qso.our)
        annotateFromCountryFile(qso.our)

        parseCallsign(qso.their.call, qso.their)
        annotateFromCountryFile(qso.their)
      })

      state.qson = qson
      state.qsos = qson.qsos
      state.ref = qson.common.refs.filter((ref) => ref.type === "contest")[0] ?? {}
      state.rawHeaders = qson.rawHeaders
    },

    resetContest: (state, action) => {
      state.qson = undefined
      state.qsos = []
      state.ref = undefined
      state.rawHeaders = undefined
    },
  },
})

export const { loadCabrillo, setQSOs, resetContest } = contestSlice.actions

export const selectContestQSOs = (state) => {
  return state && state.contest.qsos
}
export const selectContestRef = (state) => state.contest.ref

export const selectContestQSON = (state) => state.contest.qson

export default contestSlice.reducer
