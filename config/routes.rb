WkndrCr::Application.routes.draw do
	# Devise authentication API routes
	mount_devise_token_auth_for 'User', at: 'auth', controllers: {
		omniauth_callbacks: 'overrides/omniauth_callbacks'
	}

	# crud API
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do

      # crud locations
      resources :locations do
        # none
      end
      
    end
  end

	# Root
	root 'home#index'
end