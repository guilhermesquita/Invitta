import Pages from "../_components/_template/pages";
import { Toaster } from "../_components/_ui/toaster";
import { ProviderContextEvent } from "../_data/_context/ContextEvent";
import { ProviderContextMessages } from "../_data/_context/ContextMessages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = (props: any) => {
  return (
    <ProviderContextMessages>
      <ProviderContextEvent>
        <Pages>{props.children}</Pages>
        <Toaster />
      </ProviderContextEvent>
    </ProviderContextMessages>
  );
};

export default Layout;
