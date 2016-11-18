module Api
	module V1
		class EventsController < ApplicationController
			include ControllerErrorResponseHelper

			# ensure user is logged in
			before_action :authenticate_user!

			# set event
			before_action :set_event, only: [:show, :update, :destroy, :close]

			# default to json response
			respond_to :json

			# GET /events.json
			def index
				begin
					# return response as json array of events
					render json: Event.all.as_json
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			# GET /events/1.json
			def show
				begin
					# return response as json object of event
					render json: @event.as_json
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			# POST /events.json
			def create
				begin
					# initialize new event
					@event = Event.new(event_params)

					# save/create (catch validation errors)
					if @event.save
						# return response as json object of created event
						render json: @event.as_json 
					else
						build_error_response(@event.errors.full_messages)
					end
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

		  # PATCH/PUT /events/1.json
			def update
				begin
					# update (catch validation errors)
					if @event.update(event_params)
						# return response as json object of updated event
						render json: @event.as_json 
					else
						build_error_response(@event.errors.full_messages)
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
					if @event.destroy
						# return response as json object of updated event
						render json: :no_head
					else
						build_error_response(@event.errors.full_messages)
					end
				rescue => e
					# catch errors and return message
					build_error_response(e.message)
				end
			end

			private
			# set event
			def set_event
				@event = Event.find(params[:id])
			end

			# white-list params
			def event_params
				params.require(:event).permit(:name, :description, :lat, :lng, :url_facebook, :url_website)
			end

		end
	end
end