require 'spec_helper'

# event user specs
RSpec.describe EventUser, type: :model do
  
  # builder
	describe 'Builder' do
		it 'Valid Factory' do
			expect(build(:event_user)).to be_valid
		end
	end

	# validations
	describe 'Validations' do
		it 'Presence Event' do
			# requires event association
			expect(build(:event_user, event: nil)).to_not be_valid
		end

		it 'Presence User' do
			# requires user association
			expect(build(:event_user, user: nil)).to_not be_valid
		end

		it 'Inclusion Status' do 
			expect(build(:event_user, status: nil)).to_not be_valid
		end
	end

	# relations
	describe 'Relations' do
		it 'belongs_to Event' do
			# associated :event must be Event class
			expect(build(:event_user).event.class).to eq(Event)
		end

		it 'belongs_to User' do
			# associated :user must be User class
			expect(build(:event_user).user.class).to eq(User)
		end
	end

end
