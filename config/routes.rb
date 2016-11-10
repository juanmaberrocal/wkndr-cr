WkndrCr::Application.routes.draw do
	# Devise authentication API routes
	mount_devise_token_auth_for 'User', at: 'auth'

	# Angular root for logged in users
	get '/me', to: 'dashboard#index', as: 'dashboard'

	# Splash page routed as root
	root 'splash#index'
end