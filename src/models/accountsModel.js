const {dbAction} = require("../helpers/requestHelper");
module.exports = {
    isUserInGroup: async (groupid, userid) =>{
        const sql = `SELECT * FROM accounts AS a
                        WHERE a.group_id = ? AND a.user_id = ?`
        return await dbAction(sql, [groupid, userid])
    },
    addNewAccount: async (groupid, userid) =>{
        const sql = `INSERT INTO accounts(group_id, user_id)
                        VALUES(?,?)`
        return await dbAction(sql, [groupid, userid])
    },
    getAllGroups: async (userId) =>{
        const sql = `SELECT g.id as group_id, u.full_name as user_name, g.name as group_name FROM accounts as a
                LEFT JOIN users as u
                ON a.user_id = u.id
                LEFT JOIN \`groups\` as g
                ON a.group_id = g.id
                WHERE a.user_id = ?`
        return await dbAction(sql, [userId])
    }
}