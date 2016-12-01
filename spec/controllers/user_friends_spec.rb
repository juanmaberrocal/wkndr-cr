require 'spec_helper'

# user specs
RSpec.describe Api::V1::UserFriendsController, type: :controller do
	
	# ensure users can reach user friend requests
	describe "User Friend Requests" do 
		login_user # support/controller_macros

		# users can create user_friends
		it 'create' do 
			# build fake users
			user = create(:user)

			# initialize user_friend
			# user_friend_attrs = attributes_for(:user_friend, user: @user, friend: user)

			# call create
			# post :create, user_friend: user_friend_attrs, format: :json
			post :create, user_friend: { user_id: @user.id, friend_id: user.id }, format: :json

			# ensure user can view
			expect(response).to be_success

			# ensure correct amount of records returned
			expect(json["friend_id"]).to eq(user.id)

			# ensure user_friend relation created
			expect(UserFriend.all.count).to eq(1)
			expect(@user.friends.count).to eq(1)
			expect(@user.friends.first.id).to eq(user.id)
		end

		# users can destroy user_friends
		it 'destroy' do
			# build fake user
			user = create(:user)

			# build fake user_friend
			create(:user_friend, user: @user, friend: user)

			# ensure relation is set before destroy
			expect(UserFriend.all.count).to eq(1)
			expect(@user.friends.count).to eq(1)

			# call destroy
			delete :destroy, id: user.id, format: :json

			# ensure user can destroy
			expect(response).to be_success

			# ensure records were destroyed
			expect(UserFriend.all.count).to eq(0)
			expect(@user.friends.count).to eq(0)
		end
	end

end