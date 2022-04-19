"use strict";

class TripService {
    getTripsByUser(user, userSession, tripDAO) {
        let loggedUser = userSession.getLoggedUser()
        if (loggedUser == null) {
            throw new Error('User not logged in.');
        }
        const isFriend = user.checkIsFriend(loggedUser)
        return isFriend ? tripDAO.findTripsByUser(user) : []
    }
}

module.exports = TripService
