class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  # relations
  # has_many
  has_many :user_friends
  has_many :friends, through: :user_friends

  # events where user is the owner
  has_many :owner_event_users, -> { where(owner: true) }, class_name: "EventUser"
  has_many :owner_events, through: :owner_event_users, source: :event

  # events where user is invited
  has_many :invited_events_users, -> { where.not(owner: true) }, class_name: "EventUser"
  has_many :invited_events, through: :invited_event_users, source: :event

  has_many :event_users
  has_many :events, through: :event_users

  has_many :comments

  # validations
  validates :username, presence: true
end
