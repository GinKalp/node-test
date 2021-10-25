const {billsById, addNewBill} = require("../models/billsModel");
const {dbFail, dbSuccess} = require("../helpers/requestHelper");
module.exports = {
    getBills: async (req, res) =>{
        const {id} = req.params
        const bills = await billsById(id)
        if (!bills.isSuccess) return dbFail(res, 'Error getting bills')
        dbSuccess(res, 'Got bills', bills.result)
    },
    postBill: async (req, res) =>{
        const {group_id, amount, description} = req.body
        const dbResult = await addNewBill(req.body)
        if (!dbResult.isSuccess) return dbFail(res, 'Error adding bill')
        dbSuccess(res, 'Added new bill')
    }
}