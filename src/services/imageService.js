import http from "./https";

export function searchImage(search, page){
  let url = `/search?q=${search}`;
  if(page)
    url += `&page=${page}`;
  return http.get(url);
}

export default {
  searchImage,
};
