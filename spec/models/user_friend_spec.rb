require 'spec_helper'

# user friend specs
RSpec.describe UserFriend, type: :model do
  
  # builder
	describe 'Builder' do
		it 'Valid Factory' do
			expect(build(:user_friend)).to be_valid
		end
	end

	# validations
	describe 'Validations' do
		it 'Presence User' do
			# requires user association
			expect(build(:user_friend, user: nil)).to_not be_valid
		end

		it 'Presence Friend' do
			# requires friend association
			expect(build(:user_friend, friend: nil)).to_not be_valid
		end
	end

	# relations
	describe 'Relations' do
		it 'belongs_to User' do
			# associated :user must be User class
			expect(build(:user_friend).user.class).to eq(User)
		end

		it 'belongs_to Friend as User' do
			# associated :friend must be User class
			expect(build(:user_friend).friend.class).to eq(User)
		end
	end

end
