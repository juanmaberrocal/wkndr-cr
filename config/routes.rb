WkndrCr::Application.routes.draw do
	# Devise authentication API routes
	mount_devise_token_auth_for 'User', at: 'auth'

	# Splash page routed as root
	root 'home#index'
end