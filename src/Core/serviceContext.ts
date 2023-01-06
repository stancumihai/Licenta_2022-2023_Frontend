import React from 'react'


export class ServiceContext {
    // private _usersService?: UsersService;
    // private _projectsService?: ProjectsService;
    // private _assignmentsService?: AssignmentsService;
    // private _authentificationService?: AuthentificationService;

    // get UsersService(): UsersService {
    //     if (this._usersService == null) {
    //         this._usersService = new UsersService(USERS_ENDPOINT);
    //     }
    //     return this._usersService;
    // }

    // get ProjectsService(): ProjectsService {
    //     if (this._projectsService == null) {
    //         this._projectsService = new ProjectsService(PROJECTS_ENDPOINT);
    //     }
    //     return this._projectsService;
    // }

    // get AssignmentsService(): AssignmentsService {
    //     if (this._assignmentsService == null) {
    //         this._assignmentsService = new AssignmentsService(ASSIGNMENTS_ENDPOINT);
    //     }
    //     return this._assignmentsService;
    // }

    // get AuthentificationService(): AuthentificationService {
    //     if (this._authentificationService == null) {
    //         this._authentificationService = new AuthentificationService();
    //     }
    //     return this._authentificationService;
    // }
};

export const ServiceContextInstance = React.createContext(new ServiceContext());