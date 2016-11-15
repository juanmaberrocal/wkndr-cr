source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5.1'

# Use pg as the database for Active Record
gem 'pg'

# Use Devise token authentication
gem 'devise_token_auth'

# Allow Facebook OAuth
gem 'omniauth-facebook'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Use Bootstrap
gem 'bootstrap-sass'

# Use CSRF tokens for AngularJS $http
gem 'angular_rails_csrf'

# Use AngularJS templates from assets
gem 'angular-rails-templates'

# Use CarrierWave and MiniMagick for image uploads
# Use fog for AWS storage
gem 'carrierwave', '>= 1.0.0.rc', '< 2.0'
gem 'mini_magick'
gem 'fog', require: 'fog/aws'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use Figaro for env var storage
gem 'figaro'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Use RSpec for testing
  gem 'rspec-rails'
  gem 'factory_girl_rails'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Use Mailcatcher for pseudo-SMTP server in development
  gem 'mailcatcher'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
