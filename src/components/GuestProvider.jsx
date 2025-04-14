import { GuestContext } from "./GuestContext";
function GuestProvider({ children }) {
  return <GuestContext>{children}</GuestContext>;
}

export default GuestProvider;
