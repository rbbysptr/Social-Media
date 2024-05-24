const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb")

module.exports = class Follow {
    static collection() {
        return database.collection("follows");
    }
    static async createFollow(dataFollow) {
        const followCollection = this.collection();
        const result = await followCollection.insertOne({
            followerId: new ObjectId(String(dataFollow.followerId)),
            followingId: new ObjectId(String(dataFollow.followingId)),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const createFollow = await this.findFollowById(result.insertedId);
        return createFollow;
    }
}