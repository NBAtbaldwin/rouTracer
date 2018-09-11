class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ["invalid credentials"], status: 401 #TODO: errors okay check.
    end
  end

  def destroy
    if current_user
      logout
      render json: {}
    else
      render json: ["No"], status: 404
    end
  end
end
