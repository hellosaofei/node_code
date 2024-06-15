const ChunkSize = 1 * 1024 * 1024;

const worker = new Worker("worker.js");

let fileCon = document.querySelector("input");
fileCon.onchange = function (e) {
  const [file] = e.target.files;
  const ChunkList = createFileChunk(file);
  worker.postMessage(ChunkList);
  console.log("mainJS将文件切片发送给了workerJS");
};
function createFileChunk(file) {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push(file.slice(cur, cur + ChunkSize));
    cur += ChunkSize;
  }
  return fileChunkList;
}
