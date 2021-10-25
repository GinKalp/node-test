const {addNewAccount, getAllGroups} = require("../models/accountsModel");
const {dbFail, dbSuccess} = require("../helpers/requestHelper");

module.exports = {
    addAccount: async (req, res) =>{
        const {groupid, userid, token} = req.body
        const dbData = await addNewAccount(req.body)
        if (!dbData.isSuccess) return dbFail(res, 'Error adding account?')
        dbSuccess(res, 'added new acc')
    },
    showGroups: async (req, res) =>{
        const userGroups = await getAllGroups(req.userId)
        if (!userGroups.isSuccess) return dbFail(res, 'Error getting groups')
        dbSuccess(res, "Got user's groups", userGroups.result)
    }
}