// Utilities centered around string values.
import React from "react";
export function captitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export const kebabCase = (s) =>
    s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
export const upperCamelCase = (s) =>
    s.replace(/(^|-)([a-z])/g, (x, y, l) => `${l.toUpperCase()}`);

export const PrettyPrintJson = React.memo(({ data }) => (
    <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
));

// Source: https://1loc.dev/random/generate-a-random-string-from-given-characters/
// Example call: generateString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
export const generateString = (length, chars) =>
    Array(length)
        .fill("")
        .map((v) => chars[Math.floor(Math.random() * chars.length)])
        .join("");