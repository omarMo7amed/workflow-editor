"use client";
import { useEffect, useRef, RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  close: () => void
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClose(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }

    document.addEventListener("click", handleClose, true);

    return () => {
      document.removeEventListener("click", handleClose, true);
    };
  }, [close]);

  return ref;
}
