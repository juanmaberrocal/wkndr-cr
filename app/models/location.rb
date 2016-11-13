class Location < ActiveRecord::Base
	# relations
	# has_many
	has_many :events

	# validations
	validates :name, :lat, :lng, presence: true
end
