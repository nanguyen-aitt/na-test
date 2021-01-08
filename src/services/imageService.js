import http from "./https";

export function searchImage(search){
  return http.get(`/search?q=${search}`);
}

export default {
  searchImage,
};
