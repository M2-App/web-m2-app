import { ItemType } from "antd/es/menu/hooks/useItems";
import { MenuProps } from "antd";
import { Route } from "./models/Route";
import User from "../../data/user/user";
import { UserRoles, getUserRol } from "../../utils/Extensions";
import { BsBuildings } from "react-icons/bs";
import Routes from "../../utils/Routes";
import Company from "../company/Companies";
import Priorities from "../priority/Priorities";
import Sites from "../site/Sites";
import CardTypess from "../cardtypes/CardTypes";
import Preclassifiers from "../preclassifier/Preclassifiers";
import Users from "../user/Users";
import { MdOutlineManageAccounts } from "react-icons/md";

const companies = new Route(
  "Companies",
  "companies",
  Routes.AdminDirectionHome,
  <Company />,
  <BsBuildings />
);
const priorities = new Route(
  "Priorities",
  "priorities",
  Routes.PriorityAll,
  <Priorities />,
  <></>
);

const users = new Route(
  "Manage users",
  "users",
  Routes.Users,
  <Users />,
  <MdOutlineManageAccounts />
);

const sites = new Route(
  "Sites",
  "sites",
  Routes.SitesAllByCompany,
  <Sites />,
  <></>
);

const cardTypes = new Route(
  "Card types",
  "cardtypes",
  Routes.CardTypesAllBySite,
  <CardTypess />,
  <></>
);

const preclassifiers = new Route(
  "Preclassifiers",
  "preclassifiers",
  Routes.PreclassifiersAllByCardType,
  <Preclassifiers />,
  <></>
)

const adminRoutes: Route[] = [companies, users, priorities, sites, cardTypes, preclassifiers];

const adminRoutesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(companies.label, companies.fullPath, companies.icon),
    getItem(users.label, users.fullPath, users.icon)
  ];
  return items;
};

const getUserSiderOptions = (user: User): ItemType[] => {
  const rol = getUserRol(user);
  if (rol == UserRoles.ADMIN) {
    return adminRoutesSiderOptions();
  }
  return [];
};

export { adminRoutesSiderOptions, adminRoutes, getUserSiderOptions };

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type MenuItem = Required<MenuProps>["items"][number];
