const VanilaForumService = require('./vanila');
const now = new Date();
const filteredDate = new Date(now.setHours(now.getHours() - 4));

class VanilaController {
    vanilaService = new VanilaForumService();

    async getUsersInPool() {
        const poolValue = true;
        this.vanilaService.getUsers(poolValue);
    };

    // get previously connected date from db and pass getComments
    async getActivityInPool() {
        this.vanilaService.getActivityList(filteredDate.toISOString());
    };

    async getCommentsInPool() {
        this.vanilaService.getComments(filteredDate.toISOString());
    }

};

const controller = new VanilaController();


controller.getUsersInPool();
controller.getActivityInPool();
controller.getCommentsInPool();