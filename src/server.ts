import { App } from './app';
import { AuthRoutes } from './routes/auth.route';
import { DefaultRoute } from './routes/default.route';
import { TicketRoute } from './routes/tickets.route';
import { UserRoutes } from './routes/users.route';

const app = new App([new AuthRoutes(), new TicketRoute(), new UserRoutes(), new DefaultRoute()]);
app.listen();
