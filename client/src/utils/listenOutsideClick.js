import { useEffect } from "react";

const ListenOutsideClick = (ref, callback) => {
  const toggleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", toggleClickOutside);

    return () => {
      document.removeEventListener("click", toggleClickOutside);
    };
  });
};

export default ListenOutsideClick;
