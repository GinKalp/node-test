const {addNewAccount, getAllGroups, isUserInGroup} = require("../models/accountsModel");
const {dbFail, dbSuccess} = require("../helpers/requestHelper");

module.exports = {
    addAccount: async (req, res) =>{
        const {groupid} = req.body
        const userid = req.userId
        // checking if user already is in a given group
        const isUser = await isUserInGroup(groupid, userid)
        if (isUser.result) return dbFail(res, 'User is already in given group', 400)
        const dbData = await addNewAccount(groupid, userid)
        if (!dbData.isSuccess) return dbFail(res, 'No such group found', 400)
        if (!dbData.result) return dbFail(res, 'No such group found')
        dbSuccess(res, 'added new group')
    },
    showGroups: async (req, res) =>{
        const userGroups = await getAllGroups(req.userId)
        if (!userGroups.isSuccess) return dbFail(res, 'Error getting groups')
        dbSuccess(res, "Got user's groups", userGroups.result)
    }
}