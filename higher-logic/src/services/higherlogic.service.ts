import { HttpException } from '../exceptions/HttpException';
import blogRequestData from '../request/request';
import axios from 'axios';

const BASE_URL: string = 'https://api.higherlogic.com/api/v2.0'

class HigherLogicServices {
    public async fetchUserActivity(token: string): Promise<any> {
        if (!token) throw new HttpException(401, 'Unauthorized');

        // const data1 = await  higherlogicApiCall
        const { data, status } = await axios.post<any>(
            `${BASE_URL}/Blogs/GetLatestEntries`,
            {
                headers: {
                    Accept: 'application/json',
                },
                data: blogRequestData
            },
        );

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
    };
    public async fetchUserMessages(token: string): Promise<any> {
        if (!token) throw new HttpException(401, 'Unauthorized');
        const { data, status } = await axios.get<any>(
            `${BASE_URL}/Messaging/GetInboxMessages`,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
    };
    public async fetchUserSubscribedDiscussion(token: string): Promise<any> {
        try {
            if (!token) throw new HttpException(401, 'Unauthorized');
        const { data, status } = await axios.get<any>(
            `${BASE_URL}/Discussions/GetSubscribedDiscussions`,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
        } catch(e){
            console.log(e);
        }
    };
    


}

export default HigherLogicServices;