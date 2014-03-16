###############################################################
#                                                             #
#  Shamefully ripped from the wonderful Pelican project.      #
#                                                             #
#  Repurposed for clayto.com.                                 #
#                                                             #
#  Find Pelican here: https://github.com/getpelican/pelican   #
#                                                             #
###############################################################

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/app
OUTPUTDIR=$(BASEDIR)/build
GHPAGEDIR=$(OUTPUTDIR)/build/app

help:
	@echo 'Makefile for clayto.com web site                                       '
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make clean                       remove the generated files         '
	@echo '   github                           upload the web site via gh-pages   '
	@echo '                                                                       '

clean:
	find $(OUTPUTDIR) -mindepth 1 -delete

publish: clean
	grunt

github: publish
	echo "clayto.com" > $(OUTPUTDIR)/CNAME
	ghp-import $(GHPAGEDIR) -m "latest changes from master" -p
	git push origin gh-pages

.PHONY: clean github
