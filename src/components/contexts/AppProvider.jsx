import { GuestProvider } from "./GuestContext";
import { RestrictionProvider } from "./RestrictionsContext";
import { StylingProvider } from "./StylingContext";

const AppProvider = ({ children }) => {
  return (
    <GuestProvider>
      <RestrictionProvider>
        <StylingProvider>{children}</StylingProvider>
      </RestrictionProvider>
    </GuestProvider>
  );
};

export default AppProvider;
