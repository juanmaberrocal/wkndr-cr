require 'spec_helper'

# event specs
# CRUD Requests:
	# index
	# create
	# show
	# update
	# destroy
# NOTE:
	# new/edit do not require requests
	# angular builds blank models
RSpec.describe Api::V1::EventsController, type: :controller do
	
	# ensure users can reach event requests
	describe "Event Requests" do 
		login_user # support/controller_macros

		# users can view events
		describe 'index' do
			it 'pulls all records with no start/end params' do 
				# build fake events
				events = create_list(:event, rand(1..10))
				
				# build 5 events for user signed in
				user_events = create_list(:event, 5, owner_user: @user)

				# assign user signed in as an invited user of fake event
				create(:event_user, event: events.first, user: @user)

				# call index
				get :index, format: :json

				# ensure user can view
				expect(response).to be_success

				# ensure correct amount of records returned
				expect(json.length).to eq(user_events.length+1) # +1 for invited user
			end

			it 'pulls set of records within start/end params' do
				# set start and end date params
				start_date = Date.today - 15.days
				end_date = Date.today + 15.days

				# build events for user signed in out side of date params
				events = create_list(:event, rand(1..10), owner_user: @user, start_date: (start_date - 10.days), end_date: (start_date - 5.days))

				# build 5 events for user signed in within date params
				in_range_events = create_list(:event, rand(1..10), owner_user: @user, start_date: (start_date + 5.days), end_date: (end_date - 2.days))

				# call index
				get :index, start: start_date, stop: end_date, format: :json

				# ensure user can view
				expect(response).to be_success

				# ensure correct amount of records returned
				expect(json.length).to eq(in_range_events.length)
			end
		end


		# users can view specific events
		it 'show' do
			# create fake event
			event = create(:event)

			# call show
			get :show, id: event.id, format: :json

			# ensure user can view
			expect(response).to be_success

			# ensure correct record is returned
			expect(json["event"]["id"]).to eq(event.id)

			# ensure users are also returned (1 owner)
			expect(json["users"]["owner"].length).to eq(1)

			# ensure location is also returned (1 location)
			expect(json["location"]["id"]).to eq(event.location.id)
		end

		# users can create new events
		it 'create' do
			# keep track of initial amount of events
			events_count = Event.all.count

			# init event
			event_attrs = attributes_for(:event)

			# call create
			post :create, event: event_attrs, format: :json

			# ensure user can create
			expect(response).to be_success

			# ensure correct data is returned
			# check if a event was created and created by logged in user
			expect(Event.all.count).to eq(events_count+1)
			expect(Event.all.last.owner_user).to eq(@user)
		end

		# users can update events
		describe 'update' do
			it 'can modify their own ticket' do
				# create fake event to be updated
				event = create(:event, owner_user: @user)

				# set attributes to be updated
				event_attrs = event.as_json.merge!(description: 'Updated by RSpec')

				# call update
				put :update, id: event.id, event: event_attrs, format: :json

				# ensure user can update
				expect(response).to be_success

				# ensure correct data is returned
				# updated record should have matching values for attr keys sent
				event.reload # record must be reloaded with change
				expect(event.description).to eq(event_attrs[:description])
			end

			it 'cannot modify non-own ticket' do
				# create fake event to be updated
				event = create(:event)

				# set attributes to be updated
				event_attrs = event.as_json.merge!(description: 'Updated by RSpec')

				# call update
				put :update, id: event.id, event: event_attrs, format: :json

				# ensure user can update
				expect(response).to_not be_success

				# ensure correct data is returned
				# updated record should have matching values for attr keys sent
				event.reload # record must be reloaded with change
				expect(event.description).to_not eq(event_attrs[:description])
			end
		end

		# users can destroy events
		describe 'destroy' do
			it 'can delete their own event' do
				# create fake event to be destroyed
				event = create(:event, owner_user: @user)

				# get initial count of events
				events_count = Event.all.count

				# call destroy
				delete :destroy, id: event.id

				# ensure user can destroy
				expect(response).to be_success

				# ensure record has been deleted
				expect(Event.all.count).to eq(events_count-1)
			end

			it 'cannot delete non-own event' do
				# create fake event to be destroyed
				event = create(:event)

				# get initial count of events
				events_count = Event.all.count

				# call destroy
				delete :destroy, id: event.id

				# ensure user can destroy
				expect(response).to_not be_success

				# ensure record has been deleted
				expect(Event.all.count).to eq(events_count)
			end
		end

		# it 'users' do
		# end

	end

	# ensure errors always return as data.errors => Array(messages)
	# required so all errors can be handled by client the same way
	describe "Event Request Error Handle" do
		login_user # support/controller_macros
		
		it 'create' do
			# keep track of initial amount of events
			events_count = Event.all.count

			# init event && remove start|end date
			event_attrs = attributes_for(:event)
			event_attrs.merge!({ start_date: nil, end_date: nil })

			# call create
			post :create, event: event_attrs, format: :json

			# ensure user can create
			expect(response).to_not be_success

			# ensure error message is array
			expect(json["errors"].is_a?(Array)).to eq(true)

			# ensure event was not created
			expect(Event.all.count).to eq(events_count)
		end

		it 'update' do
			# create fake event to be updated
			event = create(:event)

			# set attributes to be updated
			event_attrs = event.as_json.merge!(start_date: nil, end_date: nil)

			# call update
			put :update, id: event.id, event: event_attrs, format: :json

			# ensure user can update
			expect(response).to_not be_success

			# ensure error message is array
			expect(json["errors"].is_a?(Array)).to eq(true)

			# ensure event was not updated
			event.reload # record must be reloaded with change
			expect(event.start_date).to_not eq(nil)
			expect(event.end_date).to_not eq(nil)
		end

	end

end