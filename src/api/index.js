import request from "@/plugins/axios";
import { eapi } from "@/utils/crypto";

export const get_toplist = () => {
  return request({
    method: "get",
    url: "music.163/api/toplist"
  });
};
export const get_playlist = id => {
  return request({
    method: "get",
    url: "music.163/api/v6/playlist/detail",
    params: {
      id,
      n: 100000,
      s: 8
    }
  });
};
export const get_lyric = id => {
  return request({
    method: "post",
    url: "music.163/api/song/lyric",
    data: `id=${id}&lv=-1&kv=-1&tv=-1`
  });
};
export const get_song_url = id => {
  const data = eapi("/api/song/enhance/player/url", {
    ids: JSON.stringify([id]),
    br: "999000",
    csrf_token: ""
  });
  return request({
    method: "post",
    url: "interface3.music.163/eapi/song/enhance/player/url",
    data: `params=${data.params}&encSecKey=${data.encSecKey}`
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
