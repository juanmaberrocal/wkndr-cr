class UserFriend < ActiveRecord::Base
	# relations
	# belongs_to
  belongs_to :user
  belongs_to :friend, class_name: "User"

  # validations
  validates :user, :friend, presence: true
end
