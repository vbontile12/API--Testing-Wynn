import { test, expect, request } from '@playwright/test';
import { PostsService } from '../Pages/posts-api';

test.describe('📘 JSONPlaceholder /posts API Tests', () => {
  let postsService;
  let context;

  test.beforeAll(async () => {
    context = await request.newContext();
    postsService = new PostsService(context);
  });

  test('GET /posts - list all posts', async () => {
    const res = await postsService.listPosts();
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('GET /posts/:id - retrieve a single post', async () => {
    const res = await postsService.getPost(1);
    expect(res.ok()).toBeTruthy();
    const post = await res.json();
    expect(post.id).toBe(1);
  });

  test('POST /posts - create a new post', async () => {
    const payload = { title: 'New Post', body: 'Testing API', userId: 1 };
    const res = await postsService.createPost(payload);
    expect(res.ok()).toBeTruthy();
    const post = await res.json();
    expect(post.title).toBe(payload.title);
  });

  test('PUT /posts/:id - fully update a post', async () => {
    const payload = { title: 'Updated Title', body: 'Updated Content', userId: 1 };
    const res = await postsService.updatePost(1, payload);
    expect(res.ok()).toBeTruthy();
  });

  test('PATCH /posts/:id - partially update a post', async () => {
    const patch = { title: 'Patched Title' };
    const res = await postsService.patchPost(1, patch);
    expect(res.ok()).toBeTruthy();
  });

  test('DELETE /posts/:id - delete a post', async () => {
    const res = await postsService.deletePost(1);
    expect(res.ok()).toBeTruthy();
  });

  test.afterAll(async () => {
    await context.dispose();
  });
});
