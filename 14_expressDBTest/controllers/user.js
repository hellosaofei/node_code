import ConnPool from "../db/index.js";

const pool = new ConnPool();

async function queryAllUser(req, res) {
  let sql = "select * from admin";
  const result = await pool.sqlExector(sql, []);
  res.json(result);
}

export { queryAllUser };
