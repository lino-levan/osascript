export default function osa<T extends unknown[], R>(
  fn: (...args: T) => R,
): (...args: T) => Promise<R> {
  const code = `ObjC.import('stdlib')
var fn   = (${fn.toString()})
var args = JSON.parse($.getenv('OSA_ARGS'))
var out  = fn.apply(null, args)
JSON.stringify(out)`;

  const osafn = async function (...args: T) {
    const command = new Deno.Command("/usr/bin/osascript", {
      args: ["-l", "JavaScript"],
      env: {
        OSA_ARGS: JSON.stringify(args),
      },
      stdin: "piped",
      stdout: "piped",
    });
    const process = command.spawn();
    const writer = process.stdin.getWriter();
    await writer.write(new TextEncoder().encode(code));
    writer.close();
    const output = await process.output();
    const encoded = output.stdout;

    if (encoded.length === 0) {
      return undefined;
    }

    const decoded = new TextDecoder().decode(encoded);
    try {
      return JSON.parse(decoded);
    } catch {
      throw new Error(decoded);
    }
  };
  return osafn;
}
