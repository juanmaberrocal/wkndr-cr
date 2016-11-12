require 'spec_helper'

# comment specs
RSpec.describe Comment, type: :model do
  
  # builder
	describe 'Builder' do
		it 'Valid Factory' do
			expect(build(:comment)).to be_valid
		end
	end

	# validations
	describe 'Validations' do
		it 'Presence Event' do
			# requires event association
			expect(build(:comment, event: nil)).to_not be_valid
		end

		it 'Presence User' do
			# requires user association
			expect(build(:comment, user: nil)).to_not be_valid
		end
	end

	# relations
	describe 'Relations' do
		it 'belongs_to Event' do
			# associated :event must be Event class
			expect(build(:comment).event.class).to eq(Event)
		end

		it 'belongs_to User' do
			# associated :user must be User class
			expect(build(:comment).user.class).to eq(User)
		end
	end

end
