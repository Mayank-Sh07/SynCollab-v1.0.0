/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/notifications": {
    get: {
      parameters: {
        query: {
          nid?: parameters["rowFilter.notifications.nid"];
          sender_id?: parameters["rowFilter.notifications.sender_id"];
          receiver_id?: parameters["rowFilter.notifications.receiver_id"];
          oid?: parameters["rowFilter.notifications.oid"];
          tid?: parameters["rowFilter.notifications.tid"];
          role?: parameters["rowFilter.notifications.role"];
          body?: parameters["rowFilter.notifications.body"];
          date_created?: parameters["rowFilter.notifications.date_created"];
          status?: parameters["rowFilter.notifications.status"];
          type?: parameters["rowFilter.notifications.type"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["notifications"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** notifications */
          notifications?: definitions["notifications"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          nid?: parameters["rowFilter.notifications.nid"];
          sender_id?: parameters["rowFilter.notifications.sender_id"];
          receiver_id?: parameters["rowFilter.notifications.receiver_id"];
          oid?: parameters["rowFilter.notifications.oid"];
          tid?: parameters["rowFilter.notifications.tid"];
          role?: parameters["rowFilter.notifications.role"];
          body?: parameters["rowFilter.notifications.body"];
          date_created?: parameters["rowFilter.notifications.date_created"];
          status?: parameters["rowFilter.notifications.status"];
          type?: parameters["rowFilter.notifications.type"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          nid?: parameters["rowFilter.notifications.nid"];
          sender_id?: parameters["rowFilter.notifications.sender_id"];
          receiver_id?: parameters["rowFilter.notifications.receiver_id"];
          oid?: parameters["rowFilter.notifications.oid"];
          tid?: parameters["rowFilter.notifications.tid"];
          role?: parameters["rowFilter.notifications.role"];
          body?: parameters["rowFilter.notifications.body"];
          date_created?: parameters["rowFilter.notifications.date_created"];
          status?: parameters["rowFilter.notifications.status"];
          type?: parameters["rowFilter.notifications.type"];
        };
        body: {
          /** notifications */
          notifications?: definitions["notifications"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/organizations": {
    get: {
      parameters: {
        query: {
          oid?: parameters["rowFilter.organizations.oid"];
          creator_id?: parameters["rowFilter.organizations.creator_id"];
          org_name?: parameters["rowFilter.organizations.org_name"];
          about_org?: parameters["rowFilter.organizations.about_org"];
          date_created?: parameters["rowFilter.organizations.date_created"];
          managers?: parameters["rowFilter.organizations.managers"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["organizations"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** organizations */
          organizations?: definitions["organizations"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          oid?: parameters["rowFilter.organizations.oid"];
          creator_id?: parameters["rowFilter.organizations.creator_id"];
          org_name?: parameters["rowFilter.organizations.org_name"];
          about_org?: parameters["rowFilter.organizations.about_org"];
          date_created?: parameters["rowFilter.organizations.date_created"];
          managers?: parameters["rowFilter.organizations.managers"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          oid?: parameters["rowFilter.organizations.oid"];
          creator_id?: parameters["rowFilter.organizations.creator_id"];
          org_name?: parameters["rowFilter.organizations.org_name"];
          about_org?: parameters["rowFilter.organizations.about_org"];
          date_created?: parameters["rowFilter.organizations.date_created"];
          managers?: parameters["rowFilter.organizations.managers"];
        };
        body: {
          /** organizations */
          organizations?: definitions["organizations"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          uid?: parameters["rowFilter.profiles.uid"];
          email?: parameters["rowFilter.profiles.email"];
          username?: parameters["rowFilter.profiles.username"];
          full_name?: parameters["rowFilter.profiles.full_name"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          uid?: parameters["rowFilter.profiles.uid"];
          email?: parameters["rowFilter.profiles.email"];
          username?: parameters["rowFilter.profiles.username"];
          full_name?: parameters["rowFilter.profiles.full_name"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          uid?: parameters["rowFilter.profiles.uid"];
          email?: parameters["rowFilter.profiles.email"];
          username?: parameters["rowFilter.profiles.username"];
          full_name?: parameters["rowFilter.profiles.full_name"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/source": {
    get: {
      parameters: {
        query: {
          uid?: parameters["rowFilter.source.uid"];
          oid?: parameters["rowFilter.source.oid"];
          tid?: parameters["rowFilter.source.tid"];
          role?: parameters["rowFilter.source.role"];
          inserted_at?: parameters["rowFilter.source.inserted_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["source"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** source */
          source?: definitions["source"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          uid?: parameters["rowFilter.source.uid"];
          oid?: parameters["rowFilter.source.oid"];
          tid?: parameters["rowFilter.source.tid"];
          role?: parameters["rowFilter.source.role"];
          inserted_at?: parameters["rowFilter.source.inserted_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          uid?: parameters["rowFilter.source.uid"];
          oid?: parameters["rowFilter.source.oid"];
          tid?: parameters["rowFilter.source.tid"];
          role?: parameters["rowFilter.source.role"];
          inserted_at?: parameters["rowFilter.source.inserted_at"];
        };
        body: {
          /** source */
          source?: definitions["source"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/teams": {
    get: {
      parameters: {
        query: {
          tid?: parameters["rowFilter.teams.tid"];
          oid?: parameters["rowFilter.teams.oid"];
          team_name?: parameters["rowFilter.teams.team_name"];
          date_created?: parameters["rowFilter.teams.date_created"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["teams"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** teams */
          teams?: definitions["teams"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          tid?: parameters["rowFilter.teams.tid"];
          oid?: parameters["rowFilter.teams.oid"];
          team_name?: parameters["rowFilter.teams.team_name"];
          date_created?: parameters["rowFilter.teams.date_created"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          tid?: parameters["rowFilter.teams.tid"];
          oid?: parameters["rowFilter.teams.oid"];
          team_name?: parameters["rowFilter.teams.team_name"];
          date_created?: parameters["rowFilter.teams.date_created"];
        };
        body: {
          /** teams */
          teams?: definitions["teams"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/get_user_orgs": {
    post: {
      parameters: {
        body: {
          args: {
            user_id: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/get_user_org_teams": {
    post: {
      parameters: {
        body: {
          args: {
            org_id: number;
            user_id: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/handle_new_org": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: any };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/handle_notification_action": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: any };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/delete_notification": {
    post: {
      parameters: {
        body: {
          args: {
            notification_id: number;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  notifications: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    nid: number;
    /**
     * Note:
     * This is a Foreign Key to `profiles.uid`.<fk table='profiles' column='uid'/>
     */
    sender_id: string;
    /**
     * Note:
     * This is a Foreign Key to `profiles.uid`.<fk table='profiles' column='uid'/>
     */
    receiver_id: string;
    /**
     * Note:
     * This is a Foreign Key to `organizations.oid`.<fk table='organizations' column='oid'/>
     */
    oid: number;
    /**
     * Note:
     * This is a Foreign Key to `teams.tid`.<fk table='teams' column='tid'/>
     */
    tid: string;
    role?: "Manager" | "Member" | "Observer";
    body: string;
    date_created: string;
    status: "PENDING" | "ACCEPTED" | "DECLINED";
    type: "REQ_TO_JOIN" | "REQ_TO_ADD" | "INFO";
  };
  organizations: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    oid: number;
    /**
     * Note:
     * This is a Foreign Key to `profiles.uid`.<fk table='profiles' column='uid'/>
     */
    creator_id: string;
    org_name: string;
    about_org: string;
    date_created: string;
    managers?: string;
  };
  profiles: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `users.id`.<fk table='users' column='id'/>
     */
    uid: string;
    email: string;
    username: string;
    full_name?: string;
    avatar_url?: string;
    updated_at?: string;
  };
  source: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `profiles.uid`.<fk table='profiles' column='uid'/>
     */
    uid: string;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `organizations.oid`.<fk table='organizations' column='oid'/>
     */
    oid: number;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `teams.tid`.<fk table='teams' column='tid'/>
     */
    tid: string;
    role: "Manager" | "Member" | "Observer";
    inserted_at: string;
  };
  teams: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    tid: string;
    /**
     * Note:
     * This is a Foreign Key to `organizations.oid`.<fk table='organizations' column='oid'/>
     */
    oid: number;
    team_name: string;
    date_created: string;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** notifications */
  "body.notifications": definitions["notifications"];
  "rowFilter.notifications.nid": string;
  "rowFilter.notifications.sender_id": string;
  "rowFilter.notifications.receiver_id": string;
  "rowFilter.notifications.oid": string;
  "rowFilter.notifications.tid": string;
  "rowFilter.notifications.role": string;
  "rowFilter.notifications.body": string;
  "rowFilter.notifications.date_created": string;
  "rowFilter.notifications.status": string;
  "rowFilter.notifications.type": string;
  /** organizations */
  "body.organizations": definitions["organizations"];
  "rowFilter.organizations.oid": string;
  "rowFilter.organizations.creator_id": string;
  "rowFilter.organizations.org_name": string;
  "rowFilter.organizations.about_org": string;
  "rowFilter.organizations.date_created": string;
  "rowFilter.organizations.managers": string;
  /** profiles */
  "body.profiles": definitions["profiles"];
  "rowFilter.profiles.uid": string;
  "rowFilter.profiles.email": string;
  "rowFilter.profiles.username": string;
  "rowFilter.profiles.full_name": string;
  "rowFilter.profiles.avatar_url": string;
  "rowFilter.profiles.updated_at": string;
  /** source */
  "body.source": definitions["source"];
  "rowFilter.source.uid": string;
  "rowFilter.source.oid": string;
  "rowFilter.source.tid": string;
  "rowFilter.source.role": string;
  "rowFilter.source.inserted_at": string;
  /** teams */
  "body.teams": definitions["teams"];
  "rowFilter.teams.tid": string;
  "rowFilter.teams.oid": string;
  "rowFilter.teams.team_name": string;
  "rowFilter.teams.date_created": string;
}

export interface operations {}
