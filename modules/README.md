# Vanila forums

initial connect = next time fetch = disconnect+connect (all need full member list)

we have 2 condition 
1) comunity members in our db 
2) no comunity members in our db

step1 : check if the members exist in db with comunify name filter
step2 : if (!members) insert all members to db using insertMany
step3 : if(members) fetch  

        find & create ( bulk opertaion )
        insert with a unique id (initially) insertMany if(err) remove that user and upload remng

        bulk delete and create ( not possible )

# for 4 hrs

        members users created 4hrs before ( which remove duplicates)
        In case of discussion fetch discussion before 4 hrs ( which remove duplicates ) 
        also fetch old discussion and and it's new 

