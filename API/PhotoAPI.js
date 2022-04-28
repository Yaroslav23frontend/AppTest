import axios from "axios";

export default class PostService {
  static async getAll(page) {
    const response = await axios.get(
      `https://api.unsplash.com/photos?page=${page}&&client_id=896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043`
    );
    return response;
  }
}
