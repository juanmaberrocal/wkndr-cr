require 'spec_helper'

# location specs
RSpec.describe Location, type: :model do
  
	# builder
	describe 'Builder' do
		it 'Valid Factory' do
			expect(build(:location)).to be_valid
		end
	end

	# validations
	describe 'Validations' do
		it 'Presence Name' do
			# requires name
			expect(build(:location, name: nil)).to_not be_valid
		end

		it 'Presence Latitude' do
			# requires lat
			expect(build(:location, lat: nil)).to_not be_valid
		end

		it 'Presence Longitude' do
			# requires lng
			expect(build(:location, lng: nil)).to_not be_valid
		end
	end

	# relations
	describe 'Relations' do
		it 'has_many Comments' do
			# create location with events once
			location = create(:location_with_events)

			# ensure association returns expected # of records
			expect(location.events.length).to eq(5)

			# ensure association returns Comement record
			location.events.each do |event|
				expect(event.class).to eq(Event)
			end
		end
	end

end
