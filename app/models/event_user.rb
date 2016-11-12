class EventUser < ActiveRecord::Base
	# relations
	# belongs_to
  belongs_to :event
  belongs_to :user

  # validations
  validates :event, :user, presence: true
end
