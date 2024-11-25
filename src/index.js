
import { Router } from '@vaadin/router';
import './blog-app.js';
import { AuthGuard } from './login/auth-guard.js';


function initRouter() {

  const router = new Router(document.querySelector('#outlet'));

  router.setRoutes([
    {
      path: '/login',
      component: 'login-page',
      action: async () => {
        await import('./login/login-page.js');
      }
    },
    {
      path: '/',
      component: 'blog-app',
      children: [
        {
          path: '',
          redirect: '/blogs'
        },
        {
          path: 'blogs',
          component: 'blog-container',
          action: async () => {
            await import('./blog/blog-container.js')
          },
          children: [
            {
              path: '',
              component: 'blog-posts',
              action: async () => {
                await import('./blog/blogs-posts/blog-posts-component.js');
              },
            },
            {
              path: '/:id',
              component: 'blog-post',
              action: async () => {
                await import('./blog/post/blog-post.js');
              },
            }
          ]
        },
        {
          path: 'admin',
          component: 'blog-admin',
          action: async (context, commands) => {
            await import('./admin/admin.js');
            await import('./common/blg-input.js');
            await import('./common/blg-textarea.js');
            await import('./common/blg-header.js');
            return new AuthGuard().check(context, commands, '/login');
          },
          children: [
            {
              path: 'blogs',
              children: [
                {
                  path: '',
                  component: 'blog-list',
                  action: async () => {
                    await import('./admin/blog-list/blog-list.js');
                  },
                },
                {
                  path: '/:id/edit',
                  component: 'blog-form',
                  action: async () => {
                    await import('./admin/blog-form/blog-form.js');
                  }
                },
                {
                  path: '/:id/add',
                  component: 'blog-form',
                  action: async () => {
                    await import('./admin/blog-form/blog-form.js');
                  }
                }
              ]
            },
          ]
        }
      ]
    },
  ])
}

window.addEventListener("load", () => initRouter());

