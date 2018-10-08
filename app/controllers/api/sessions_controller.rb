class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login(@user)
      @friends = @user.friends
      @friend_ids = @user.friend_ids
      render 'api/users/show'
    else
      render json: ["invalid credentials"], status: 401
    end
  end

  def destroy
    if current_user
      logout
      render json: {}
    else
      render json: ["No user signed in"], status: 404
    end
  end
end
