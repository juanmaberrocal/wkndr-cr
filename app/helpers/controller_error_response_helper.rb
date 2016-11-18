module ControllerErrorResponseHelper

	# build all error responses the same way
	def build_error_response(messages, status=:unprocessable_entity)
		# return json { errors: [messages] }, status: :code
		render json: { errors: flatten_messsages(messages) }, status: check_status_code(status)
	end

	private
	# ensure error messages are in a 1D array
	def flatten_messsages(messages)
		Array(messages).flatten
	end

	# ensure status passed is an error code
	def check_status_code(status)
		case status
			when :bad_request, :forbidden, :not_found, :method_not_allowed, :unprocessable_entity
				status
			else
				# by default use unprocessable_entity
				:unprocessable_entity
		end
	end

end