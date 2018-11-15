class Api::ActivitiesController < ApplicationController

  def index
    friend_activities = []
    friend_routes = []
    current_user.friends_with_activities.each do |friend|
      friend_activities.concat(friend.activities)
      friend_routes.concat(friend.routes)
    end
    @activities = friend_activities.concat(current_user.activities)
    @routes = friend_routes.concat(current_user.routes)
  end

  def show
    @activity = Activity.find(params[:id])
    @comments = @activity.comments
    @routes = User.find(@activity.user_id).routes
    if @activity
      render :show
    else
      render json: ["Unauthorized activity request"], status: 401
    end
  end

  def create
    @activity = Activity.new(activity_params)
    @routes = current_user.routes
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
