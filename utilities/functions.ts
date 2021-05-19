import { supabase } from "@/supabase/index";
import {
  TeamNav,
  UserOrganization,
  NotificationData,
  NotificationInsert,
  NotificationUpdate,
  Notifications,
} from "@/types/local";

export const getNavData = async (orgId: string | number, userId: string) => {
  let { data: teams } = await supabase.rpc<TeamNav>("get_user_org_teams", {
    user_id: userId,
    org_id: orgId,
  });
  return teams;
};

export const getNotificationData = async (userId: string) => {
  let { data, error } = await supabase
    .from<NotificationData>("notifications")
    .select(`*,profiles:sender_id(username,full_name,avatar_url)`)
    .eq("receiver_id", userId);

  let errorBool: boolean = false;
  if (error) {
    console.log("ERROR:", error);
    errorBool = true;
  }

  return { data, fetchError: errorBool };
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

export const insertNotification = async (
  props: NotificationInsert
): Promise<boolean> => {
  const { error } = await supabase
    .from<Notifications>("notifications")
    .insert([{ ...props }], { returning: "minimal" });

  return Boolean(error);
};

export const updateNotification = async (
  props: NotificationUpdate
): Promise<boolean> => {
  const { error } = await supabase
    .from<Notifications>("notifications")
    .update({ ...props }, { returning: "minimal" })
    .eq("nid", props.nid);

  return Boolean(error);
};

export const deleteNotification = async (nid: number) => {
  let { error } = await supabase.rpc("delete_notification", {
    notification_id: nid,
  });

  if (error) console.error(error);
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

// export const showProfile = (
//   setter: (value: React.SetStateAction<boolean>) => void
// ) => {
//   setter(true);
// };

// export const closeProfile = (
//   setter: (value: React.SetStateAction<boolean>) => void
// ) => {
//   setter(false);
// };
