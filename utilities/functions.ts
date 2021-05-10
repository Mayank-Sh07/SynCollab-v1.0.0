import { supabase } from "@/supabase/index";
import { TeamNav, UserOrganization, definitions } from "@/types/local";

export const getNavData = async (orgId: string, userId: string) => {
  let { data: teams } = await supabase.rpc<TeamNav>("get_user_org_teams", {
    user_id: userId,
    org_id: orgId,
  });
  return teams;
};

export const getNotificationCount = async (userId: string) => {
  let { count } = await supabase
    .from<definitions["notifications"]>("notifications")
    .select("nid", { count: "exact" })
    .eq("receiver_id", userId);

  return !!count ? count : 0;
};

export const fetchOganizations = async (userId: string) => {
  let { data: organizations } = await supabase.rpc<UserOrganization>(
    "get_user_orgs",
    {
      user_id: userId,
    }
  );
  return organizations;
};

export const setOrg = (
  e: React.SyntheticEvent,
  orgId: number,
  orgName: string
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("orgData", JSON.stringify({ orgId, orgName }));
  }
};

export const dateFormatRegex = (date: string) =>
  date.replace(
    /(\d{4})-(\d{1,2})-(\d{1,2})/,
    (match, y, m, d) => d + "-" + m + "-" + y
  );

export const truncate = (str: string, max: number, suffix: string) =>
  str.length < max
    ? str
    : `${str.substr(
        0,
        str.substr(0, max - suffix.length).lastIndexOf(" ")
      )}${suffix}`;
