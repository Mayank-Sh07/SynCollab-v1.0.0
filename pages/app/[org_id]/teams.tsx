import React from "react";
import { supabase } from "@/supabase/index";
import { dateFormatRegex, getNavData } from "@/utils/functions";
import useSWR from "swr";
import { useForm, Controller } from "react-hook-form";
// Components
import AppLayout from "@/layouts/AppLayout";
import BoxTypography from "@/components/BoxTypography";
import TeamCard from "@/components/TeamCard";
// Types and Content
import { GetServerSideProps } from "next";
import {
  TeamsPageProps,
  TeamsData,
  Teams,
  title1,
  error1,
  Source,
} from "@/types/local";
// Material-UI Core
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";

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

  let { data: Teams, error } = await supabase
    .from<TeamsData>("teams")
    .select(
      `*,organizations:oid(creator_id),source(role),objectives(obj_id,key_results(key_id))`
    )
    .eq("oid", orgId);

  const { data: orgmanagersArray } = await supabase
    .from("organizations")
    .select("managers")
    .eq("oid", orgId);

  if (error || !orgmanagersArray) {
    console.log(error?.message);
    return {
      props: {},
      redirect: { destination: "/auth/login", permanent: false },
    };
  }
  let fetchError: boolean = Boolean(error);

  let isManager = orgmanagersArray[0].managers.includes(user.id);

  const UserTeams = await getNavData(orgId, user.id);

  return { props: { Teams, UserTeams, orgId, user, isManager, fetchError } };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageActions: {
      display: "flex",
      justifyContent: "flex-end",
    },
    mainPaper: {
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
    teamsContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
      [theme.breakpoints.up("sm")]: {
        padding: 0,
      },
    },
    teamIdContainer: {
      maxWidth: 240,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(3, 1, 2),
      margin: "auto",
    },
    addTeamCard: {
      backgroundColor: fade(theme.palette.common.white, 0.1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto",
      marginBottom: theme.spacing(3),
      minWidth: 275,
      maxWidth: 300,
      height: 305,
      border: `2px dashed ${theme.palette.secondary.main}`,
    },
  })
);

const fetcher = async (orgId: string) => {
  const oid = orgId.substring(6);
  let { data: Teams } = await supabase
    .from<TeamsData>("teams")
    .select(
      `*,organizations:oid(creator_id),source(role),objectives(obj_id,key_results(key_id))`
    )
    .eq("oid", oid);

  return Teams;
};

function TeamsPage(props: TeamsPageProps) {
  const classes = useStyles();
  const { orgId, user, isManager, fetchError } = props;
  const { data: Teams, mutate } = useSWR("teamof" + orgId, fetcher, {
    initialData: props.Teams,
  });
  const { data: UserTeams, mutate: mutateUserTeams } = useSWR(
    [orgId, user.id],
    getNavData,
    {
      initialData: props.UserTeams,
    }
  );
  console.log(Teams);
  const { control, handleSubmit, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const userTeamIdArray = UserTeams?.map((team) => team.id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleTeamAdd = async (data: any) => {
    const { data: newteam, error } = await supabase
      .from<Teams>("teams")
      .insert([{ team_name: data.teamName, oid: orgId }]);

    if (error || newteam === null) {
      console.log(error);
    } else if (!!newteam) {
      const { data, error: err } = await supabase
        .from<Source>("source")
        .insert([
          {
            uid: user.id,
            oid: orgId,
            tid: newteam[0].tid,
            role: "Manager",
          },
        ]);
      if (err) {
        alert(err);
      } else {
        mutate();
        mutateUserTeams();
        handleClose();
      }
    }
  };

  if (fetchError || !Teams) {
    return (
      <BoxTypography {...error1} color="error">
        Unable to Fetch data, Please re-load page.
      </BoxTypography>
    );
  }

  return (
    <div>
      <Container>
        <Paper elevation={0} className={classes.mainPaper}>
          <BoxTypography {...title1}>{"Teams"}</BoxTypography>
          <Container className={classes.teamsContainer} maxWidth={"md"}>
            <Grid container justify="space-evenly" spacing={2}>
              {Teams?.map((team) => (
                <TeamCard
                  key={team.tid}
                  {...team}
                  date_created={dateFormatRegex(team.date_created)}
                  isUserTeam={Boolean(userTeamIdArray?.includes(team.tid))}
                  orgId={orgId}
                  user={user}
                  isManager={isManager}
                />
              ))}
              {isManager && (
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Paper
                    className={classes.addTeamCard}
                    onClick={() => !open && handleClickOpen()}
                  >
                    {open ? (
                      <form
                        style={{ padding: "12px" }}
                        noValidate
                        onSubmit={handleSubmit((data) => handleTeamAdd(data))}
                      >
                        <BoxTypography
                          variant="body1"
                          fontWeight={700}
                          align="center"
                          mt={2}
                          mb={1}
                        >
                          {"Add New Team"}
                        </BoxTypography>
                        <Box>
                          <BoxTypography
                            variant={"body2"}
                            align="center"
                            mt={2}
                            mb={4}
                          >
                            Create a Team in jiffy. You name it, you got it!
                          </BoxTypography>
                          <Controller
                            name="teamName"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Team name required",
                            }}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <TextField
                                label="Team Name"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                autoFocus
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                              />
                            )}
                          />
                        </Box>
                        <Box mt={3} mb={2} display="flex">
                          <Button
                            onClick={handleClose}
                            color="secondary"
                            startIcon={<CancelIcon />}
                            fullWidth
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            color="secondary"
                            startIcon={<AddIcon />}
                            fullWidth
                          >
                            Create
                          </Button>
                        </Box>
                      </form>
                    ) : (
                      <>
                        <AddIcon style={{ fontSize: 52 }} />
                        ADD TEAM
                      </>
                    )}
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}

TeamsPage.layout = AppLayout;

export default TeamsPage;
