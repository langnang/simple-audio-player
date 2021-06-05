import request from "@/plugins/axios";

export const get_toplist = () => {
  return request({
    method: "get",
    url: "music.163/toplist"
  });
};
export const get_playlist = id => {
  return request({
    method: "get",
    url: "music.163/playlist",
    params: {
      id
    }
  });
};
export const get_song = id => {
  return request({
    method: "get",
    url: "music.163/song",
    params: {
      id
    }
  });
};
