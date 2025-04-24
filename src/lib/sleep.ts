export const awaitSleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
