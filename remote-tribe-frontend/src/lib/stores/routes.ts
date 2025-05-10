export function roleBasedRoutes(role: string | null | undefined):string {
    if ( role === null || role === undefined ) return '';
    return `${role.toLocaleLowerCase()}`
}