import { Color } from "@mui/material";
import { ReactChild } from "react";

/**
 * @description Define the structure of an error
 */
export type ErrorType = {
  message?: string;
  statusCode?: number;
};

/**
 * @description Structure a page heading link
 */
export type PageHeaderLink = {
  pathname: string;
  label: string;
  icon?: ReactChild;
 permission: string;
};

/**
 * @description Define a structure for a table column
 */
export type DataTableColumn = {
  id: string;
  label: string;
  minWidth?: number;
  align?: "inherit" | "left" | "right" | "center" | "justify";
  // eslint-disable-next-line no-unused-vars
  format?: (value: any, row?: DataTableRow) => ReactChild | string;
  icon?: () => ReactChild;
  backgroundColor?: Color;
  filter?: ReactChild;
  render?: Function;
  sort?: boolean;
};

/**
 * @description Define a structure for a table row
 */
export type DataTableRow = {
  id: string;
  [key: string]: any;
};

export type DataTableFilter = {
  label: string;
  storeId: string;
  component: ReactChild;
  optionsType: "checkbox" | "range" | "boolean" | "date";
};

export type SetupLinks = {
  links: PageHeaderLink[];
};

export type TabbedViewTab = {
  tabId: string;
  title: string | (() => ReactChild);
  content: ReactChild;
  // permission: string;
};

