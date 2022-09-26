 // async getUsersInPool() {
    //     try {
    //         /* check the db for members already exist with comunity filter or not if yes
    //         need logic to fetch new members */

    //         let page = 1;
    //         let userData = [];
    //         let value= true;
    //         let now = new Date();
    //         let fourHoursBack = new Date(now.setHours(now.getHours() - 4));
    //         console.log("now",now);
    //         console.log("fourHoursBack", fourHoursBack);

    //         for (let i = 0; value; i++) {
    //             const { data } = await axios.get(
    //                 `${BASE_URL}/users?dateInserted=>${ fourHoursBack.toISOString() }&limit=500&page=${page}`,
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
    //         console.log(userData);

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