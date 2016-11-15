module Overrides
  class OmniauthCallbacksController  < DeviseTokenAuth::OmniauthCallbacksController 

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