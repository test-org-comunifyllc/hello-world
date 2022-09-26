import Koa, { Context, DefaultState } from 'koa';
import { Routes } from '../src/interface/higher-logic.interface';
import cors from 'koa2-cors';

import koaBody from 'koa-body';
import { PORT } from '../src/config/config';

// const app = new Koa();

class App {
    public app: Koa<DefaultState, Context>;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = new Koa<DefaultState, Context>();
        this.port = PORT || 5000;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        });
    }

    public getServer() {
        return this.app;
    }
    private initializeMiddlewares() {

        this.app.use(cors({ origin: "*" }));
        this.app.use(koaBody());
    }
    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use(route.router.routes()).use(route.router.allowedMethods());
        });
    }
}


// const PORT = process.env.PORT || 5000;

// app.use(bodyParser());
// app.use(
//     cors({
//         origin: "*"
//     }
//     )
// );


// app.use(routes.routes());

// app.use(logger());
// const server = app.listen(PORT, async () => {
//     console.log(`Server is running on port ${PORT}`);

// }).on("error", err => {
//     console.error(err);
// })

export default App;