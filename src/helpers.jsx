import { DateTime } from "luxon"
import { SECONDS_IN_12_HOURS } from "./constants"
import * as Types from "./types"

export const blockInAm: boolean = (block: Types.Block) => block.start.hour < 12
export const blockInPm: boolean = (block: Types.Block) =>
  block.finish.hour >= 12

export const timeToSecondsPastMidnight: number = (time: DateTime) =>
  time.toSeconds() - time.startOf("day").toSeconds()

export const timeToClockPercentage = (time: DateTime, amOrPm: "am" | "pm") => {
  const secondsPastMidnight = timeToSecondsPastMidnight(time)
  const adjustedSeconds = Math.max(
    secondsPastMidnight - (amOrPm === "pm" ? SECONDS_IN_12_HOURS : 0),
    0
  )
  return (adjustedSeconds / SECONDS_IN_12_HOURS) * 100
}
