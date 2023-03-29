import { deepGetKey } from "../components/Utilities/AO";
import { isValidArray } from "../components/Utilities/Val";

// Kind of a temporary function; provide a destination and current location and this will check it against the user's permissions to see if they can go there. If not, it will route to a public location like the landing page or portfolio site.
//export const route = (user, dest) => {
//     let src = window.location.href;
//     let token = localStorage.getItem("token");
//     console.log(
//         "HOOKS -> ROUTE.js :: route(",
//         dest,
//         ") :: src = ",
//         src,
//         ", token = ",
//         token,
//         ", userdata = ",
//         user,
//     );
//     console.log(
//         "HOOKS -> ROUTE.js :: route(",
//         dest,
//         ") :: Trying to go to admin. Checking auth. :: src = ",
//         src,
//         ", token = ",
//         token,
//         ", userdata = ",
//         user,
//     );
//     if (token) {
//         // We are logged in. Check for permissions.
//         let role = deepGetKey(user, "role");
//         if (role) {
//             console.log(
//                 "HOOKS -> ROUTE.js :: route(",
//                 dest,
//                 ") :: Role is set :: ",
//                 role,
//             );
//             if (role === "admin") {
//                 if (["/", "/login", "/portfolio", "/admin"].includes(dest)) {
//                     // Dest is valid for role, send them along.
//                     console.log(
//                         "HOOKS -> ROUTE.js :: route(",
//                         dest,
//                         ") :: Role is admin, destination is ",
//                         dest,
//                         ", proceeding.",
//                     );
//                     window.location.href = dest;
//                 } else {
//                     // Invalid destination given. Send to landing page.
//                     window.location.href = "/";
//                 }
//                 // Admin can go anywhere.
//                 window.location.href = dest;
//             } else if (role === "superadmin") {
//             } else if (role === "guest") {
//                 if (["/", "/login", "/portfolio"].includes(dest)) {
//                     // Dest is valid for role, send them along.
//                     window.location.href = dest;
//                 } else {
//                     // Invalid destination given. Send to landing page.
//                     window.location.href = "/";
//                 }
//             } else {
//                 // Invalid role, default to landing page.
//                 window.location.href = "/";
//             }
//         } else {
//             // No role, default to landing page.
//             window.location.href = "/";
//         }
//         // No role, send to landing page.
//         window.location.href = "/";
//     }
//     // No valid token, send to landing page.
//     window.location.href = "/";
// };

// Kind of a temporary function; provide a destination and current location and this will check it against the user's permissions to see if they can go there. If not, it will route to a public location like the landing page or portfolio site.
export const route = (dest, user) => {
    let src = window.location.href;
    let token = localStorage.getItem("token");
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
            console.log(
                "HOOKS -> ROUTE.js :: route(",
                dest,
                ") :: Role is set :: ",
                role,
            );
            if (role === "admin") {
                // Admin can go anywhere.
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