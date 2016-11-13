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
		it 'Presence Owner User' do
			# requires user association
			expect(build(:event, owner_user: nil)).to_not be_valid
		end
	end

	# relations
	describe 'Relations' do
		it 'belongs_to Location' do
			# associated :location must be Location class
			expect(build(:event).location.class).to eq(Location)
		end

		it 'has_one Owner User' do
			# create event with owner once
			event = create(:event)

			# ensure association returns 1 record
			expect(Array(event.owner_event_user).length).to eq(1)
			expect(Array(event.owner_user).length).to eq(1)

			# ensure association returns same record for has_one & through
			# ensure association returns User record
			expect(event.owner_event_user.user).to eq(event.owner_user)
			expect(event.owner_user.class).to eq(User)
		end

		it 'has_many Invited Users' do
			# create event with invited users once
			event = create(:event_with_users)

			# ensure association returns expected # of records for has_many & through
			expect(event.invited_event_users.length).to eq(5)
			expect(event.invited_users.length).to eq(5) # users through invited_event_users

			# ensure association returns same record for has_many & through
			# ensure association returns User record for through
			event.invited_event_users.each_with_index do |event_user, i|
				expect(event_user.user).to eq(event.invited_users[i])
				expect(event.invited_users[i].class).to eq(User)
			end
		end

		# ensure that if all users are queried (.users) it returns 1 owner and 5 invited user records
		it 'has_many Users' do
			# create event with users once
			event = create(:event_with_users)

			# ensure .users returns 1 owner user record
			expect(event.users.select{ |u| u.id == event.owner_user.id }.length).to eq(1)

			# ensure .users returns 5 invited user records
			expect(event.users.select{ |u| u.id.in?(event.invited_users.map(&:id)) }.length).to eq(5)
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
