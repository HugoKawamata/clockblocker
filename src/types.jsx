export type ClockPosition = {
  hour: number,
  minute: number,
}

export type Block = {
  color: string,
  finish: ClockPosition,
  name: string,
  start: ClockPosition,
}
