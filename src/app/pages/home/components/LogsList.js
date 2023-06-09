import { Link, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fmtDateMonthYear } from "@ham2k/lib-format-tools"
import { fetchContestLogList, selectContestLogList } from "../../../store/contestLogs"
import { LogLoader } from "./LogLoader"

export function LogsList() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchContestLogList())
  }, [dispatch])
  const logs = useSelector(selectContestLogList).slice()

  logs.sort((a, b) => (a.start > b.start ? -1 : 1)) // Reverse date sort

  if (logs?.length > 0) {
    return (
      <div>
        <Typography component="h2" variant="h5">
          Available Contest Logs
        </Typography>

        <table className={"table nice-table"} width="100%">
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.key}>
                <td>
                  <Link href={`/contest/${log.key}`}>{log.call}</Link>
                </td>
                <td>
                  <Link href={`/contest/${log.key}`}>{log.name}</Link>
                </td>
                <td>
                  <Link href={`/contest/${log.key}`}>{fmtDateMonthYear(log.start)}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <LogLoader title={logs?.length > 0 ? "Add another Cabrillo file" : "Add a Cabrillo file"} />
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <p>You have not loaded any logs yet</p>
        <p>
          <LogLoader title={"Add a Cabrillo file"} />
        </p>
      </div>
    )
  }
}
