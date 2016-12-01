WkndrCr::Application.routes.draw do
	# Devise authentication API routes
	mount_devise_token_auth_for 'User', at: 'auth', controllers: {
		omniauth_callbacks: 'overrides/omniauth_callbacks'
	}

	# crud API
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do

      # crud events
      resources :events do
        # none
      end

      # crud locations
      resources :locations do
        # none
      end

      # users
      resources :users, except: [:new, :create, :show, :edit, :update, :destroy] do
        member do
          get 'friends'
        end
      end

      # user friends
      resources :user_friends, only: [:create, :destroy] do
        # none
      end
      
    end
  end

	# Root
	root 'home#index'
end