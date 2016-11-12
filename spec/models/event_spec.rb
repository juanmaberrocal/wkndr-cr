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

		it 'Presence Location' do
			# requires location association
			# expect(build(:event, location: nil)).to_not be_valid
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
			# expect(build(:event).location.class).to eq(Location)
		end
	end

end
