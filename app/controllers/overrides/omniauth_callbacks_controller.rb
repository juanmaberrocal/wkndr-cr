module Overrides
  class OmniauthCallbacksController  < DeviseTokenAuth::OmniauthCallbacksController 


    # intermediary route for successful omniauth authentication. omniauth does
    # not support multiple models, so we must resort to this terrible hack.
    def redirect_callbacks

      # derive target redirect route from 'resource_class' param, which was set
      # before authentication.
      devise_mapping = [request.env['omniauth.params']['namespace_name'],
                        request.env['omniauth.params']['resource_class'].underscore.gsub('/', '_')].compact.join('_')
      redirect_route = "#{request.protocol}#{request.host_with_port}/#{Devise.mappings[devise_mapping.to_sym].fullpath}/#{params[:provider]}/callback"

      # preserve omniauth info for success route. ignore 'extra' in twitter
      # auth response to avoid CookieOverflow.
      session['dta.omniauth.auth'] = request.env['omniauth.auth'].except('extra')
      session['dta.omniauth.params'] = request.env['omniauth.params']

      # redirect_to redirect_route
      redirect_to "#{ENV["HOST_URL"]}#/me/dashboard"
    end


    # break out provider attribute assignment for easy method extension
    def assign_provider_attrs(user, auth_hash)

      case auth_hash['provider']
        when 'facebook'
          user.assign_attributes({
            username: auth_hash['info']['name'],
            email: auth_hash['info']['email']
            # remote_avatar_url: auth_hash['info']['image']
          })
        else
          # catch unsupported oauth
          raise "Omniauth for #{auth_hash['provider']} is not supported!"
      end
    end
    
  end
end