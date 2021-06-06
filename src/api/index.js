import request from "@/plugins/axios";
import { weapi, eapi } from "@/utils/crypto";
import queryString from "querystring";

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
    data: queryString.stringify(data)
  });
};

export const get_playlist_catlist = () => {
  const data = weapi({ csrf_token: "" });
  return request({
    method: "post",
    url: "music.163/weapi/playlist/catalogue",
    data: queryString.stringify(data)
  });
};

export const get_playlist_top = (cat = "全部") => {
  console.log(cat);
  const data = weapi({
    cat,
    order: "hot",
    limit: 50,
    offset: 0,
    total: true,
    csrf_token: ""
  });
  console.log(data);
  return request({
    method: "post",
    url: "music.163/weapi/playlist/list",
    data: queryString.stringify(data)
  });
};
