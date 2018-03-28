import User from "../models/User";

export {

};

function transform(dbUser: any) {
    let {firstName, lastName, emailAddress, userId, auth0Id, refreshToken} = dbUser;
    return new User(firstName,lastName,emailAddress,userId,auth0Id,refreshToken);
}