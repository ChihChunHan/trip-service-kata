"use strict";

module.exports = class User {
    checkIsFriend(user) {
        const friends = this.getFriends();
        const isFriend = friends.some(friend => {
            return friend === user
        })
        return isFriend
    }
}