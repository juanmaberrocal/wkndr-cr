WkndrCr::Application.routes.draw do
	# Devise authentication API routes
	mount_devise_token_auth_for 'User', at: 'auth', controllers: {
		omniauth_callbacks: 'overrides/omniauth_callbacks'
	}

	# Splash page routed as root
	root 'home#index'
end