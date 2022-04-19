"use strict";

let UserSession = require('./UserSession');
let TripDAO = require('./TripDAO');

class TripService {
    getTripsByUser(user) {
        let tripList = [];
        let loggedUser = this.getLoggedUser()
        let isFriend = false;
        if (loggedUser != null) {
            let friends = this.getFriendsByUser(user)
            for (let i = 0; i < friends.length; i++) {
                let friend = friends[i];
                if (friend == loggedUser) {
                    isFriend = true;
                    break;
                }
            };
            if (isFriend) {
                tripList = this.findTripsByUser(user)
            }
            return tripList;
        } else {
            throw new Error('User not logged in.');
        }
    }
    getLoggedUser() {
        const loggedUser = UserSession.getLoggedUser();
        return loggedUser
    }
    getFriendsByUser(user) {
        const friends = user.getFriends();
        return friends
    }
    findTripsByUser(user) {
        const tripList = TripDAO.findTripsByUser(user);
        return tripList
    }
}

module.exports = TripService
