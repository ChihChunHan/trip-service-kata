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
        const user = new User()
        class TestableTripService extends TripService {
            getLoggedUser() {
                return user
            }
            getFriendsByUser() {
                return []
            }
        }
        const tripService = new TestableTripService()
        assert.equal(tripService.getTripsByUser(user).length, 0);
    });

    xit('should_Return_Trips_When_Logged_User_Are_Friend', () => {
        assert.equal();
    });

});
