import React from "react"
import { Box, Typography } from "@mui/material"
import { fmtInteger, fmtOneDecimal } from "@ham2k/lib-format-tools"

const styles = {
  root: {
    "& .table": {
      width: "inherit important!",
      marginTop: "0.5em",
      maxWidth: "15em",
      "& th": {
        textAlign: "right",
      },
      "& td": {
        textAlign: "right",
      },
      "& .band": {
        textAlign: "right",
        maxWidth: "4em",
      },
      "& .qsos": {
        textAlign: "right",
      },
      "& .percent": {
        textAlign: "right",
        width: "3em",
        fontSize: "80%",
      },
      "& tr.totals td": {
        fontWeight: "bold",
      },
    },
  },
}

export function LogSummary({ qson, analysis, contest }) {
  const bands = contest.bands

  const multNames = contest.multipliers ?? []
  const contestSummary = contest.scoringResults?.summary ?? {}

  return (
    <Box sx={styles.root}>
      <Typography component="h2" variant="h5">
        Summary
      </Typography>

      <table className="table nice-table band-colors">
        <thead>
          <tr>
            <th className="band">Band</th>
            <th className="qsos">QSOs</th>
            <th className="percent">%</th>
            <th className="points">Points</th>
            <th className="percent">%</th>
            <th className="points">/QSO</th>
            {multNames[0] && <th className="mults">{multNames[0]}</th>}
            {multNames[0] && <th className="percent">%</th>}
            {multNames[1] && <th className="mults">{multNames[1]}</th>}
            {multNames[1] && <th className="percent">%</th>}
            <th className="dupes">Dupes</th>
            <th className="percent">%</th>
            <th className="invalid">Invalid</th>
            <th className="percent">%</th>
            <th className="score">Score</th>
            <th className="percent">%</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band) => (
            <tr className={`band-${band}`} key={band}>
              <td className="band band-color strong">{band}</td>
              <td className="qsos">{analysis.qsos.totals[band] ? fmtInteger(analysis.qsos.totals[band]) : "-"}</td>
              <td className="percent">
                {analysis.qsos.totals[band] > 0
                  ? `${fmtInteger((analysis.qsos.totals[band] / analysis.qsos.totals.all) * 100)}%`
                  : "-"}
              </td>
              <td className="points">
                {contestSummary.points && contestSummary.points[band] > 0
                  ? fmtInteger(contestSummary.points[band])
                  : "-"}
              </td>
              <td className="percent">
                {contestSummary.points && contestSummary.points[band] > 0
                  ? `${fmtInteger((contestSummary.points[band] / contestSummary.points.all) * 100)}%`
                  : "-"}
              </td>
              <td className="perqso">
                {(contestSummary.points &&
                  contestSummary.points[band] > 0 &&
                  fmtOneDecimal(contestSummary.points[band] / contestSummary.qsos[band])) ??
                  "-"}
              </td>
              {contestSummary && multNames[0] && (
                <td className="mults">
                  {contestSummary && multNames[0] && contestSummary[multNames[0]] && contestSummary[multNames[0]][band]
                    ? fmtInteger(contestSummary[multNames[0]][band])
                    : "-"}
                </td>
              )}
              {contestSummary && multNames[0] && (
                <td className="percent">
                  {contestSummary[multNames[0]] && contestSummary[multNames[0]][band] > 0
                    ? `${fmtInteger((contestSummary[multNames[0]][band] / contestSummary[multNames[0]].all) * 100)}%`
                    : "-"}
                </td>
              )}
              {contestSummary && multNames[1] && (
                <td className="mults">
                  {contestSummary && multNames[1] && contestSummary[multNames[1]] && contestSummary[multNames[1]][band]
                    ? fmtInteger(contestSummary[multNames[1]][band])
                    : "-"}
                </td>
              )}
              {contestSummary && multNames[1] && (
                <td className="percent">
                  {contestSummary[multNames[1]] && contestSummary[multNames[1]][band] > 0
                    ? `${fmtInteger((contestSummary[multNames[1]][band] / contestSummary[multNames[1]].all) * 100)}%`
                    : "-"}
                </td>
              )}
              <td className="dupes">{(contestSummary.dupes && contestSummary.dupes[band]) ?? "-"}</td>
              <td className="percent">
                {contestSummary.dupes && contestSummary.dupes[band] > 0
                  ? `${fmtInteger((contestSummary.dupes[band] / contestSummary.dupes.all) * 100)}%`
                  : "-"}
              </td>
              <td className="invalid">{(contestSummary.invalid && contestSummary.invalid[band]) ?? "-"}</td>
              <td className="percent">
                {contestSummary.invalid && contestSummary.invalid[band] > 0
                  ? `${fmtInteger((contestSummary.invalid[band] / contestSummary.invalid.all) * 100)}%`
                  : "-"}
              </td>
              <td className="score">
                {(contestSummary && contestSummary.total[band] && fmtInteger(contestSummary.total[band])) ?? "-"}
              </td>
              <td className="percent">
                {contestSummary.total && contestSummary.total[band] > 0
                  ? `${fmtInteger((contestSummary.total[band] / contestSummary.total.all) * 100)}%`
                  : "-"}
              </td>
            </tr>
          ))}
          <tr className="totals">
            <td className="band">TOTAL</td>
            <td className="qsos">{fmtInteger(analysis.qsos.totals.all) ?? "-"}</td>
            <td className="percent"></td>
            <td className="points">{contestSummary.points ? fmtInteger(contestSummary.points.all) : "-"}</td>
            <td className="percent"></td>
            <td className="perqso">
              {contestSummary?.qsos?.all > 0 ? fmtOneDecimal(contestSummary.points.all / contestSummary.qsos.all) : "-"}
            </td>
            {multNames[0] && (
              <td className="mults">
                {multNames[0] && contestSummary[multNames[0]] ? fmtInteger(contestSummary[multNames[0]].all) : "-"}
              </td>
            )}
            {multNames[0] && <td className="percent"></td>}
            {multNames[1] && (
              <td className="mults">
                {multNames[1] && contestSummary[multNames[1]] ? fmtInteger(contestSummary[multNames[1]].all) : "-"}
              </td>
            )}
            {multNames[1] && <td className="percent"></td>}
            <td className="dupes">{contestSummary.dupes ? fmtInteger(contestSummary.dupes.all) : "-"}</td>
            <td className="percent"></td>
            <td className="invalid">{contestSummary.invalid ? fmtInteger(contestSummary.invalid.all) : "-"}</td>
            <td className="percent"></td>
            <td className="score">{contest.scoringResults?.total ? fmtInteger(contest.scoringResults.total) : "-"}</td>
            <td className="percent"></td>
          </tr>
        </tbody>
      </table>
    </Box>
  )
}
