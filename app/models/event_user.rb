class EventUser < ActiveRecord::Base
	# possible user status for event
	EVENT_USER_STATUS = %w(owner admin accepted pending)

	# relations
	# belongs_to
  belongs_to :event
  belongs_to :user

  # validations
  validates :event, :user, presence: true
  validates :status, inclusion: { in: EVENT_USER_STATUS }
end
