module Api
	module V1
		class LocationsController < ApplicationController
			# ensure user is logged in
			before_action :authenticate_user!

			# set location
			before_action :set_location, only: [:show, :update, :destroy, :close]

			# default to json response
			respond_to :json

			def index
				begin
					# build json response
					response = Location.all

					# return response as json array of locations
					render json: response.as_json
				rescue => e
					# catch errors and return blank array
					render json: []
				end
			end

			def show
				# return with owner and closer
				response = @location.as_json.merge!(owner: @location.owner, closer: @location.closer)

				# return response with owner and closer
				respond_with response
			end

			# todo: change to begin|rescue block for controlled json response
			def create
				# respond_with handles errors in create fail
				respond_with :api, :v1, Location.create(location_params)
			end

			# todo: change to begin|rescue block for controlled json response
			def update
				# respond_with handles errors in update fail
				respond_with @location.update(location_params)
			end

			# todo: change to begin|rescue block for controlled json response
			def destroy
				# respond_with handles errors in destroy fail
				respond_with @location.destroy
			end

			private
			# set location
			def set_location
				@location = Location.find(params[:id])
			end

			# white-list params
			def location_params
				params.fetch(:location, {}).permit(:user_id, :title, :category, :status, :description)
			end


		end
	end
end