export type ClockPosition = {
  hour: number,
  minute: number,
}

export type Block = {|
  start: ClockPosition,
  finish: ClockPosition,
  color: string,
|}