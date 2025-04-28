import {InternalRoute} from "@configuration/internalRoutes";
// @ts-ignore
import {UserSession} from "@types/userSession";

export function hasAnyAccess(
    session: UserSession | null,
    requiredModules: string[]
): boolean {
    if (!session || !session.modules) return false;
    return requiredModules.some((mod) => {
        return session.modules.includes(mod);
    });
}

export function filterNavigationByAccess(
    session: UserSession | null,
    items?: InternalRoute[]
) {
    return items?.filter((item) => hasAnyAccess(session, item.requiredModule));
}