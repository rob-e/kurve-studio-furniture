# DocPad Configuration File
# http://docpad.org/docs/config

# Collection built from multiple sub-directories
# Working RegEx
# /(?:tables|cabinets)/
# Following generates errors
# {relativeOutDirPath: $in: ['tables','cabinets','trays', 'miscellaneous']}

# Define the DocPad Configuration
docpadConfig = {
    # ...
    collections:
        pages: ->
            @getCollection("html").findAllLive({pageType: 'main'}, [{order:1}])
        portfolio: ->
        	@getCollection("html").findAllLive({pageType: 'portfolio'}, [{order:1}])
        newPieces: ->
            @getCollection("html").findAllLive({relativeOutDirPath: /(?:tables|cabinets|miscellaneous)/, isNew: true}, [{order:1}])
        tables: ->
        	@getCollection("html").findAllLive({relativeOutDirPath: 'tables'}, [{order:1}])
        cabinets: ->
            @getCollection("html").findAllLive({relativeOutDirPath: 'cabinets'}, [{order:1}])
        trays: ->
            @getCollection("html").findAllLive({relativeOutDirPath: 'trays'}, [{order:1}])
        miscellaneous: ->
            @getCollection("html").findAllLive({relativeOutDirPath: 'miscellaneous'}, [{order:1}])
    # ...

    templateData:
        getPreparedLogoSrc: -> if @document.altLogoSrc then "../images/logo.gif" else "images/logo.gif"

        site:
            url: 'http://www.kurve.ca'

        # -----------------------------
        # Helpers

        # Get the Absolute URL of a document for static deployment
        # Otherwise, just return the document's Relative URL
        getUrl: (_, site) ->
            site = site || @site.url

            if 'static' in @getEnvironments()

                if (typeof _ == "string")
                    if (_[0] == "/" && _[1] != "/")
                        return site+_
                    return _

                if (typeof _ == "object")
                    if (_.url)
                        return @getUrl(_.url,site)
                    if (_.map)
                        _getUrl = arguments.callee
                        return _.map((d) ->
                            return _getUrl(d,site)
                        )

                return _
            
            else
                _.url

            
        # ...

        # enabled example for live configuration
        # enabledPlugins:
        #    livereload: false

        # ...
        plugins:
            sass:
                compass: 'true'
                sassPath: 'C:\Ruby23\bin\sass.bat'                
                scssPath: 'C:\Ruby23\bin\scss.bat'
}

# Export the DocPad Configuration
module.exports = docpadConfig