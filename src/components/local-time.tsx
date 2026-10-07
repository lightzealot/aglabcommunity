"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Muestra una fecha en la zona horaria del navegador (el servidor no la conoce). */
export function LocalTime({
  iso,
  options = { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" },
}: {
  iso: string;
  options?: Intl.DateTimeFormatOptions;
}) {
  const text = useSyncExternalStore(
    noop,
    () => new Intl.DateTimeFormat("es", options).format(new Date(iso)),
    () => "",
  );
  return <time dateTime={iso}>{text || "…"}</time>;
}
