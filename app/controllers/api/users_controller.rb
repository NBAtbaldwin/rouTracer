class Api::UsersController < ApplicationController
  def create
   @user = User.new(user_params)
   if @user.save
     login(@user)
     @friends = @user.friends
     @friend_ids = @user.friend_ids
     @requested_ids = @user.requested_ids
     @requester_ids = @user.requester_ids
     render :show
   else
     render json: @user.errors.full_messages, status: 422
   end
  end

  def show
    @user = User.find(params[:id])
    @friends = @user.friends
    @friend_ids = @user.friend_ids
    @requested_ids = @user.requested_ids
    @requester_ids = @user.requester_ids
    render :show
  end

  def index
    @users = User.all.includes(:activities).includes(:routes)
    render :index
  end

 private

 def user_params
   params.require(:user).permit(:email, :password, :name)
 end
end
