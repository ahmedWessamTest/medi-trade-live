import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('@features/blogs/components/wrapper/wrapper').then((m) => m.Wrapper),
    children: [
      {
        path: '',
        loadComponent: () => import('@features/blogs/pages/blogs/blogs').then((m) => m.Blogs),
      },
      {
        path: ':slug',
        loadComponent: () => import('@features/blogs/pages/blog-id/blog-id').then((m) => m.BlogId),
      },
    ],
  },
] as Route[];
