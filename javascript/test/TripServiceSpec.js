"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');

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

    xit('should_Not_Return_Trips_When_Logged_User_Are_Not_Friend', () => {
        assert.equal();
    });

    xit('should_Return_Trips_When_Logged_User_Are_Friend', () => {
        assert.equal();
    });

});
