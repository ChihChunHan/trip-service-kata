"use strict";

let UserSession = require('./UserSession');
let TripDAO = require('./TripDAO');

class TripService {
    getTripsByUser(user) {
        let loggedUser = this.getLoggedUser()
        if (loggedUser == null) {
            throw new Error('User not logged in.');
        }

        let friends = this.getFriendsByUser(user)
        const isFriend = friends.some(friend => {
            return friend === loggedUser
        })
        return isFriend ? this.findTripsByUser(user) : []
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
