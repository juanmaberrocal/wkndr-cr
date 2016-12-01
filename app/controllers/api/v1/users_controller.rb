module Api
	module V1
		class UsersController < ApplicationController
			include ControllerErrorResponseHelper

			# ensure user is logged in
			before_action :authenticate_user!

			# set user
			before_action :set_user, only: [:friends]

			# default to json response
			respond_to :json

			# GET /users
			def index
				begin
					# return response as json array of users (exclude self)
					render json: User.where.not(id: current_user.id)
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			# GET /users/:id/friends.json
			def friends
				begin
					# return response as json array of friends (users)
					render json: @user.friends.as_json
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			private
			# set location
			def set_user
				@user = User.find(params[:id])
			end

		end
	end
end