import http from "../http-common";

class PlaygroundDataService {
  getAll() {
    return http.get("/playgrounds");
  }

  get(id) {
      return http.get(`/playgrounds/index/${id}`);
  }

  create(data) {
    return http.post("/playgrounds", data);
  }

  update(id, data) {
    return http.put(`/playgrounds/index/${id}`, data);
  }

  delete(id) {
    return http.delete(`/playgrounds/delete/${id}`);
  }

  findByTitle(title) {
    return http.get(`/playgrounds/search/${title}`);
  }
}

export default new PlaygroundDataService();