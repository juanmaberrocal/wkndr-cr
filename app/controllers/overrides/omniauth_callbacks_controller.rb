module Overrides
  class OmniauthCallbacksController  < DeviseTokenAuth::OmniauthCallbacksController 

    # break out provider attribute assignment for easy method extension
    def assign_provider_attrs(user, auth_hash)

      case auth_hash['provider']
        when 'facebook'
          if Rails.env.production?
            user.assign_attributes({
              username: auth_hash['info']['name'],
              email: auth_hash['info']['email'],
              remote_avatar_url: auth_hash['info']['image']
            })
          else
            # do not save facebook profile in dev/test
            user.assign_attributes({
              username: auth_hash['info']['name'],
              email: auth_hash['info']['email']
            })
          end
        else
          # catch unsupported oauth
          raise "Omniauth for #{auth_hash['provider']} is not supported!"
      end
    end
    
  end
end