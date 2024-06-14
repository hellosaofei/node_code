/**
 * 用于在node进程结束之前关闭数据库连接池
 */
function closeConnPool(poolInstance) {
  ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
    process.on(signal, () => {
      poolInstance.end();
      process.exit();
    })
  );
}
