/* eslint-disable no-use-before-define */
import React from "react";
import useSWR from "swr";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { supabase } from "../supabase";
import { Profiles, SelectedUserRecords } from "@/types/local";
import Loader from "./Loader";

const fetchAllUsers = async (swrId: string) => {
  let { data: profiles } = await supabase
    .from<Profiles>("profiles")
    .select("*");

  return profiles;
};

interface UserSearchBarProps {
  initialUserData?: SelectedUserRecords[] | undefined;
  defaultSelected?: SelectedUserRecords[] | undefined;
  setState: React.Dispatch<React.SetStateAction<Profiles[] | undefined>>;
  fetchAll: boolean;
  label?: string;
}

export default function UserSearchBar(props: UserSearchBarProps) {
  let userData = undefined;
  if (props.fetchAll) {
    let { data } = useSWR("users", fetchAllUsers, {
      initialData: props.initialUserData,
    });
    userData = data;
  } else {
    userData = props.initialUserData;
  }
  const [inputValue, setInputValue] = React.useState("");

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: Profiles) => option.username + " " + option.email,
  });

  if (!userData) {
    return <Loader isLocal={true} />;
  }

  return (
    <div>
      <Autocomplete
        multiple
        limitTags={2}
        options={userData}
        filterOptions={filterOptions}
        getOptionLabel={(option) => option.username}
        noOptionsText={"No user found!"}
        renderOption={(option) => (
          <React.Fragment>
            <ListItem alignItems="flex-start" component="div">
              <ListItemAvatar>
                <Avatar style={{ marginTop: "4px" }} />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: "body2" }}
                primary={option.username}
                secondaryTypographyProps={{ variant: "caption" }}
                secondary={option.email}
              />
            </ListItem>
          </React.Fragment>
        )}
        getOptionSelected={(option, value) => Boolean(option.uid === value.uid)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={props.label}
            placeholder="Search"
            color="secondary"
          />
        )}
        value={props.defaultSelected}
        onChange={(event, value) => props.setState(value)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
    </div>
  );
}
