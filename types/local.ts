import { AnchorHTMLAttributes } from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { LinkProps as MuiLinkProps } from "@material-ui/core/Link";
import { BoxProps as MuiBoxProps } from "@material-ui/core/Box";
import { TypographyProps as MuiTypographyProps } from "@material-ui/core/Typography";
import { User } from "@supabase/supabase-js";
import { definitions } from "./supabase";

export * from "@supabase/supabase-js";

export * from "./supabase";

export interface OrgLocalStorage {
  orgId: number;
  orgName: string;
}

export interface TeamNav {
  id: string;
  name: string;
  date: Date;
}

export interface UserOrganization {
  id: number;
  name: string;
  about: string;
  date: Date;
}

export interface AppIndexProps {
  organizations: UserOrganization[] | null;
  user: User;
  userProfile: definitions["profiles"];
}

export interface NewOrgData {
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

export interface LayoutProps {
  window?: () => Window;
  children: React.ReactElement;
}

export interface AdminCardProps {
  key: string;
  uid: string;
  username: string;
  full_name: string;
  avatar_url: string;
}

export interface FeatureCardProps {
  key: string;
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface ReviewCardProps {
  key: string;
  review: string;
  name: string;
}

export interface FeatureImageCardProps {
  key: string;
  ltr: boolean;
  src: string;
  header: string;
  title: string;
  description: string;
}

export interface SectionTitleProps
  extends Omit<MuiBoxProps, "color">,
    Omit<MuiTypographyProps, "display"> {}

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

export const TabRoutes = ["/", "/about", "/pricing"];

export interface OrgIndexPageData {
  oid: number;
  org_name: string;
  about_org: string;
  date_created: string;
  managers: string[];
  profiles: {
    username: string;
    email: string;
    full_name: string;
    avatar_url: string;
  };
  source: {
    role: string;
    inserted_at: string;
    profiles: {
      username: string;
      email: string;
    };
    teams: {
      team_name: string;
    };
  }[];
}
[];

export interface OrgIndexPageProps {
  orgCreatorData: {
    username: string;
    email: string;
    full_name: string;
    avatar_url: string;
  };
  tableData: {
    userName: string;
    email: string;
    teamName: string;
    role: string;
    dateAdded: string;
  }[];
  orgData: {
    oid: number;
    org_name: string;
    about_org: string;
    date_created: string;
    managers: string[];
  };
}

export const title1: SectionTitleProps = {
  variant: "h3",
  align: "center",
  fontWeight: 700,
  letterSpacing: { xs: -1, sm: -2 },
  padding: 2,
  mt: 4,
  mb: 2,
};

export const title3: SectionTitleProps = {
  variant: "body1",
  align: "center",
  fontWeight: 700,
  mt: 2,
  mb: 2,
};

export const subtitle1: SectionTitleProps = {
  paragraph: true,
  align: "center",
  color: "textSecondary",
  mt: 2,
  mb: 2,
};

export const subtitle2: SectionTitleProps = {
  paragraph: true,
  variant: "subtitle2",
  align: "justify",
  color: "textSecondary",
  letterSpacing: "0.03rem",
  mt: 2,
  mb: 2,
};
