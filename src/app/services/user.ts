export interface Roles {
    //Seccion de Grupos sin poder ver el listado de grupo
    lider_grupo?: boolean;
    lider_discipulado?: boolean;
    lider_red?: boolean;
    admin_iglesia?: boolean;
    lightweekend?: boolean;
    super_admin?: boolean;
}

// export interface User {
//     uid: string;
//     email: string;
//     roles: Roles;
// }

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }