import Pages from "../_components/_template/pages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = (props: any) => {
  return <Pages>{props.children}</Pages>;
};

export default Layout;
