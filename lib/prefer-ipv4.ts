import dns from "node:dns";
import net from "node:net";

type LookupCallback = (
  error: NodeJS.ErrnoException | null,
  address: string,
  family: number,
) => void;

let applied = false;

/**
 * This machine has no IPv6 route (`ENETUNREACH` to AWS/Neon AAAA records).
 * `--dns-result-order=ipv4first` does not always reach Next/Turbopack workers.
 */
export function preferIpv4Dns() {
  if (applied) {
    return;
  }
  applied = true;

  dns.setDefaultResultOrder("ipv4first");

  if (typeof net.setDefaultAutoSelectFamily === "function") {
    net.setDefaultAutoSelectFamily(false);
  }

  const originalLookup = dns.lookup.bind(dns) as (
    hostname: string,
    options: dns.LookupOneOptions | LookupCallback,
    callback?: LookupCallback,
  ) => void;

  function lookupWithIpv4First(
    hostname: string,
    options: dns.LookupOneOptions | LookupCallback,
    callback?: LookupCallback,
  ) {
    const cb: LookupCallback | undefined =
      typeof options === "function" ? options : callback;
    const extra = typeof options === "function" ? {} : options;

    if (!cb) {
      originalLookup(hostname, { ...extra, family: 4 });
      return;
    }

    originalLookup(hostname, { ...extra, family: 4 }, (error, address, family) => {
      if (error) {
        originalLookup(hostname, extra, cb);
        return;
      }
      cb(null, address, family);
    });
  }

  dns.lookup = lookupWithIpv4First as typeof dns.lookup;
}
