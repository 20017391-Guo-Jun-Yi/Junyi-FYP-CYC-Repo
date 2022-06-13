import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/users");
  }
  getAllPlaygrounds() {
    return http.get("/playgrounds");
  }

  getPlaygrounds(id) {
    return http.get(`/playgrounds/${id}`);
  }

  createPlaygrounds(data) {
    return http.post("/playgrounds", data);
  }

  updatePlaygrounds(id, data) {
    return http.put(`/playgrounds/${id}`, data);
  }

  deletePlaygrounds(id) {
    return http.delete(`/playgrounds/${id}`);
  }

  findByTitle(title) {
    return http.get(`/playgrounds/${title}`);
  }
}

export default new DataService();