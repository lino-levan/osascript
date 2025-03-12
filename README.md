# Osascript

This is a small wrapper library for the osascript command line tool. It allows
you to run AppleScript commands from Deno. Useful for interacting with Apple
apps.

## Usage

```typescript
import osa from "jsr:@lino/osascript";

const getCurrentTrack = osa((name: string) =>
  name + " is listening to " +
  // @ts-expect-error - This is a valid AppleScript command
  Application("Music").currentTrack().name() as string
);
console.log(await getCurrentTrack("Lino"));
```

## TODO

- Tests (I'm not sure how to test this)
- Type definitions for the AppleScript commands

## Credits

Inspired by [osa2](https://github.com/wtfaremyinitials/osa2)
