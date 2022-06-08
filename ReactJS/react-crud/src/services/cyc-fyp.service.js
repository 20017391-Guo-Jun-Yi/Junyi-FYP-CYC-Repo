import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/users");
  }
  getAllPlaygrounds() {
    return http.get("/playgrounds");
  }

  getPlaygrounds(id) {
    return http.get(`/playgrounds/index/${id}`);
  }

  createPlaygrounds(data) {
    return http.post("/playgrounds", data);
  }

  updatePlaygrounds(id, data) {
    return http.put(`/playgrounds/index/${id}`, data);
  }

  deletePlaygrounds(id) {
    return http.delete(`/playgrounds/delete/${id}`);
  }

  findByTitle(title) {
    return http.get(`/playgrounds/search/${title}`);
  }
}

export default new DataService();