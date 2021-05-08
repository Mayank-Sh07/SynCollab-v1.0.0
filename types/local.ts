import { AnchorHTMLAttributes } from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { LinkProps as MuiLinkProps } from "@material-ui/core/Link";
import { User } from "@supabase/supabase-js";
import { definitions } from "./supabase";

export interface Org {
  orgId: number;
  orgName: string;
}

export interface Team {
  id: string;
  name: string;
  date: Date;
}

export interface Organization {
  id: number;
  name: string;
  about: string;
  date: Date;
}

export interface AppProps {
  organizations: Organization[] | null;
  user: User;
  userProfile: definitions["profiles"];
}

export interface OrgData {
  orgName: string;
  orgDesc: string;
}

export interface TeamCode {
  teamCode: string;
}

export interface Nav {
  id: string;
  icon: JSX.Element | Element;
  href: string;
}

export interface NavigatorData {
  id: string;
  children: Nav[];
}

export interface LoaderProps {
  isLocal: boolean;
}

export interface PageLayoutProps {
  window?: () => Window;
  children: React.ReactElement;
}

export interface ClickString {
  event: React.SyntheticEvent;
  id: string;
}

export interface Click {
  event: React.SyntheticEvent;
  id: number;
}

export * from "@supabase/supabase-js";

export * from "./supabase";

export interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<NextLinkProps, "href" | "as"> {
  to: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"];
  href?: NextLinkProps["href"];
}

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps["as"];
  href: NextLinkProps["href"];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">;
