import { useEffect, RefObject } from "react";

const useOutsideClick = (
  refs: RefObject<HTMLElement>[], // Accept an array of RefObjects
  isOpen: boolean,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const isOutside = refs.every(
        (ref) => ref.current && target && !ref.current.contains(target)
      );
      if (isOutside) {
        onOutsideClick();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, refs, onOutsideClick]); // Note: This might cause excessive re-renders if refs change often
};

export default useOutsideClick;
