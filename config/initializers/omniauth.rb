Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, Rails.application.secrets.facebook[:facebook_key], Rails.application.secrets.facebook[:facebook_secret], secure_image_url: true
end