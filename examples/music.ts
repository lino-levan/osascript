import osa from "../mod.ts";

const getCurrentTrack = osa((name: string) =>
  name + " is listening to " +
  // @ts-expect-error - This is a valid AppleScript command
  Application("Music").currentTrack().name() as string
);
console.log(await getCurrentTrack("Lino"));
