class Api::ActivitiesController < ApplicationController

  def index
    @activities = current_user.activities
    @routes = current_user.routes
  end

  def show
    @activity = Activity.find(params[:id])
    @routes = current_user.routes
    if @activity.user_id == current_user.id
      render :show
    else
      render json: ["Unauthorized activity request"], status: 401
    end
  end

  def create
    @activity = Activity.new(activity_params)
    if @activity.save
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  def update
    @activity = Activity.find(params[:id])
    @routes = current_user.routes
    if @activity.update(activity_params)
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  def destroy
    @activity = Activity.find(params[:id])
    @routes = current_user.routes
    
    if @activity.destroy
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  private

  def activity_params
    params.require(:activity).permit(:distance, :duration, :elevation, :activity_type, :date, :title, :user_id, :route_id)
  end
end
