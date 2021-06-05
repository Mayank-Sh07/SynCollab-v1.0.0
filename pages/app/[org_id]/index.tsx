import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { supabase } from "@/supabase/index";
import { dateFormatRegex } from "@/utils/functions";
import { useForm, Controller } from "react-hook-form";
// Components
import AppLayout from "@/layouts/AppLayout";
import BoxTypography from "@/components/BoxTypography";
import AdminCard from "@/components/AdminCard";
import Table from "@/components/Table";
// Types and Content
import { GetServerSideProps } from "next";
import {
  GridRowsProp,
  GridColDef,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import {
  definitions,
  OrgIndexPageData,
  OrgIndexPageProps,
  title1,
  title2,
  subtitle1,
  error1,
  Source,
} from "@/types/local";
// Material-UI Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);
  let { org_id }: any = ctx.query;
  if (!user || org_id === undefined) {
    return {
      props: {},
      redirect: { destination: "/auth/login", permanent: false },
    };
  }
  const orgId: number = parseInt(org_id);

  let { data: organizations, error } = await supabase
    .from<OrgIndexPageData>("organizations")
    .select(
      `*, source(role, inserted_at, profiles:uid(username,full_name),teams:tid(team_name))`
    )
    .eq("oid", orgId);

  if (error || organizations === null) {
    console.log(error?.message);
    return {
      props: { error: true },
    };
  }

  let { source: rawTableData, ...OrgData } = organizations[0];

  let TableData = rawTableData.map((row, indx) => ({
    id: `dg-row-${indx}`,
    userName: row.profiles.username,
    fullName: row.profiles.full_name,
    teamName: row.teams.team_name,
    role: row.role,
    dateAdded: row.inserted_at,
  }));

  let { data: AdminProfiles, error: profileFetchError } = await supabase
    .from<definitions["profiles"]>("profiles")
    .select("*")
    .in("uid", OrgData.managers);

  if (profileFetchError) {
    console.log(profileFetchError.message);
  }

  return {
    props: { OrgData, TableData, AdminProfiles, user, error: false },
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainPaper: {
      backgroundColor: "transparent",
      padding: theme.spacing(2),
      [theme.breakpoints.only("xs")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
      },
      "& > *": {
        marginTop: theme.spacing(6),
      },
    },
    secondaryColour: {
      color: theme.palette.secondary.main,
    },
    textJustify: {
      textAlign: "center",
      [theme.breakpoints.only("xs")]: {
        textAlign: "justify",
      },
    },
    adminCardContainer: {
      margin: theme.spacing(4, "auto"),
    },
    addAdminCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "auto",
      padding: theme.spacing(1, 2),
      minWidth: 180,
      maxWidth: 200,
      border: `2px dashed ${theme.palette.primary.main}`,
      height: 250,
    },
  })
);

const fetcher = async (id: string, uidArray: string[]) => {
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .in("uid", uidArray);

  if (error) {
    console.log(error);
  }
  console.log(profiles);
  return profiles;
};

function About(props: OrgIndexPageProps) {
  const classes = useStyles();
  const { OrgData, TableData, user } = props;
  const { control, handleSubmit, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const [adminsArray, setAdminsArray] = React.useState(
    props.AdminProfiles?.map((i) => i.uid)
  );
  const rows: GridRowsProp = TableData;
  const router = useRouter();

  const { data: AdminProfiles, mutate } = useSWR(
    ["admins", adminsArray],
    fetcher,
    { initialData: props.AdminProfiles }
  );

  const handleNewAdmin = async (data: any) => {
    let { data: profiles, error: err } = await supabase
      .from("profiles")
      .select("uid")
      .eq("username", data.adminUserName);
    if (err || !profiles || profiles?.length === 0) {
      console.log(err);
      alert("Unable to add Admin.");
    } else {
      let { error } = await supabase.rpc("add_admin", {
        org_id: OrgData.oid,
        user_id: profiles[0].uid,
      });
      if (error || !adminsArray) {
        alert("Error");
        console.log(error);
      } else {
        setAdminsArray([...adminsArray, profiles[0].uid]);
        mutate();
        reset({ adminUserName: "" });
      }
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("organizations")
      .delete()
      .eq("oid", OrgData.oid);

    if (error) {
      console.log(error.message);
    } else {
      handleClose();
      router.push({
        pathname: "/app/",
      });
    }
  };

  const handleOrgLeave = async () => {
    const { error } = await supabase
      .from<Source>("source")
      .delete()
      .match({ oid: OrgData.oid.toString(), uid: user.id });

    if (error) {
      console.log(error.message);
    } else {
      handleClose();
      router.push({
        pathname: "/app/",
      });
    }
  };

  const handleAdminDelete = async (userId: string) => {
    let { error } = await supabase.rpc("remove_admin", {
      org_id: OrgData.oid,
      user_id: userId,
    });

    if (error || !adminsArray) console.error(error);
    else {
      setAdminsArray(adminsArray.filter((uid) => uid !== userId));
      mutate();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Container>
        <Paper elevation={0} className={classes.mainPaper}>
          <div>
            <BoxTypography {...title1}>{OrgData.org_name}</BoxTypography>
            <BoxTypography
              maxWidth={800}
              margin={"auto"}
              {...subtitle1}
              className={classes.textJustify}
            >
              {OrgData.about_org +
                " This organization was created on " +
                dateFormatRegex(OrgData.date_created)}
            </BoxTypography>
          </div>
          <div>
            <BoxTypography {...title2} mt={8}>
              Administrators
            </BoxTypography>
            <BoxTypography
              maxWidth={800}
              mb={6}
              margin={"auto"}
              {...subtitle1}
              className={classes.textJustify}
            >
              {
                "The Organization administrators hold the responsibility of creating collaborative teams within the Organization. Only the Creator and Organization administrators have the permissions to create a new team within the `Teams` section of the Organization. All the administrators along with the organization creator are shown below"
              }
            </BoxTypography>
            <Container maxWidth={"md"} className={classes.adminCardContainer}>
              <Grid container justify="space-evenly" spacing={4}>
                {!!AdminProfiles ? (
                  <>
                    {AdminProfiles.map((admin) => (
                      <AdminCard
                        key={admin.uid}
                        isCreator={admin.uid === OrgData.creator_id}
                        {...admin}
                        mutate={mutate}
                        canDelete={user.id === OrgData.creator_id}
                        handleAdminDelete={handleAdminDelete}
                      />
                    ))}
                    {user.id === OrgData.creator_id && (
                      <Grid item xs={12} sm={4} md={3}>
                        <Paper
                          elevation={3}
                          className={classes.addAdminCard}
                          component="form"
                          onSubmit={handleSubmit((data) =>
                            handleNewAdmin(data)
                          )}
                        >
                          <BoxTypography
                            fontWeight={600}
                            mt={1.5}
                            variant="h6"
                            paragraph={false}
                            mb={1}
                          >
                            NEW ADMIN
                          </BoxTypography>
                          <BoxTypography
                            variant="caption"
                            style={{ lineHeight: "1.4" }}
                            align="center"
                            mb={2}
                          >
                            Add new admins by entering their username.
                          </BoxTypography>
                          <Controller
                            name="adminUserName"
                            control={control}
                            defaultValue=""
                            rules={{
                              minLength: 3,
                            }}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <TextField
                                label="Enter Username"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                size="small"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                              />
                            )}
                          />
                          <Button
                            fullWidth
                            type="submit"
                            color="secondary"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            style={{ margin: "12px auto" }}
                          >
                            ADD
                          </Button>
                        </Paper>
                      </Grid>
                    )}
                  </>
                ) : (
                  <BoxTypography {...error1}>
                    Unable to load data.
                  </BoxTypography>
                )}
              </Grid>
            </Container>
          </div>
          <div>
            <BoxTypography {...title2} mt={8}>
              Collaborator Data
            </BoxTypography>
            <BoxTypography
              maxWidth={800}
              mb={6}
              margin={"auto"}
              {...subtitle1}
              className={classes.textJustify}
            >
              {"The below data grid provides information on all the members of " +
                OrgData.org_name +
                ". You can conveniently view the name, username, the team of the collaborator as well as their role and when they had been added to that particular team. The data grid offers strong filtering and viewing features for faster and more precise insights."}
            </BoxTypography>
            <Table
              rows={rows}
              columns={columns}
              containerProps={{ maxWidth: "md" }}
            />
          </div>
        </Paper>
      </Container>
      {OrgData.creator_id === user.id ? (
        <>
          <Container maxWidth="md">
            <Alert
              severity="error"
              action={
                <Tooltip title="Delete Organization">
                  <Button
                    startIcon={<DeleteIcon />}
                    color="inherit"
                    onClick={handleClickOpen}
                  >
                    DELETE
                  </Button>
                </Tooltip>
              }
            >
              <AlertTitle>Danger Zone!</AlertTitle>
              {"Would you like to delete this Organization? — "}
              <strong>
                {"Clicking the 'DELETE' button will permanently delete" +
                  OrgData.org_name +
                  ", caution is advised."}
              </strong>
            </Alert>
          </Container>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Confirm Action!"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                All the data of {OrgData.org_name} will be deleted permanently!
                <br />
                Are you sure you would like to proceed?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="outlined"
              >
                Disagree
              </Button>
              <Button
                onClick={handleDelete}
                color="secondary"
                variant="contained"
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Container maxWidth="md">
            <Alert
              severity="error"
              action={
                <Tooltip title="Leave Organization">
                  <Button
                    startIcon={<DeleteIcon />}
                    color="inherit"
                    onClick={handleClickOpen}
                  >
                    Leave
                  </Button>
                </Tooltip>
              }
            >
              <AlertTitle>Leave Organization</AlertTitle>
              {"Would you like to leave this Organization? —"}
              <strong>
                {"Clicking the 'Leave' button will remove you from " +
                  OrgData.org_name +
                  " as well as all the Teams, caution is advised."}
              </strong>
            </Alert>
          </Container>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Confirm Action!"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You will be removed from {OrgData.org_name} and all its Teams.
                <br />
                Are you sure you would like to proceed?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="outlined"
              >
                Disagree
              </Button>
              <Button
                onClick={handleOrgLeave}
                color="secondary"
                variant="contained"
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}

About.layout = AppLayout;

export default About;

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Name",
    description: "Full Name",
    width: 250,
  },
  {
    field: "userName",
    headerName: "Username",
    description: "SynCollab Username",
    width: 170,
  },
  {
    field: "teamName",
    headerName: "Team",
    description: "Team Name",
    width: 250,
  },
  {
    field: "role",
    headerName: "Role",
    description: "Role in Team",
    width: 150,
  },
  {
    field: "dateAdded",
    headerName: "Added On",
    width: 150,
    valueFormatter: (params: GridValueFormatterParams) =>
      dateFormatRegex(String(params.value).slice(0, 10)),
  },
];
