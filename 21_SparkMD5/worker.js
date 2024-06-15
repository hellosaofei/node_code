self.importScripts(
  "https://cdn.bootcdn.net/ajax/libs/spark-md5/3.0.2/spark-md5.min.js"
);
let count = 0;
let ChunkList = [];
const spark = new SparkMD5.ArrayBuffer();
self.onmessage = function (e) {
  ChunkList = e.data;
  calculateMD5(ChunkList);
};

function calculateMD5() {
  console.log("计算MD5");
  const reader = new FileReader();
  reader.readAsArrayBuffer(ChunkList[count]);
  reader.onload = function (e) {
    count++;
    spark.append(e.target.result);
    if (count === ChunkList.length) {
      const hex = spark.end();
      console.log(hex);
      self.close();
    } else {
      calculateMD5();
    }
  };
}
