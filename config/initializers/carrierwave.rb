require 'carrierwave/orm/activerecord'

CarrierWave.configure do |config|
  
	case Rails.env
		when 'production'
			config.fog_provider = 'fog/aws'
			config.fog_credentials = {
				provider: 'AWS',
				aws_access_key_id: Rails.application.secrets.fog_storage[:aws_access_key_id],
				aws_secret_access_key: Rails.application.secrets.fog_storage[:aws_secret_access_key],
				region: 'us-west-2'
				# endpoint: 's3-us-west-2.amazonaws.com'
			}
			config.fog_directory = 'wkndr-cr-avatars'
			config.fog_public = false
			# config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" }
			config.storage = :fog
		when 'test'
			config.storage = :file
			config.enable_processing = false
		else # development
			config.storage = :file
	end

end