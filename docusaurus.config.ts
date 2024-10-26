import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Pocketto',
  tagline: 'Offline, Realtime ORM solution for your web and mobile app',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://pockettojs.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'pockettojs', // Usually your GitHub org/user name.
  projectName: 'pockettojs.github.io', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [require.resolve('docusaurus-lunr-search'), {
      languages: ['en'] // language codes
    }],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // algolia: {
    //   appId: '9B9A6KT33V',
    //   apiKey: '6ffdc6b54e0faaa87a8e6586b306b6f4',
    //   indexName: 'pocketto_docs',
    //   contextualSearch: true,
    // },
    search: {
      placeholder: 'Search...',
    },
    navbar: {
      title: 'Pocketto',
      logo: {
        alt: 'Pocketto Logo',
        src: 'img/apple-touch-icon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Guides',
        },
        // {
        //   to: '/blog',
        //   label: 'Blog',
        //   position: 'left',
        // },
        {
          href: 'https://github.com/pockettojs/pocketto',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Guides',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/pocketto',
            },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/pocketto',
            // },
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/pocketto',
            // },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/pockettojs/pocketto',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kent Ng and its contributors.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
