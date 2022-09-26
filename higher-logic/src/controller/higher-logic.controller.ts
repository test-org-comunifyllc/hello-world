import HigherLogicServices from '../services/higherlogic.service';


let token = "AHGYYVWYVWY76236ty-hfdgqwv"

console.log("controller");
class higherlogicController {
    public higherLogicService = new HigherLogicServices();
    public getActivity = async (ctx: any) => {
        console.log("test");
        const findUserAtivity: any[] = await this.higherLogicService.fetchUserActivity(token);
        ctx.response.body = { data: findUserAtivity, message: 'findAllActivity' };
        ctx.response.status = 200;
    };
    public getMessage = async (ctx: any) => {
        const findUserMessages: any[] = await this.higherLogicService.fetchUserMessages(token);
        ctx.response.body = { data: findUserMessages, message: 'findAllMessages' };
        ctx.response.status = 200;
    };
    public getDiscussion = async (ctx: any) => {
        const findUserMessages: any[] = await this.higherLogicService.fetchUserSubscribedDiscussion(token);
        ctx.response.body = { data: findUserMessages, message: 'findSubscribedDiscussion' };
        ctx.response.status = 200;
    };
    
};

export default higherlogicController;