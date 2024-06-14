import { ALLOWED_TYPE, UPLOAD_INFO, CHUNK_SIZE, API } from "./config1.js";

const oProgress = document.querySelector("#uploadProgress");
const oUploader = document.querySelector("#videoUploader");
const oInfo = document.querySelector("#uploadInfo");
const oBtn = document.querySelector("#uploadBtn");

let uploadedSize = 0;
let uploadResult = null;

oBtn.addEventListener("click", uploadVideo, false);
oUploader.addEventListener("change", () => {
  const file = oUploader.files[0];
  console.log(file);
});

async function uploadVideo() {
  const file = oUploader.files[0];
  if (!file) {
    oInfo.innerText = UPLOAD_INFO["NO_FILE"];
    return;
  }
  if (!ALLOWED_TYPE[file.type]) {
    oInfo.innerText = UPLOAD_INFO["NOT_ALLOW_TYPE"];
    return;
  }

  const { name, type, size } = file;
  oProgress.max = size;
  oInfo.innerText = "文件正在上传";

  while (uploadedSize < size) {
    const fileChunk = file.slice(uploadedSize, uploadedSize + CHUNK_SIZE);
    const formData = createFormData({
      name, //原始名称
      type, //文件类型video/mp4
      size, //大小，字节数
      uploadedSize, //已经上传的大小
      file: fileChunk, //切分的文件数据
    });
    try {
      uploadResult = await axios.post(API.UPLOAD_VIDEO, formData);
      console.log(uploadResult);
    } catch (e) {
      oInfo.innerText = `${UPLOAD_INFO["UPLOAD_FAILED"]},${e.message}`;
      return;
    }
    uploadedSize += fileChunk.size;
    oProgress.value = uploadedSize;
  }
  oInfo.innerText = UPLOAD_INFO["UPLOAD_SUCCESS"];
}
function createFormData({ name, type, size, uploadedSize, file }) {
  const fd = new FormData();
  fd.append("name", name);
  fd.append("type", type);
  fd.append("size", size);
  fd.append("uploadedSize", uploadedSize);
  fd.append("file", file);
  return fd;
}
