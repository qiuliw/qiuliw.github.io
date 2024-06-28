import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '我的分类',
    items: [
      { text: 'Bug万象集', link: '/categories/issues/index', activeMatch: '/categories/issues/' },
      { text: '"杂碎"逆袭史', link: '/categories/fragments/index', activeMatch: '/categories/fragments/' },
      // { text: '工具四海谈', link: '/categories/tools/index', activeMatch: '/categories/tools/' },
      { text: '方案春秋志', link: '/categories/solutions/index', activeMatch: '/categories/solutions/' }
    ],
    activeMatch: '/categories/'
  },
  {
    text: '我的小册',
    items: [
      { text: 'JavaSE', link: '/courses/java/index', activeMatch: '/courses/java/' },
      // { text: 'MySQL快速入门', link: '/courses/mysql/index', activeMatch: '/courses/mysql/' },
      // { text: 'MyBatis快速入门', link: '/courses/mybatis/index', activeMatch: '/courses/mybatis/' }
      { text: 'React', link: '/courses/react/index', activeMatch: '/courses/react/' },
      { text: 'C++', link: '/courses/cpp/index', activeMatch: '/courses/cpp/' },
      
    ],
    activeMatch: '/courses/'
  },
  {
    text: '读书笔记',
    items: [
      {
        text: '计算机组成', link: '/bnotes/计算机组成/index',activeMatch: '/bnotes/计算机组成/',
      }
    ],
    activeMatch: '/bnotes/'
  },
  {
    text: '我的标签',
    link: '/tags',
    activeMatch: '/tags'
  },
  {
    text: '我的归档',
    link: '/archives',
    activeMatch: '/archives'
  },
  {
    text: '关于',
    items: [
      { text: '关于知识库', link: '/about/index', activeMatch: '/about/index' },
      { text: '关于我', link: '/about/me', activeMatch: '/about/me' }
    ],
    activeMatch: '/about/' // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
  },
];