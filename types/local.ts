import { AnchorHTMLAttributes } from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { LinkProps as MuiLinkProps } from "@material-ui/core/Link";
import { BoxProps as MuiBoxProps } from "@material-ui/core/Box";
import { ContainerTypeMap } from "@material-ui/core/Container";
import { DataGridProps } from "@material-ui/data-grid";
import { TypographyProps as MuiTypographyProps } from "@material-ui/core/Typography";
import { User } from "@supabase/supabase-js";
import { definitions } from "./supabase";

export * from "@supabase/supabase-js";

export * from "./supabase";

export type Organizations = definitions["organizations"];
export type Teams = definitions["teams"];
export type Profiles = definitions["profiles"];
export type Source = definitions["source"];
export type Notifications = definitions["notifications"];
export type Objectives = definitions["objectives"];
export type KeyResults = definitions["key_results"];

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

export interface UserId {
  userId: string;
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
  uid: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  isCreator?: boolean;
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

export interface NotificationData {
  nid: number;
  sender_id: string;
  receiver_id: string;
  oid: number;
  tid: string;
  role: null;
  body: string;
  date_created: string;
  status: string;
  type: string;
  profiles: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
}
[];

export interface NotificationProps {
  nid: number;
  type: string;
  date: string;
  fullname: string;
  username: string;
  avatarURL: string;
  body: string;
  senderId: string;
}

export interface NotificationInsert
  extends Omit<Notifications, "date_created" | "nid"> {}

export interface NotificationUpdate
  extends Omit<Notifications, "date_created"> {}

export interface TeamsData extends Teams, TeamOKRData {
  organizations: {
    creator_id: string;
    managers: string[];
  };
  source: {
    role: string;
  }[];
  isUserTeam: boolean;
  orgId: number;
  user: User;
  isManager?: boolean;
}

export interface TeamsPageProps {
  Teams: TeamsData[] | null;
  UserTeams: TeamNav[] | null;
  orgId: number;
  user: User;
  isManager: boolean;
  fetchError: boolean;
}

export interface SectionTitleProps
  extends Omit<MuiBoxProps, "color">,
    Omit<MuiTypographyProps, "display"> {}

export interface TableProps extends DataGridProps {
  containerProps: Omit<ContainerTypeMap["props"], "children">;
}

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
  oid?: number;
  org_name: string;
  about_org: string;
  creator_id: string;
  date_created: string;
  managers: string[];
  source: {
    role: string;
    inserted_at: string;
    profiles: {
      username: string;
      full_name: string;
    };
    teams: {
      team_name: string;
    };
  }[];
}
[];

export interface OrgIndexPageProps {
  OrgData: {
    oid?: number;
    creator_id: string;
    org_name: string;
    about_org: string;
    date_created: string;
    managers: string[];
  };
  TableData: {
    id: string;
    userName: string;
    full_name: string;
    teamName: string;
    role: string;
    dateAdded: string;
  }[];
  AdminProfiles:
    | {
        uid: string;
        email: string;
        username: string;
        full_name?: string | undefined;
        avatar_url?: string | undefined;
        updated_at?: string | undefined;
      }[]
    | null;
  error: boolean;
}

export interface OKRData extends Objectives {
  key_results: KeyResults[];
}

export interface TeamOKRData extends Teams {
  objectives: OKRData[];
}

export interface TeamIndexProps {
  teams: TeamOKRData | undefined;
  role: Source["role"];
}

export interface SelectedUserRecords extends Profiles {
  role?: "Manager" | "Member" | "Observer";
}

export interface OKRProps {
  data: OKRData;
  teamName: string;
  userRole: Source["role"];
  mutate: any;
  viewOnly?: boolean;
}

export interface NewOKR {
  keyName: string;
  date: string;
}

export const title1: SectionTitleProps = {
  variant: "h3",
  align: "center",
  fontWeight: 700,
  letterSpacing: { xs: -1, sm: -2 },
  mt: 3,
  mb: 2,
};

export const title2: SectionTitleProps = {
  variant: "h4",
  align: "center",
  fontWeight: 700,
  mt: 4,
  mb: 2,
};

export const title3: SectionTitleProps = {
  variant: "body1",
  align: "center",
  fontWeight: 700,
  mt: 2,
  mb: 1,
};

export const subtitle1: SectionTitleProps = {
  paragraph: true,
  align: "center",
  color: "textSecondary",
  mt: 1,
  mb: 1,
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

export const error1: SectionTitleProps = {
  variant: "body1",
  align: "center",
  color: "error",
  mt: 2,
  mb: 2,
};
