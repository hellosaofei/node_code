import DBConfig from "../config/db.js";
import mysql from "mysql2/promise";

class ConnPool {
  constructor() {
    this.connectPool = mysql.createPool(DBConfig);
  }
  /**
   * sql:要被执行的sql语句,需要为数据预留位置
   * sqlArr:执行sql语句时传入的数据
   */
  async sqlExector(sql, sqlArr) {
    const conn = await this.connectPool.getConnection();
    conn
      .execute(sql, sqlArr)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("执行sql语句时出现错误，请查看错误内容");
        throw new Error(error);
      })
      .finally(() => {
        conn.release();
      });
  }
}

export default ConnPool;
