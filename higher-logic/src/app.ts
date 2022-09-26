import App from '../src/server';
import HigherLogicRoute from './routes/higher-logic.route';



const app = new App([
    new HigherLogicRoute(),
]);

app.listen();
