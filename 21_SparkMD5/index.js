// import { SparkMD5 } from "spark-md5";

const SparkMD5 = require("spark-md5");

var spark = new SparkMD5();
spark.append("Hi");
spark.append("there");
var hexHash = spark.end(); // hex hash
var rawHash = spark.end(true);

console.log(hexHash);
console.log(rawHash.toString());
