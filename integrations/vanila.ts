import { Members, Config } from './member.interface';
import axios, { AxiosRequestConfig } from 'axios'


const API_VERSION = 'api/v2'


class VanilaForumService {

    public static async memberList(domain: string, accessToken: string): Promise<Members[] | string> {
        try {

            const { data, status } = await axios.get<Members[]>(
                `${domain}/${API_VERSION}/users`,
                {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                },
            );
            console.log(JSON.stringify(data, null, 4));

            // 👇️ "response status is: 200"
            console.log('response status is: ', status);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

}

export default VanilaForumService;
