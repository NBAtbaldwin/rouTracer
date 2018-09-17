class Api::RoutesController < ApplicationController

  def index
    @routes = current_user.routes
  end

  def show
    @route = Route.find(params[:id])
    if @route.user_id == current_user.id
      render :show
    else
      render json: ["Unauthorized route request"], status: 401
    end
  end

  def create
    @route = Route.new(route_params)
    if @route.save
      render :show
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  def update
    @route = Route.find(params[:id])
    if @route.update(route_params)
      render :show
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  def destroy
    @route = Route.find(params[:id])

    if @route.destroy
      render :show
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  private

  def route_params
    params.require(:route).permit(:route_name, :activity_type, :coordinates_list, :description, :elevation, :est_duration, :distance, :user_id, marker_coordinates: [])
  end
end
