class Event < ActiveRecord::Base
	# relations
	# belongs_to
  belongs_to :user
  belongs_to :location

  # has_many
  has_many :event_users, dependent: :destroy
  has_many :users, through: :event_users

  has_many :comments

  # validations
  validates :user, presence: true
end
