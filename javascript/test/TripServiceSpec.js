"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let User = require('../src/User');

describe('TripService', () => {

    it('should_Throw_Exception_When_User_Is_Not_LoggedIn', () => {
        class TestableTripService extends TripService {
            getLoggedUser() {
                return null
            }
        }
        const tripService = new TestableTripService()
        assert.throws(tripService.getTripsByUser, Error, 'User not logged in.');
    });

    it('should_Not_Return_Trips_When_Logged_User_Are_Not_Friend', () => {
        class TestableUser extends User {
            getFriends() {
                return []
            }
        }
        const targetUser = new TestableUser()
        const me = new User()
        class TestableTripService extends TripService {
            getLoggedUser() {
                return me
            }
        }
        const tripService = new TestableTripService()
        assert.equal(tripService.getTripsByUser(targetUser).length, 0);
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
        class TestableTripService extends TripService {
            getLoggedUser() {
                return me
            }
            findTripsByUser(user) {
                return [new Trip(), new Trip()]
            }
        }
        const tripService = new TestableTripService()
        assert.equal(tripService.getTripsByUser(targetUser).length, 2);
    });

});
