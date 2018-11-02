class Api::UsersController < ApplicationController
  def create
   @user = User.new(user_params)
   if @user.save
     @user.gen_default_photo
     login(@user)
     @friends = @user.friends
     @friend_ids = @user.friend_ids(@friends)
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
    @friend_ids = @user.friend_ids(@friends)
    @requested_ids = @user.requested_ids
    @requester_ids = @user.requester_ids
    render :show
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      @friends = @user.friends
      @friend_ids = @user.friend_ids(@friends)
      @requested_ids = @user.requested_ids
      @requester_ids = @user.requester_ids
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all.includes(:activities).includes(:routes)
    render :index
  end

 private

 def user_params
   params.require(:user).permit(:email, :password, :name, :photo)
 end
end
