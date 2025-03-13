"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const auth_route_1 = require("./routes/auth.route");
const default_route_1 = require("./routes/default.route");
const tickets_route_1 = require("./routes/tickets.route");
const users_route_1 = require("./routes/users.route");
const app = new app_1.App([new auth_route_1.AuthRoutes(), new tickets_route_1.TicketRoute(), new users_route_1.UserRoutes(), new default_route_1.DefaultRoute()]);
app.listen();
//# sourceMappingURL=server.js.map