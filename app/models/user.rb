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
  
  has_many :events

  has_many :event_users
  has_many :invited_events, through: :event_users

  has_many :comments

  # validations
  validates :username, presence: true
end
