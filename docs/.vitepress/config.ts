import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Sikshya Documentation',
  description:
    'Official documentation for the Sikshya LMS WordPress plugin (Free + Pro).',
  lang: 'en-US',

  head: [
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Sikshya, WordPress LMS, online courses, eLearning, course builder, Stripe, PayPal, Sikshya Pro, MantraBrain'
      }
    ],
    ['meta', { name: 'author', content: 'MantraBrain' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }
    ],
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://docs.mantrabrain.com/sikshya-wordpress-plugin/' }],
    ['meta', { property: 'og:title', content: 'Sikshya Documentation' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Official documentation for the Sikshya LMS WordPress plugin (Free + Pro).'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://docs.mantrabrain.com/sikshya-wordpress-plugin/og-image.png'
      }
    ],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Sikshya Documentation' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Official documentation for the Sikshya LMS WordPress plugin (Free + Pro).'
      }
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://docs.mantrabrain.com/sikshya-wordpress-plugin/twitter-image.png'
      }
    ],

    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Sikshya Documentation',
        description:
          'Official documentation for the Sikshya LMS WordPress plugin (Free + Pro).',
        url: 'https://docs.mantrabrain.com/sikshya-wordpress-plugin/',
        potentialAction: {
          '@type': 'SearchAction',
          target:
            'https://docs.mantrabrain.com/sikshya-wordpress-plugin/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    ]
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'Sikshya Docs',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          {
            text: 'Get started',
            items: [
              { text: 'Installation', link: '/guide/installation' },
              { text: 'Quick start', link: '/guide/quick-start' }
            ]
          },
          {
            text: 'Build & teach',
            items: [
              { text: 'Courses & curriculum', link: '/guide/courses' },
              { text: 'Learners, roles & progress', link: '/guide/learners' },
              { text: 'Enrollment & access', link: '/guide/enrollment-settings' },
              { text: 'Payments', link: '/guide/payment-settings' },
              { text: 'Email & notifications', link: '/guide/email-settings' }
            ]
          },
          {
            text: 'Integrate',
            items: [
              { text: 'Pro add-ons', link: '/guide/third-party-integrations' },
              {
                text: 'Blocks & page builders',
                link: '/guide/elementor-integration'
              },
              {
                text: 'WooCommerce co-existence',
                link: '/guide/woocommerce-integration'
              }
            ]
          }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Shortcodes', link: '/guide/shortcodes' },
          { text: 'Hooks & filters', link: '/guide/hooks-filters' },
          { text: 'REST API', link: '/guide/api-reference' }
        ]
      },
      {
        text: 'Help',
        items: [
          { text: 'FAQs', link: '/guide/faqs' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          { text: 'Changelog', link: '/guide/changelog' },
          { text: 'Support', link: '/guide/support' }
        ]
      },
      {
        text: 'mantrabrain.com',
        link: 'https://mantrabrain.com/plugins/sikshya/',
        target: '_blank'
      }
    ],

    sidebar: [
      {
        text: 'Get started',
        collapsed: false,
        items: [
          { text: 'Home', link: '/' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Quick start (setup wizard)', link: '/guide/quick-start' }
        ]
      },
      {
        text: 'Build & teach',
        collapsed: false,
        items: [
          { text: 'Courses & curriculum', link: '/guide/courses' },
          { text: 'Learners, roles & progress', link: '/guide/learners' },
          { text: 'Enrollment & access', link: '/guide/enrollment-settings' },
          { text: 'Payments', link: '/guide/payment-settings' },
          { text: 'Email & notifications', link: '/guide/email-settings' }
        ]
      },
      {
        text: 'Integrate',
        collapsed: false,
        items: [
          { text: 'Pro add-ons', link: '/guide/third-party-integrations' },
          {
            text: 'Blocks & page builders',
            link: '/guide/elementor-integration'
          },
          {
            text: 'WooCommerce & co-existence',
            link: '/guide/woocommerce-integration'
          }
        ]
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Shortcodes', link: '/guide/shortcodes' },
          { text: 'Hooks & filters', link: '/guide/hooks-filters' },
          { text: 'REST API', link: '/guide/api-reference' }
        ]
      },
      {
        text: 'Help',
        collapsed: false,
        items: [
          { text: 'FAQs', link: '/guide/faqs' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          { text: 'Changelog', link: '/guide/changelog' },
          { text: 'Support', link: '/guide/support' }
        ]
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/MantraBrain'
      }
    ],

    footer: {
      message:
        'Sikshya is a project by <a href="https://mantrabrain.com">MantraBrain</a>. Released under GPLv2 or later.',
      copyright: `Copyright © ${new Date().getFullYear()} MantraBrain`
    },

    editLink: {
      pattern:
        'https://github.com/MantraBrain/sikshya-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    }
  },

  markdown: {
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    server: {
      host: true
    },
    build: {
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
      exclude: ['vitepress']
    }
  },

  ignoreDeadLinks: true,

  sitemap: {
    hostname: 'https://docs.mantrabrain.com/sikshya-wordpress-plugin/'
  },

  transformHead: ({ pageData }) => {
    const description =
      pageData.frontmatter?.description ||
      'Official documentation for the Sikshya LMS WordPress plugin (Free + Pro).'

    const title = pageData.title
      ? `${pageData.title} | Sikshya Documentation`
      : 'Sikshya Documentation'

    return [
      ['meta', { name: 'description', content: description }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      [
        'link',
        {
          rel: 'canonical',
          href: `https://docs.mantrabrain.com/sikshya-wordpress-plugin/${pageData.relativePath.replace(
            '.md',
            ''
          )}`
        }
      ]
    ]
  }
})
