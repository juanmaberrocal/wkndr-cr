require 'spec_helper'

# user specs
RSpec.describe User, type: :model do

	# builder
	describe 'Builder' do
		it 'Valid Factory' do
			expect(FactoryGirl.build(:user)).to be_valid
		end
	end

	# validations
	describe 'Validations' do
		it 'Presence Email' do
			# requires email
			expect(FactoryGirl.build(:user, email: nil)).to_not be_valid
		end

		it 'Presence Password' do
			# requires password
			expect(FactoryGirl.build(:user, password: nil)).to_not be_valid
		end

		it 'Presence Username' do
			# requires username
			expect(FactoryGirl.build(:user, username: nil)).to_not be_valid
		end

		it 'Unique Email' do
			# requires unique emails
			FactoryGirl.create(:user, email: 'rspec@email.com')
			expect(FactoryGirl.build(:user, email: 'rspec@email.com')).to_not be_valid
		end
	end

	# relations
	describe 'Relations' do
		
	end

end