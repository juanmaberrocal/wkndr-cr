module Api
	module V1
		class LocationsController < ApplicationController
			include ControllerErrorResponseHelper

			# ensure user is logged in
			before_action :authenticate_user!

			# set location
			before_action :set_location, only: [:show, :update, :destroy, :close]

			# default to json response
			respond_to :json

			# GET /locations.json
			def index
				begin
					# return response as json array of locations
					render json: Location.all.as_json
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			# GET /locations/1.json
			def show
				begin
					# return response as json object of location
					render json: @location.as_json
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			# POST /locations.json
			def create
				begin
					# initialize new location
					@location = Location.new(location_params)

					# save/create (catch validation errors)
					if @location.save
						# return response as json object of created location
						render json: @location.as_json 
					else
						build_error_response(@location.errors.full_messages)
					end
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

		  # PATCH/PUT /locations/1.json
			def update
				begin
					# update (catch validation errors)
					if @location.update(location_params)
						# return response as json object of updated location
						render json: @location.as_json 
					else
						build_error_response(@location.errors.full_messages)
					end
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			# DELETE /logactions/1.json
			def destroy
				begin
					# update (catch validation errors)
					if @location.destroy
						# return response as json object of updated location
						render json: :no_head
					else
						build_error_response(@location.errors.full_messages)
					end
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
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