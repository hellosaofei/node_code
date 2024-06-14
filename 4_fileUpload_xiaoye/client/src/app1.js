import { ALLOWED_TYPE, UPLOAD_INFO, CHUNK_SIZE, API } from "./config1.js";

((doc) => {
  const oProgress = doc.querySelector("#uploadProgress");
  const oUploader = doc.querySelector("#videoUploader");
  const oInfo = doc.querySelector("#uploadInfo");
  const oBtn = doc.querySelector("#uploadBtn");

  let uploadedSize = 0;
  let uploadResult = null;

  const init = () => {
    bindEvent();
  };
  function bindEvent() {
    oBtn.addEventListener("click", uploadVideo, false);
  }
  async function uploadVideo() {
    // console.log(oUploader.files);
    const file = oUploader.files[0];
    //等价于：const {files:[file]}=oUploader
    console.log(file);
    if (!file) {
      oInfo.innerText = UPLOAD_INFO["NO_FILE"];
      return;
    }
    if (!ALLOWED_TYPE[file.type]) {
      oInfo.innerText = UPLOAD_INFO["NOT_ALLOW_TYPE"];
      return;
    }

    const { name, type, size } = file;
    //给文件重命名
    const fileName = new Date().getTime() + "_" + name;
    oProgress.max = size;
    oInfo.innerText = "文件正在上传";

    while (uploadedSize < size) {
      const fileChunk = file.slice(uploadedSize, uploadedSize + CHUNK_SIZE);

      const formData = createFormData({
        name, //原始名称
        type, //文件类型video/mp4
        size, //大小，字节数
        fileName, //文件重命名后的名称
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
    //while过程结束，上传完毕
    oInfo.innerText = UPLOAD_INFO["UPLOAD_SUCCESS"];
    //清空input
    // oUploader.value = null;
    //创建视频元素
    // createVideo(uploadResult.data.data.video_url);|
  }
  function createFormData({ name, type, size, fileName, uploadSize, file }) {
    const fd = new FormData();

    fd.append("name", name);
    fd.append("type", type);
    fd.append("size", size);
    fd.append("fileName", fileName);
    fd.append("uploadedSize", uploadedSize);
    fd.append("file", file);

    return fd;
  }
  // function createVideo(src) {
  //   const oVideo = doc.createElement("video");
  //   oVideo.controls = true;
  //   oVideo.width = "500";
  //   oVideo.src = src;
  //   doc.body.appendChild(oVideo);
  // }

  init();
})(document);
