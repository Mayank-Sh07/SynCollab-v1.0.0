# SynCollab
SynCollab is a platform for building strong, transparent and collaborative teams by setting Objectives and tracking progress via measurable Key Results.
<br>
### OKR Process Made Simple
> Replace difficult to use spreadsheets with tools that are meant to manage OKRs. Align teams to strategic outcomes with measurable key results, ensuring that everyone is working without losing sight of objectives.

### Collaborate on Priorities
> Quickly access your priorities and see where things stand for your teams and direct all the outcomes. Create natural opportunities for feedback and improve collaboration between team members on what really matters.

### Fast Paced Progress
> With SynCollab it is easy to quickly set, share and align Objectives that drive company goals forward. Break through the engagement barrier and facilitate weekly best practices to foster communication.

# Showcase

## Website / Product Marketing
Feel free to view the face of SynCollab by [clicking here](https://syncollab-v1-0-0.vercel.app/) 

## Web Application
Syncollab was developed on the beta release of Supabase (Supabase-js v1.11) and since then updates on [Supabase](https://github.com/supabase) have caused breaking changes which don't allow existing users to get authenticated and new users to sign up. Unfortunately I could not keep up with the breaking changes and so I have chosen to document the working version of SynCollab here on my Github. 

1. ### Creating and Choosing an Organization
![1](https://user-images.githubusercontent.com/52369953/132648777-7f64730b-0e9e-405e-88c8-837ade5f37e8.gif)

<br>
As shown, you can create a new Organization or join an existing team by entering in its team ID. That's it, with this simple step you can get started on the path to leveraging OKRs for maximum productivity.
<br><br>

2. ### Organization details, Identifying members and Adding Admins
![collab-data](https://user-images.githubusercontent.com/52369953/132649760-2d34b4aa-11da-41bd-acd8-0c47817f10d9.gif)

<br>
Incase you join an existing organization you can view the details of all the members of the organization and also the teams they're in. Transparency is key! Moreover, you can add an Administrator to the organization (Given you are the Organization Creator). Roles and user privileges are explained later.
<br><br>

3. ### View/Add Organization Teams and Manage Team members
![teams-view](https://user-images.githubusercontent.com/52369953/132650257-2bb1c5af-1d1a-42f7-96bb-1ed4bdfb52cb.gif)

<br>
As a Admin, you can manage the Teams of your Organization via the Teams section. Each Team card displays the Team ID  (shareable for joining), Team Name, few stats about the team and also options to add members/ go to team settings (Only If you're authorized i.e, Admin Role)
<br><br>

4. ### Objectives and Key Results, CRUD OKRs and transparent collaboratiion
![okr-team](https://user-images.githubusercontent.com/52369953/132650611-b34bf84c-4eb2-49e7-bfa4-3bc1c4f3b5b0.gif)

<br>
Add new Objectives for the team, Allow team members to add and update Key Results! Everyone can see (Observers, Members and Managers) but only Managers can add new objectives and edit the metrics and measures of all key Results.
<br><br>


5. ### Team Settings and Management
![team-settings](https://user-images.githubusercontent.com/52369953/132650984-f6562c41-38a6-49a5-a7b9-b4affaf4b28b.gif)

<br>
As a Team Manager/ Admin, you can access the settings of a team and choose to promote members, remove them and delete the team If need be. As Observers or members the settings page is a way to view role descriptions and perform accordingly.
<br><br>

### Tech Stack Used
* **Front-End**: Next-JS, Material-UI
* **Back-End**: PostgreSQL, Go-True, Supabase
