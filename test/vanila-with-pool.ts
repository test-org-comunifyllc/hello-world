import { Members } from '../src/modules/integration/interface/member.interface';
import axios from 'axios'


// const BASE_URL: string = "https://community.kaltura.com/api/v2";
// const ACCESS_TOKEN = "Bearer va.-Dapdhsr0h0PkdDGD_mS2TDw9a9NLB4a.QjKmdQ.VQYlH3p";


type MembersList = Members[];
type MemberResponse = MembersList[];
type DiscussionResponse = [][];

class VanilaForumService {

    public vanilaBaseUrl: string;

    public vanilaAccessToken: string;

    public platform: string;

    public headers: {};

    constructor(data) {
      this.vanilaBaseUrl = data.vanilaBaseUrl;
      this.vanilaAccessToken = data.vanilaAccessToken;
      this.platform = data.type;
      this.headers = {
        'accept': 'application/json',
        'Authorization': this.vanilaAccessToken,
      }
    }


    async connect(): Promise<string> {
        try {
            return this.vanilaAccessToken;
        } catch (error) {
            throw error;
        }
    }


//   public static async findUserById(userId: string): Promise<User> {
//     if (isEmpty(userId)) {
//       throw new HttpException(400, "You're not userId");
//     }

//     const findUser: User = await prisma.user.findUnique({
//       where: {
//         id: userId
//       }
//     });
//     if (!findUser) {
//       throw new HttpException(409, "You're not user");
//     }

//     return findUser;
//   }

    public  async getInitialData(): Promise < [] > {
        const [users, activity]  = Promise.all[this.getUsers(), this.getActivity()]
        return users;
    }

    public async getUsers(): Promise< [] > {
        try {
            /* check the db for members already exist with comunity filter or not if yes
            need logic to fetch new members */

            let page: number = 1;
            let userData: MemberResponse = [];
            let value: boolean = true;

            for (let i = 0; value; i++) {
                const { data } = await axios.get<MembersList>(
                    `${ this.vanilaBaseUrl }/users?limit=500&page=${page}`,
                    {
                        headers: this.headers,
                    },
                );
                userData.push(data);
                page += 1;
                if (data.length < 500) {
                    value = false;
                }
            };

            const mergedUsersList: [] = [].concat.apply([], userData);
            return mergedUsersList;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                throw error.message;
            } else {
                console.log('unexpected error: ', error);
                throw new Error("An unexpected error occurred");
            }
        }
    }

    // public static async getUsersInPool(): Promise<MembersList | string> {
    //     try {
    //         /* check the db for members already exist with comunity filter or not if yes
    //         need logic to fetch new members */

    //         let page: number = 1;
    //         let userData: MemberResponse = [];
    //         let value: boolean = true;
    //         let now = new Date();
    //         let fourHoursBack = new Date(now.setHours(now.getHours() - 4));
    //         console.log("now",now);
    //         console.log("fourHoursBack", fourHoursBack);

    //         for (let i = 0; value; i++) {
    //             const { data } = await axios.get<MembersList>(
    //                 `${this.}/users?dateInserted=>${ fourHoursBack.toISOString() }&limit=500&page=${page}`,
    //                 {
    //                     headers: HEADERS,
    //                 },
    //             );
    //             userData.push(data);
    //             page += 1;
    //             if (data.length < 500) {
    //                 value = false;
    //             }
    //         };

    //         const mergedUsersList = [].concat.apply([], userData);
    //         return mergedUsersList;

    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             console.log('error message: ', error.message);
    //             return error.message;
    //         } else {
    //             console.log('unexpected error: ', error);
    //             return 'An unexpected error occurred';
    //         }
    //     }
    // };

    public async getActivity(): Promise< [] > {
        try {
            let page: number = 1;
            let discussionData: DiscussionResponse = [];
            let value: boolean = true;

            const yesterday: Date = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
            const filterDate: string = yesterday.toISOString();
            
            for (let i = 0; value; i++) {
                const { data } = await axios.get<[]>(
                    `${this.vanilaBaseUrl}/discussions?dateInserted=>${filterDate}&limit=500&page=${page}`,
                    {
                        headers: this.headers,
                    },
                );
                discussionData.push(data);
                page += 1;
                if (data.length < 500) {
                    value = false;
                }
            };

            const mergedDiscussionList = [].concat.apply([], discussionData);

            return mergedDiscussionList;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                throw error.message;
            } else {
                console.log('unexpected error: ', error);
                throw new Error("An unexpected error occurred");
            }
        }

    };

    public static async getActivityInPool(): Promise< [] | string> {
        try {

            let discussionId: number[] = [];
            let comments: object[] = [];
            let reactions: object[] = [];
            let previousComments: object[] = [];
            let previousReactions: object[] = [];
            let value: boolean = true;
            let valueForPrevious: boolean = true;
            let discussionData: DiscussionResponse = [];
            let previousDiscussionData: DiscussionResponse = [];
            let page: number = 1;
            let previousPageNum: number = 1;
            let now = new Date();
            let filterDate = new Date(now.setHours(now.getHours() - 4));

            for (let i = 0; value; i++) {
                const { data } = await axios.get<[]>(
                    `${BASE_URL}/discussions?dateInserted=>${filterDate.toISOString()}&limit=500&page=${page}`,
                    {
                        headers: HEADERS,
                    },
                );
                discussionData.push(data);
                page += 1;
                if (data.length < 500) {
                    value = false;
                }
            };

            const mergedDiscussionList = [].concat.apply([], discussionData);
            
            if(mergedDiscussionList.length) {
                console.log("new discussion found...!")
                for (let discussion of mergedDiscussionList) {
                    discussionId.push(discussion.discussionID); // map

                };

                for (let id of discussionId) {
                    const { data:comment } = await axios.get<{}>(
                        `${BASE_URL}/comments?discussionID=${id}`,
                        {
                            headers: HEADERS,
                        },
                    );
                    comments.push(comment);
                }


                for (let id of discussionId) {
                    console.log(id);
                    const {data:reaction} = await axios.get<{}>(
                        `${BASE_URL}/discussions/${id}/reactions`,
                        {
                            headers: HEADERS,
                        },
                    );
                    reactions.push(reaction);
                }

                // console.log(reactions);
            };

            // checking for previous elements discussion to get 4 hrs back comments and reactions
            // need to take 24 hr back discussion from last connected 

            for (let i = 0; valueForPrevious; i++) {

                const { data:previousDiscussion } = await axios.get<any>(
                    `${BASE_URL}/discussions?dateInserted=>${CONNECTED_DATE}&limit=500&page=${previousPageNum}`,
                    {
                        headers: HEADERS,
                    },
                );
                let discsussionId = previousDiscussion.map(discussion => discussion.discussionID);
                previousDiscussionData.push(discsussionId);
                page += 1;
                if (previousDiscussion.length < 500) {
                    valueForPrevious = false;
                }
            };

            const previousMergedDiscussionList = [].concat.apply([], previousDiscussionData);
            
            if(previousMergedDiscussionList.length) {
                console.log("old discussion found...!");
                
                for (let id of previousMergedDiscussionList) {
                    const { data:previousComment } = await axios.get<[]>(
                        `${BASE_URL}/comments?discussionID=${id}&dateInserted=>${CONNECTED_DATE}`,
                        {
                            headers: HEADERS,
                        },
                    );
                    previousComments.push(previousComment);
                }


                for (let id of previousMergedDiscussionList) {
                    console.log(id);
                    const {data:previousReaction} = await axios.get<[]>(
                        `${BASE_URL}/discussions/${id}/reactions?dateInserted=>${CONNECTED_DATE}`,
                        {
                            headers: HEADERS,
                        },
                    );
                    previousReactions.push(previousReaction);
                }
                console.log(previousReactions)
            }
            

            
            // fetch all discussion from db and create a array with it's id
            return mergedDiscussionList;



        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }

    };


}


export default VanilaForumService;
