import loadable, { LoadableComponent } from "@loadable/component";
import {
  Dashboard
} from "@mui/icons-material";
import React, { ComponentType } from "react";

type CreateUserProps = {
  setEdit: (value: boolean) => void;
  isEdit: boolean;
};

const DefaultLayout = loadable(
  () => import(/* webpackPrefetch: true */ "../Components/DefaultLayout")
);
const Home = loadable(
  () => import(/* webpackPrefetch: true */ "../Sections/Home")
);
// const JokesForm = loadable(
//   () => import(/* webpackPrefetch: true */ "../Sections/CreateEditJokesForm")
// );

const loadCreateEditJokesForm = () =>
  import("../Sections/CreateEditJokesForm").then((module) => ({
    default: module.default as ComponentType<CreateUserProps>,
  }));

// Use React.lazy instead of LoadableComponent for function components
const JokesForm = React.lazy(loadCreateEditJokesForm);

/**
 * CONFIGURE ROUTE OBJECTS
 */
// export type Permission = string;

export type RouteType = {
  name: string;
  path: string;
  component: LoadableComponent<any> | any;
  layout: LoadableComponent<any> | any;
  showOnNav: boolean;
  icon: any;
};

const ROTES: RouteType[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    component: Home,
    layout: DefaultLayout,
    showOnNav: true,
    icon: Dashboard,
  },
  {
    name: 'Jokes',
    path: '/jokesform/:id',
    component: JokesForm,
    layout: DefaultLayout,
    showOnNav: false,
    icon: '',
  },
  {
    name: 'Jokes',
    path: '/jokesform',
    component: JokesForm,
    layout: DefaultLayout,
    showOnNav: false,
    icon: '',
  },
];
export default ROTES;
