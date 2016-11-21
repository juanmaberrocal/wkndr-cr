require 'spec_helper'

# user specs
RSpec.describe Api::V1::UsersController, type: :controller do
	
	# ensure users can reach user requests
	describe "User Requests" do 
		login_user # support/controller_macros

		# users can view friends
		it 'friends' do
			# build fake user
			user = create(:user_with_friends)

			# call index
			get :friends, id: user.id, format: :json

			# ensure user can view
			expect(response).to be_success

			# ensure correct amount of records returned
			expect(json.length).to eq(user.friends.length)
		end
	end

end