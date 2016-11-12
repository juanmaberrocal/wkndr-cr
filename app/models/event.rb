class Event < ActiveRecord::Base
	# relations
	# belongs_to
  belongs_to :user
  # belongs_to :location

  # validations
  validates :user, presence: true
end
