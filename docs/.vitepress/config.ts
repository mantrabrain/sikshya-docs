import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  title: 'Sikshya Documentation',
  outDir: 'docs/.vitepress/dist/docs/',
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
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/docs/apple-touch-icon.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/docs/site.webmanifest' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://sikshya.mantrabrain.com/docs/' }],
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
        content: 'https://sikshya.mantrabrain.com/docs/og-image.png'
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
        content: 'https://sikshya.mantrabrain.com/docs/twitter-image.png'
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
        url: 'https://sikshya.mantrabrain.com/docs/',
        potentialAction: {
          '@type': 'SearchAction',
          target:
            'https://sikshya.mantrabrain.com/docs/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    ]
  ],

  cleanUrls: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Sikshya Docs',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          {
            text: 'Get started',
            items: [
              { text: 'Installation', link: '/installation' },
              { text: 'Quick start', link: '/quick-start' },
              { text: 'Your WordPress admin', link: '/admin-dashboard' }
            ]
          },
          {
            text: 'Build & teach',
            items: [
              { text: 'Courses & curriculum', link: '/courses' },
              { text: 'Learners, roles & progress', link: '/learners' },
              { text: 'Enrollment & access', link: '/enrollment-settings' },
              { text: 'Payments', link: '/payment-settings' },
              { text: 'Email & notifications', link: '/email-settings' }
            ]
          },
          {
            text: 'Integrate',
            items: [
              { text: 'Pro add-ons overview', link: '/third-party-integrations' },
              { text: 'All add-ons', link: '/addons' },
              {
                text: 'Blocks & page builders',
                link: '/elementor-integration'
              },
              {
                text: 'WooCommerce co-existence',
                link: '/woocommerce-integration'
              }
            ]
          }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Shortcodes', link: '/shortcodes' },
          { text: 'Hooks & filters', link: '/hooks-filters' },
          { text: 'REST API', link: '/api-reference' }
        ]
      },
      {
        text: 'Help',
        items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Privacy & usage tracking', link: '/privacy-tracking' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
        ]
      },
      {
        text: 'Sikshya Pro',
        link: 'https://mantrabrain.com/plugins/sikshya-lms/pricing/',
        target: '_blank',
        rel: 'noopener'
      },
      {
        text: 'mantrabrain.com',
        link: 'https://mantrabrain.com/plugins/sikshya-lms/',
        target: '_blank'
      }
    ],

    sidebar: [
      {
        text: 'Get started',
        collapsed: false,
        items: [
          { text: 'Home', link: '/' },
          { text: 'Installation', link: '/installation' },
          { text: 'Quick start (setup wizard)', link: '/quick-start' },
          { text: 'Your WordPress admin', link: '/admin-dashboard' }
        ]
      },
      {
        text: 'Build & teach',
        collapsed: false,
        items: [
          { text: 'Courses & curriculum', link: '/courses' },
          { text: 'Learners, roles & progress', link: '/learners' },
          { text: 'Enrollment & access', link: '/enrollment-settings' },
          { text: 'Payments', link: '/payment-settings' },
          { text: 'Email & notifications', link: '/email-settings' }
        ]
      },
      {
        text: 'Integrate',
        collapsed: false,
        items: [
          { text: 'Pro add-ons overview', link: '/third-party-integrations' },
          { text: 'All add-ons', link: '/addons' },
          {
            text: 'Blocks & page builders',
            link: '/elementor-integration'
          },
          {
            text: 'WooCommerce & co-existence',
            link: '/woocommerce-integration'
          }
        ]
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Shortcodes', link: '/shortcodes' },
          { text: 'Hooks & filters', link: '/hooks-filters' },
          { text: 'REST API', link: '/api-reference' }
        ]
      },
      {
        text: 'Help',
        collapsed: false,
        items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Privacy & usage tracking', link: '/privacy-tracking' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
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
        '© MantraBrain · GPLv2+ · <a href="https://mantrabrain.com/plugins/sikshya-lms/pricing/" target="_blank" rel="noopener"><strong>Sikshya Pro</strong> — pricing</a>',
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
    },

    markdownSource: {
      pattern:
        'https://raw.githubusercontent.com/MantraBrain/sikshya-docs/main/docs/:path'
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
    hostname: 'https://sikshya.mantrabrain.com/docs/'
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
          href: (() => {
            const slug = pageData.relativePath
              .replace(/\.md$/, '')
              .replace(/(^|\/)index$/, '')
            return slug
              ? `https://sikshya.mantrabrain.com/docs/${slug}`
              : 'https://sikshya.mantrabrain.com/docs/'
          })()
        }
      ]
    ]
  }
})
