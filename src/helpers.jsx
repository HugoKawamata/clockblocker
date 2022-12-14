export const blockInAm: boolean = (block: Block) => block.start.hour < 12
export const blockInPm: boolean = (block: Block) => block.finish.hour >= 12