"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let User = require('../src/User');
let UserSession = require('../src/UserSession');
let TripDAO = require('../src/TripDAO')

describe('TripService', () => {

    it('should_Throw_Exception_When_User_Is_Not_LoggedIn', () => {
        const UserSession = {
            getLoggedUser() {
                return null
            }
        }
        const tripService = new TripService()
        assert.throws(() => tripService.getTripsByUser(null, UserSession), Error, 'User not logged in.');
    });

    it('should_Not_Return_Trips_When_Logged_User_Are_Not_Friend', () => {
        class TestableUser extends User {
            getFriends() {
                return []
            }
        }
        const targetUser = new TestableUser()
        const me = new User()
        const UserSession = {
            getLoggedUser() {
                return me
            }
        }
        const TripDAO = {
            findTripsByUser(user) {
                return [new Trip(), new Trip()]
            }
        }
        const tripService = new TripService()
        const trips = tripService.getTripsByUser(targetUser, UserSession, TripDAO).length
        assert.equal(trips, 0);
    });

    it('should_Return_Trips_When_Logged_User_Are_Friend', () => {
        class Trip { }
        class TestableUser extends User {
            getFriends() {
                return [me]
            }
        }
        const targetUser = new TestableUser()
        const me = new User()
        const UserSession = {
            getLoggedUser() {
                return me
            }
        }
        const TripDAO = {
            findTripsByUser(user) {
                return [new Trip(), new Trip()]
            }
        }
        const tripService = new TripService()
        const trips = tripService.getTripsByUser(targetUser, UserSession, TripDAO).length
        assert.equal(trips, 2);
    });

});
