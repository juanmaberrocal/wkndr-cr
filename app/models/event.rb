class Event < ActiveRecord::Base
	# relations
	# belongs_to
  belongs_to :location

  # has_one
  has_one :owner_event_user, -> { where(owner: true) }, dependent: :destroy, class_name: "EventUser"
  has_one :owner_user, through: :owner_event_user, source: :user

  # has_many
  has_many :invited_event_users, -> { where.not(owner: true) }, dependent: :destroy, class_name: "EventUser"
  has_many :invited_users, through: :invited_event_users, source: :user

  has_many :event_users, dependent: :destroy
  has_many :users, through: :event_users

  has_many :comments

  # validations
  validates :owner_user, presence: true
end
