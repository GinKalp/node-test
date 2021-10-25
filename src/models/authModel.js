const {hashValue} = require("../helpers/hashHelper");
const {dbAction} = require("../helpers/requestHelper");

module.exports = {
    registerUser: async (data) =>{
        const {name, email, password} = data
        const sql = `INSERT INTO users(full_name, email, password)
                        VALUES(?,?,?)`

        const hashedPass = hashValue(password)
        return await dbAction(sql, [name, email, hashedPass])
    }
}