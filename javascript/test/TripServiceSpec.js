"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let User = require('../src/User');

describe('TripService', () => {
    const UserSession = {}
    const tripService = new TripService()
    it('should_Throw_Exception_When_User_Is_Not_LoggedIn', () => {
        UserSession.getLoggedUser = () => null
        assert.throws(() => tripService.getTripsByUser(null, UserSession), Error, 'User not logged in.');

    });
    class Trip { }
    const TripDAO = {
        findTripsByUser(user) {
            return [new Trip(), new Trip()]
        }
    }
    const me = new User()
    it('should_Not_Return_Trips_When_Logged_User_Are_Not_Friend', () => {
        UserSession.getLoggedUser = () => me
        class TestableUser extends User {
            getFriends() {
                return []
            }
        }
        const targetUser = new TestableUser()
        const trips = tripService.getTripsByUser(targetUser, UserSession, TripDAO).length
        assert.equal(trips, 0);
    });

    it('should_Return_Trips_When_Logged_User_Are_Friend', () => {
        UserSession.getLoggedUser = () => me
        class TestableUser extends User {
            getFriends() {
                return [me]
            }
        }
        const targetUser = new TestableUser()
        const trips = tripService.getTripsByUser(targetUser, UserSession, TripDAO).length
        assert.equal(trips, 2);
    });

});
