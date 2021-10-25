const {dbAction} = require("../helpers/requestHelper");

module.exports = {
    billsById: async (id) =>{
        const sql = `SELECT b.id, b.amount, b.description FROM bills as b
                       LEFT JOIN \`groups\` as g
                       ON b.group_id = g.id
                       WHERE b.group_id = ?`
        return await dbAction(sql, [id])
    },
    addNewBill: async (data) =>{
        const {group_id, amount, description} = data
        const sql = `INSERT INTO bills(group_id, amount, description)
                        VALUES(?,?,?)`
        return await dbAction(sql, Object.values(data))
    }
}