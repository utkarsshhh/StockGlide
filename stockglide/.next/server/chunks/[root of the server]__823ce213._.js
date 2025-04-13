module.exports = {

"[project]/.next-internal/server/app/api/auth/login/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/lib/db.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "db": (()=>db)
});
const db = {
    users: new Map(),
    async createUser (userData) {
        const id = Math.random().toString(36).substring(2, 15);
        const user = {
            id,
            ...userData,
            createdAt: new Date().toISOString()
        };
        this.users.set(id, user);
        return user;
    },
    async getUserByEmail (email) {
        console.log(this.users);
        for (const user of this.users.values()){
            if (user.email === email) return user;
        }
        return null;
    },
    async getUserById (id) {
        return this.users.get(id) || null;
    },
    async updateUser (id, data) {
        const user = this.users.get(id);
        if (!user) return null;
        const updatedUser = {
            ...user,
            ...data
        };
        this.users.set(id, updatedUser);
        return updatedUser;
    }
};
}}),
"[project]/app/api/login.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "validateLogin": (()=>validateLogin)
});
const BASE_URL = 'http://localhost:8080';
async function validateLogin(creds) {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds),
        credentials: 'include'
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
    }
    const data = await response.json();
    return data;
}
}}),
"[project]/lib/auth.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getCurrentUser": (()=>getCurrentUser),
    "login": (()=>login),
    "logout": (()=>logout),
    "register": (()=>register)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$login$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/login.ts [app-route] (ecmascript)");
;
;
;
async function register(data) {
    const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserByEmail(data.email);
    if (existingUser) {
        throw new Error('User already exists with this email');
    }
    // In a real app, hash the password before storing
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].createUser({
        username: data.username,
        email: data.email,
        password: data.password,
        name: data.name || data.username
    });
    // Remove password before returning user data
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
async function login(credentials) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$login$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateLogin"])(credentials);
        console.log(user);
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        console.log("user ", user);
        //   cookieStore.set('session', user.user_id, { 
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 60 * 60 * 24, // 1 week
        //     path: '/',
        //   });
        //   cookieStore.set('token', user.token, {
        //     httpOnly: true,
        //     path: '/',
        //     maxAge: 60 * 60 * 24, // 1 day
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'lax',
        //   });
        //   cookieStore.set('user_id', user.user_id.toString(), {
        //     httpOnly: false, // can be read on frontend
        //     path: '/',
        //     maxAge: 60 * 60 * 24,
        //   });
        // Remove password before returning user data
        //   const { password, ...userWithoutPassword } = user;
        //   return userWithoutPassword;
        return user;
    } catch (error) {
        throw new Error('Invalid credentials');
    }
// In a real app, use a proper session management system
// For demo, we'll set a cookie with the user ID
}
async function getCurrentUser() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const sessionCookie = cookieStore.get('user_id');
    console.log(sessionCookie);
    //   console.log("current user ")
    //   if (!sessionCookie?.value) return null;
    if (sessionCookie) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserById(sessionCookie.value);
        if (!user) return null;
        return user;
    } else {
        return null;
    }
// Remove password before returning user data
//   const { password, ...userWithoutPassword } = user;
}
async function logout() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('token');
    cookieStore.delete('user_id');
}
}}),
"[project]/app/api/auth/login/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        console.log("body ", body);
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["login"])(body);
        console.log("user ", user);
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: user
        });
        res.cookies.set('token', user.token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60,
            secure: true,
            sameSite: 'lax'
        });
        res.cookies.set('user_id', user.user_id.toString(), {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60,
            secure: true,
            sameSite: 'lax'
        });
        return res;
    } catch (error) {
        console.log(error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred during login'
        }, {
            status: 400
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__823ce213._.js.map