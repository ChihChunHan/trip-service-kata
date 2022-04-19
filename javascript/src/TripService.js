"use strict";

let UserSession = require('./UserSession');
let TripDAO = require('./TripDAO');

class TripService {
    getTripsByUser(user) {
        let loggedUser = this.getLoggedUser()
        if (loggedUser == null) {
            throw new Error('User not logged in.');
        }
        const isFriend = user.checkIsFriend(loggedUser)
        return isFriend ? this.findTripsByUser(user) : []
    }
    getLoggedUser() {
        const loggedUser = UserSession.getLoggedUser();
        return loggedUser
    }
    findTripsByUser(user) {
        const tripList = TripDAO.findTripsByUser(user);
        return tripList
    }
}

module.exports = TripService
