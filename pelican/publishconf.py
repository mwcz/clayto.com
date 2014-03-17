#!/usr/bin/env python
# -*- coding: utf-8 -*- #

from os import environ

#######################################################################
#                            MISC SETTINGS                            #
#######################################################################

AUTHOR                = u'mwcz'
SITENAME              = u'clayto.com'
TIMEZONE              = 'America/New_York'
DEFAULT_LANG          = u'en'
PDF_GENERATOR         = False
DEFAULT_PAGINATION    = 6
MARKUP                = ('md','mkd','markdown')
DISPLAY_PAGES_ON_MENU = True
THEME                 = environ["HOME"] + "/workspace/pelican-bootstrap3"

DISPLAY_PAGES_ON_MENU = True

TEMPLATE_PAGES = {
        'pages/projects/index.html'   : 'projects/index.html'
        }
EXTRA_PATH_METADATA = {
        # Give the projects page a title to work around <title> being used for
        # HTML pages
        'pages/projects/index.html': {'title': 'Projects'},
        }

USE_FOLDER_AS_CATEGORY = True

DATE_FORMATS = {
        'en': '%Y-%m-%d',
        }

#######################################
#  pelican-bootstrap3 theme settings  #
#######################################

# display active github repos
GITHUB_USER = 'mwcz'
GITHUB_REPO_COUNT = 5
GITHUB_SKIP_FORK = True

# use a bootstrap theme from http://bootswatch.com/
BOOTSTRAP_THEME = 'flatly'

#######################################################################
#                           PLUGIN SETTINGS                           #
#######################################################################

PLUGIN_PATH = environ["HOME"] + '/workspace/pelican-plugins'
PLUGINS = ['neighbors', 'assets', 'related_posts', 'better_figures_and_images']

# assets plugin settings

ASSET_BUNDLES = (
    #('scss', ['colors.scss', 'main.scss'], {'filters': 'pyscss'}),
    ('less', 
        [
            'less/colors.less',
            'less/clayto-styles.less',
            ], 
        {'filters': 'less'}
        ),
    ('css', 
        [
            'css/style.css', 
            'css/bootstrap.%s.min.css' % BOOTSTRAP_THEME if BOOTSTRAP_THEME else 'css/bootstrap.min.css',
            'css/font-awesome.min.css',
            'css/html4css1.css',
            'css/pygments.css',
            'css/colors.css',
            'css/clayto-styles.css',
            ],
        {'filters': 'cssmin'}
        ),
)

# related posts settings

RELATED_POSTS_MAX = 4

#######################################################################
#                            HOST SETTINGS                            #
#######################################################################

SITEURL     = 'http://beta.mwcz.org'
FEED_DOMAIN = 'http://beta.mwcz.org'


# Blogroll
#LINKS =  (('Pelican', 'http://docs.notmyidea.org/alexis/pelican/'),
          #('Python.org', 'http://python.org'),
          #('Jinja2', 'http://jinja.pocoo.org'),
          #('You can modify those links in your config file', '#'),)


# global metadata to all the contents
#DEFAULT_METADATA = (('yeah', 'it is'),)

# static paths will be copied under the same name
STATIC_PATHS = ["static", "projects"]

# A list of files to copy from the source to the destination
#FILES_TO_COPY = (('extra/robots.txt', 'robots.txt'),)


#######################################################################
#                            PATH SETTINGS                            #
#######################################################################

PATH                  = 'content'
PAGE_DIR              = 'pages'
ARTICLE_DIR           = 'posts'

# TODO the mwcz.org tag is actually slugified into "mwczorg" but the link still
# reads "mwcz.org" so it 404's
#SLUG_SUBSTITUTIONS    = (('.',''))

FEED_ALL_RSS          = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS     = 'feeds/%s.rss.xml'

ARTICLE_URL           = '{category}/{date:%Y}/{date:%m}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS       = '{category}/{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'

PAGE_DIR              = 'pages'
PAGE_URL              = '{slug}/'
PAGE_SAVE_AS          = '{slug}/index.html'

# Feed (syndication) settings
FEED_ATOM             = 'feeds/atom.xml'
FEED_ALL_ATOM         = 'feeds/all.atom.xml'
FEED_RSS              = 'feeds/all.rss.xml'
FEED_ALL_RSS          = 'feeds/rss.xml'

# tag paths
TAG_URL               = 'tag/{slug}/'
TAG_SAVE_AS           = 'tag/{slug}/index.html'
TAGS_URL              = 'tags/'
TAGS_SAVE_AS          = 'tags/index.html'

# Categories paths
CATEGORIES_URL          = 'categories/'
CATEGORIES_SAVE_AS      = 'categories/index.html'

# Category paths
CATEGORY_URL          = '{slug}/'
CATEGORY_SAVE_AS      = '{slug}/index.html'

# Disable author page since I'm the only author
AUTHOR_URL            = 'author/{slug}/'
AUTHOR_SAVE_AS        = 'author/{slug}/index.html'

# Disable author page since I'm the only author
AUTHORS_URL            = 'authors/{slug}/'
AUTHORS_SAVE_AS        = 'authors/{slug}/index.html'

# Period archive URLS
YEAR_ARCHIVE_SAVE_AS  = '{date:%Y}/index.html'
MONTH_ARCHIVE_SAVE_AS = '{date:%Y}/{date:%m}/index.html'
DAY_ARCHIVE_SAVE_AS   = '{date:%Y}/{date:%m}/{date:%d}/index.html'

# theme tuxlite_tbs-specific settings
ARCHIVES_URL          = 'archives/'
ARCHIVES_SAVE_AS      = 'archives/index.html'

# Pagination paths (and quantity)
PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/{number}/', '{base_name}/{number}/index.html'),
)

#######################################################################
#                       SOCIAL NETWORK SETTINGS                       #
#######################################################################

GITHUB_URL      = 'https://github.com/mwcz'
DISQUS_SITENAME = 'mwcz'
SOCIAL          = (('GitHub',  'https://github.com/mwcz'),
                   ('Twitter', 'https://twitter.com/mwcz'),)
