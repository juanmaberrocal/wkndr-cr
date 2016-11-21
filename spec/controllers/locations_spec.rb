require 'spec_helper'

# location specs
# CRUD Requests:
	# index
	# create
	# show
	# update
	# destroy
# NOTE:
	# new/edit do not require requests
	# angular builds blank models
RSpec.describe Api::V1::LocationsController, type: :controller do
	
	# ensure users can reach location requests
	describe "Location Requests" do 
		login_user # support/controller_macros

		# users can view locations
		it 'index' do 
			# build fake locations
			locations = FactoryGirl.create_list(:location, rand(1..10))

			# call index
			get :index, format: :json

			# ensure user can view
			expect(response).to be_success

			# ensure correct amount of records returned
			expect(json.length).to eq(locations.length)
		end

		# users can view specific locations
		it 'show' do
			# create fake location
			location = FactoryGirl.create(:location)

			# call show
			get :show, id: location.id, format: :json

			# ensure user can view
			expect(response).to be_success

			# ensure correct record is returned
			expect(json["id"]).to eq(location.id)
		end

		# users can create new locations
		it 'create' do
			# keep track of initial amount of locations
			locations_count = Location.all.count

			# init location
			location_attrs = FactoryGirl.attributes_for(:location)

			# call create
			post :create, location: location_attrs, format: :json

			# ensure user can create
			expect(response).to be_success

			# ensure correct data is returned
			# check if a location was created
			expect(Location.all.count).to eq(locations_count+1)
		end

		# users can update locations
		it 'update' do
			# create fake location to be updated
			location = FactoryGirl.create(:location)

			# set attributes to be updated
			location_attrs = location.as_json.merge!(description: 'Updated by RSpec')

			# call update
			put :update, id: location.id, location: location_attrs, format: :json

			# ensure user can update
			expect(response).to be_success

			# ensure correct data is returned
			# updated record should have matching values for attr keys sent
			location.reload # record must be reloaded with change
			expect(location.description).to eq(location_attrs[:description])
		end

		# users can destroy locations
		it 'destroy' do
			# create fake location to be destroyed
			location = FactoryGirl.create(:location)

			# get initial count of locations
			locations_count = Location.all.count

			# call destroy
			delete :destroy, id: location.id

			# ensure user can destroy
			expect(response).to be_success

			# ensure record has been deleted
			expect(Location.all.count).to eq(locations_count-1)
		end

	end

	# ensure errors always return as data.errors => Array(messages)
	# required so all errors can be handled by client the same way
	describe "Location Request Error Handle" do
		login_user # support/controller_macros
		
		it 'create' do
			# keep track of initial amount of locations
			locations_count = Location.all.count

			# init location
			location_attrs = FactoryGirl.attributes_for(:location)
			location_attrs.merge!({ lat: nil, lng: nil })

			# call create
			post :create, location: location_attrs, format: :json

			# ensure user can create
			expect(response).to_not be_success

			# ensure error message is array
			expect(json["errors"].is_a?(Array)).to eq(true)

			# ensure location was not created
			expect(Location.all.count).to eq(locations_count)
		end

		it 'update' do
			# create fake location to be updated
			location = FactoryGirl.create(:location)

			# set attributes to be updated
			location_attrs = location.as_json.merge!(lat: nil, lng: nil)

			# call update
			put :update, id: location.id, location: location_attrs, format: :json

			# ensure user can update
			expect(response).to_not be_success

			# ensure error message is array
			expect(json["errors"].is_a?(Array)).to eq(true)

			# ensure location was not updated
			location.reload # record must be reloaded with change
			expect(location.lat).to_not eq(nil)
			expect(location.lng).to_not eq(nil)
		end

	end

end