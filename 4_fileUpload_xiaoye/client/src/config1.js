const BASE_URL = "http://localhost:8000";

export const UPLOAD_INFO = {
  NO_FILE: "请先选择文件",
  NOT_ALLOW_TYPE: "非法格式",
  UPLOAD_FAILED: "上传失败",
  UPLOAD_SUCCESS: "上传完成",
};

export const ALLOWED_TYPE = {
  "video/mp4": "mp4",
};
export const CHUNK_SIZE = 1024 * 1024;

export const API = {
  UPLOAD_VIDEO: BASE_URL + "/upload_video",
};
