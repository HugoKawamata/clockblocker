export type ClockPosition = {
  hour: number,
  minute: number,
}

export type Block = {
  color: string,
  finish: ClockPosition,
  id: string,
  name: string,
  start: ClockPosition,
}
