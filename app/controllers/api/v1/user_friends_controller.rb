module Api
	module V1
		class UserFriendsController < ApplicationController
			include ControllerErrorResponseHelper

			# ensure user is logged in
			before_action :authenticate_user!

			# set user_friend
			before_action :set_user_friend, only: [:destroy]

			# default to json response
			respond_to :json

			# POST /user_friends.json
			def create
				begin
					# initialize new user_friend &&
					# set user to current user
					@user_friend = UserFriend.new(user_friend_params)
					@user_friend.user = current_user

					# save/create (catch validation errors)
					if @user_friend.save
						# return response as json object of created user_friend
						render json: @user_friend.as_json 
					else
						build_error_response(@user_friend.errors.full_messages)
					end
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			# DELETE /user_friends/:id.json
			def destroy
				begin
					# destroy
					if @user_friend.destroy
						# no data return
						render json: :no_head
					else
						build_error_response(@user_friend.errors.full_messages)
					end
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			private
			# set user_friend
			def set_user_friend
				@user_friend = UserFriend.find_by(user: current_user, friend_id: params[:id])
			end

			# white-list params
			def user_friend_params
				params.require(:user_friend).permit(:friend_id)
			end

		end
	end
end