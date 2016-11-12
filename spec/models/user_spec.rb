require 'spec_helper'

# user specs
RSpec.describe User, type: :model do

	# builder
	describe 'Builder' do
		it 'Valid Factory' do
			expect(build(:user)).to be_valid
		end
	end

	# validations
	describe 'Validations' do
		it 'Presence Email' do
			# requires email
			expect(build(:user, email: nil)).to_not be_valid
		end

		it 'Presence Password' do
			# requires password
			expect(build(:user, password: nil)).to_not be_valid
		end

		it 'Presence Username' do
			# requires username
			expect(build(:user, username: nil)).to_not be_valid
		end

		it 'Unique Email' do
			# requires unique emails
			create(:user, email: 'rspec@email.com')
			expect(build(:user, email: 'rspec@email.com')).to_not be_valid
		end
	end

	# relations
	describe 'Relations' do
		it 'has_many Friends as Users' do
			# create user with friends once
			user = create(:user_with_friends)

			# ensure association returns expected # of records for has_many & through
			expect(user.user_friends.length).to eq(5)
			expect(user.friends.length).to eq(5) # friends through user_friends

			# ensure association returns same record for has_many & through
			# ensure association returns User record for through
			user.user_friends.each_with_index do |user_friend, i|
				expect(user_friend.friend).to eq(user.friends[i])
				expect(user.friends[i].class).to eq(User)
			end
		end
	end

end