// import { Members } from '../src/modules/integration/interface/member.interface';
import axios from 'axios'


// const BASE_URL: string = "https://community.kaltura.com/api/v2";
// const ACCESS_TOKEN = "Bearer va.-Dapdhsr0h0PkdDGD_mS2TDw9a9NLB4a.QjKmdQ.VQYlH3p";


// type MembersList = Members[];
// type MemberResponse = MembersList[];
// type DiscussionResponse = [][];

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



    public  async getInitialData(): Promise < [] > {
        const users  = await this.getUsers();
        return users;
    }

    public async getUsers(): Promise< [] > {
        try {
            /* check the db for members already exist with comunity filter or not if yes
            need logic to fetch new members */

            let page: number = 1;
            let userData: [][] = [];
            let value: boolean = true;

            for (let i = 0; value; i++) {
                const { data } = await axios.get<[]>(
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

    public async getActivity(): Promise< [] > {
        try {
            let page: number = 1;
            let discussionData: [][] = [];
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

}


export default VanilaForumService;
