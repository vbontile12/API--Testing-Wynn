export class PostsService {
  constructor(request) {
    this.request = request;
  }

  async listPosts() {
    return await this.request.get('/posts');
  }

  async getPost(id) {
    return await this.request.get(`/posts/${id}`);
  }

  async createPost(payload) {
    return await this.request.post('/posts', { data: payload });
  }

  async updatePost(id, payload) {
    return await this.request.put(`/posts/${id}`, { data: payload });
  }

  async patchPost(id, patchData) {
    return await this.request.patch(`/posts/${id}`, { data: patchData });
  }

  async deletePost(id) {
    return await this.request.delete(`/posts/${id}`);
  }
}