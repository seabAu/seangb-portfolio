import { deepGetKey } from "../../utilities/AO";
import { isValidArray } from "../../utilities/Val";
const debug = false;

// Kind of a temporary function; provide a destination and current location and this will check it against the user's permissions to see if they can go there. If not, it will route to a public location like the landing page or portfolio site.
export const route = (dest, user) => {
    let src = window.location.href;
    let token = localStorage.getItem("token");
    if (debug)
        console.log(
            "HOOKS -> ROUTE.js :: route(",
            dest,
            ") :: src = ",
            src,
            ", token = ",
            token,
            ", userdata = ",
            user,
        );
    if (debug)
        console.log(
            "HOOKS -> ROUTE.js :: route(",
            dest,
            ") :: Trying to go to admin. Checking auth. :: src = ",
            src,
            ", token = ",
            token,
            ", userdata = ",
            user,
        );
    if (token) {
        // We are logged in. Check for permissions.
        let role = deepGetKey(user, "role");
        if (role) {
            if (debug)
                console.log(
                    "HOOKS -> ROUTE.js :: route(",
                    dest,
                    ") :: Role is set :: ",
                    role,
                );
            if (role === "admin") {
                // Admin can go anywhere.
                if (debug)
                    console.log(
                        "HOOKS -> ROUTE.js :: route(",
                        dest,
                        ") :: Role is admin, destination is ",
                        dest,
                        ", proceeding.",
                    );
                destcheck(["/", "/login", "/portfolio", "/admin"], dest);
            } else if (role === "superadmin") {
                // Superadmin can go anywhere.
                destcheck(["/", "/login", "/portfolio", "/admin"], dest);
            } else if (role === "guest") {
                destcheck(["/", "/login", "/portfolio"], dest);
            } else {
                // Invalid role, default to landing page.
                window.location.href = "/";
            }
        } else {
            // No role, default to landing page.
            window.location.href = "/";
        }
    } else {
        // No valid token, send to landing page.
        window.location.href = "/";
    }
};

const destcheck = (dest, validDests) => {
    if (isValidArray(validDests, true)) {
        if (validDests.includes(dest)) {
            // Dest is valid for role, send them along.
            window.location.href = dest;
        } else {
            // Invalid destination given. Send to landing page.
            window.location.href = "/";
        }
    } else {
        // Invalid destination list given. Send to landing page.
        window.location.href = "/";
    }
};

// export default route;
