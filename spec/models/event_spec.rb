require 'spec_helper'

# user friend specs
RSpec.describe Event, type: :model do
  
	# builder
	describe 'Builder' do
		it 'Valid Factory' do
			expect(build(:event)).to be_valid
		end
	end

	# validations
	describe 'Validations' do
		it 'Presence User' do
			# requires user association
			expect(build(:event, user: nil)).to_not be_valid
		end
	end

	# relations
	describe 'Relations' do
		it 'belongs_to User' do
			# associated :user must be User class
			expect(build(:event).user.class).to eq(User)
		end

		it 'belongs_to Location' do
			# associated :location must be Location class
			expect(build(:event).location.class).to eq(Location)
		end

		it 'has_many Users' do
			# create event with users once
			event = create(:event_with_users)

			# ensure association returns expected # of records for has_many & through
			expect(event.event_users.length).to eq(5)
			expect(event.users.length).to eq(5) # users through event_users

			# ensure association returns same record for has_many & through
			# ensure association returns User record for through
			event.event_users.each_with_index do |event_user, i|
				expect(event_user.user).to eq(event.users[i])
				expect(event.users[i].class).to eq(User)
			end
		end

		it 'has_many Comments' do
			# create event with comments once
			event = create(:event_with_comments)

			# ensure association returns expected # of records
			expect(event.comments.length).to eq(5)

			# ensure association returns Comement record
			event.comments.each do |comment|
				expect(comment.class).to eq(Comment)
			end
		end
	end

end
