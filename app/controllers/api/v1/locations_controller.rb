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
					# return response as json array of locations
					render json: Location.all.as_json
				rescue => e
					# catch errors and return message
					render json: { errors: Array(e.message) }, status: :unprocessable_entity
				end
			end

			def show
				begin
					# return response as json object of location
					render json: @location.as_json
				rescue => e
					# catch errors and return message
					render json: { errors: Array(e.message) }, status: :unprocessable_entity
				end
			end

			# todo: change to begin|rescue block for controlled json response
			def create
				# respond_with handles errors in create fail
				respond_with :api, :v1, Location.create(location_params)
			end

		  # PATCH/PUT /locations/1.json
			def update
				begin
					if @location.update(location_params)
						# return response as json object of updated location
						render json: @location.as_json 
					else
						render json: { errors: @location.errors.full_messages }, status: :unprocessable_entity
					end
				rescue => e
					# catch errors and return message
					render json: { errors: Array(e.message) }, status: :unprocessable_entity
				end
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
				params.require(:location).permit(:name, :description, :lat, :lng, :url_facebook, :url_website)
			end

		end
	end
end