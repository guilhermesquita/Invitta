import Pages from "../_components/_template/pages";
import { ProviderContextEvent } from "../_data/_context/ContextEvent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = (props: any) => {
  return (
    <ProviderContextEvent>
      <Pages>{props.children}</Pages>
    </ProviderContextEvent>
  );
};

export default Layout;
