class Api::ActivitiesController < ApplicationController

  def index
    friend_activities = []
    friend_routes = []
    likes = []

    current_user.friends_with_activities.each do |friend|
      acts_memo = friend.activities.includes(:likes)
      friend_activities.concat(acts_memo)
      friend_routes.concat(friend.routes)
      acts_memo.each do |activity|
        likes.concat(activity.likes)
      end
    end

    user_activities = current_user.activities.includes(:likes)

    user_activities.each do |activity|
      likes.concat(activity.likes)
    end

    @activities = friend_activities.concat(user_activities)
    @routes = friend_routes.concat(current_user.routes)
    @likes = likes
  end

  def show
    @activity = Activity.find(params[:id])
    @likes = @activity.likes
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
    @likes = @activity.likes
    if @activity.save
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  def update
    @activity = Activity.find(params[:id])
    @routes = current_user.routes
    @likes = @activity.likes
    if @activity.update(activity_params)
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  def destroy
    @activity = Activity.find(params[:id])
    @routes = current_user.routes
    @likes = @activity.likes

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
