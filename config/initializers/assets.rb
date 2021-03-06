# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# ensure brower assets are included
Rails.application.config.assets.paths << Rails.root.join("vendor","assets","bower_components")
# ensure fonts are included
Rails.application.config.assets.paths << Rails.root.join("vendor","assets","fonts")

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( info.js info.css me.js me.css splash.js splash.css )
Rails.application.config.assets.precompile += %w( *.tff *.otf )