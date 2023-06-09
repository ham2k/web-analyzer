/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo } from "react"

import { Box, Button, Link, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

import { useNavigate, useParams } from "react-router-dom"

import { findContestInfoForId } from "@ham2k/lib-contests"
import { fmtDateMonthYear, fmtMinutesAsHM, fmtInteger, fmtOneDecimal } from "@ham2k/lib-format-tools"

import analyzeAll from "../../../analysis/analyzer"

import { TimeAnalysis } from "./components/TimeAnalysis"
import { ChartQSOs } from "./components/ChartQSOs"
import { LogSummary } from "./components/LogSummary"
import {
  TopTenCallsigns,
  TopTenContinents,
  TopTenCQZones,
  TopTenEntities,
  TopTenITUZones,
} from "./components/TopTenLists"
import { LogSettings } from "./components/LogSettings"
import {
  resetCurrentContestLog,
  selectCurrentContestLog,
  selectLogOverrides,
  setCurrentContestLog,
} from "../../store/contestLogs"

const styles = {
  root: {
    "& h2": {
      marginTop: "1em",
      borderBottom: "2px solid #333",
    },
  },
}

export function AnalysisPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { logKey } = useParams()

  useEffect(() => {
    dispatch(setCurrentContestLog(logKey))
  }, [dispatch, logKey])

  const log = useSelector(selectCurrentContestLog)
  const qson = useMemo(() => log?.qson ?? {}, [log])
  const ref = useMemo(
    () => log?.qson?.common.refs && log?.qson.common.refs.find((ref) => ref.type === "contest"),
    [log]
  )
  const qsos = useMemo(() => log?.qson?.qsos ?? [], [log])
  const overrides = useSelector(selectLogOverrides(logKey))

  const contestRef = useMemo(
    () => qson?.common?.refs && qson.common?.refs.find((ref) => ref.type === "contest"),
    [qson]
  )
  const contest = useMemo(() => {
    const contest = ref && findContestInfoForId(ref.ref, { near: qson.qsos[0].start })
    contest && contest.score(qson)
    return contest
  }, [qson, ref])

  const analysis = useMemo(() => analyzeAll(qson), [qson])
  if (!analysis || !ref || !contest) {
    return null
  }

  if (log.key !== logKey) {
    return <div></div>
  }

  const handleBack = (event) => {
    dispatch(resetCurrentContestLog())
    navigate("/")
  }

  return (
    <Box component="section" sx={styles.root}>
      <Typography component="h1" variant="h3">
        <div style={{ float: "right" }}>
          <Button
            variant={"text"}
            color={"primary"}
            startIcon={<ChevronLeftIcon />}
            onClick={handleBack}
            size={"large"}
          >
            Back
          </Button>
        </div>
        {ref.call}
        <i> in </i>
        {contest.longName}
        {analysis.times && analysis.times.periods ? (
          <i> {fmtDateMonthYear(analysis.times.periods[0].startMillis)}</i>
        ) : (
          <i>Unknown duration</i>
        )}
      </Typography>
      <p>
        <Link href={`/contest/${logKey}/entries`}>
          <b>{fmtInteger(qsos.length)} QSOs</b>
        </Link>
        {" in "}
        {fmtMinutesAsHM(analysis.times.activeMinutes)} {" at "}
        <b>{fmtOneDecimal((qsos.length / analysis.times.activeMinutes) * 60)} QSO/h</b>. &nbsp;&nbsp;&nbsp; Claimed
        Score: {fmtInteger(contestRef?.claimedScore)} - Calculated Score:{" "}
        {fmtInteger(contest?.scoringResults?.total ?? 0)}
      </p>

      <LogSettings log={log} overrides={overrides} contestRef={contestRef} />

      <LogSummary qson={qson} analysis={analysis} contest={contest} contestRef={contestRef} overrides={overrides} />

      <ChartQSOs qson={qson} analysis={analysis} contest={contest} contestRef={contestRef} overrides={overrides} />

      <TimeAnalysis qson={qson} analysis={analysis} contest={contest} contestRef={contestRef} overrides={overrides} />

      <h2>QSOs</h2>
      <TopTenEntities dxcc={analysis.calls.dxcc} />
      <TopTenContinents continents={analysis.calls.continents} />
      <TopTenCallsigns calls={analysis.calls.calls} />
      <TopTenCQZones cqZones={analysis.calls.cqZones} />
      <TopTenITUZones ituZones={analysis.calls.ituZones} />
    </Box>
  )
}
