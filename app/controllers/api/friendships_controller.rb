class Api::FriendshipsController < ApplicationController

  def create
    @user = current_user
    friendship = Friendship.new(friendship_params)

    if friendship.save
      @friends = @user.friends
      @friend_ids = @user.friend_ids
      render 'api/users/show'
    else
      render json: friendship.errors.full_messages
    end
  end

  def update
    friendship = Friendship.find(params[:id])

    if friendship.update(friendship_params)
      @friends = @user.friends
      @friend_ids = @user.friend_ids
      render 'api/users/show'
    else
      render json: friendship.errors.full_messages
    end
  end

  def destroy
    friendship = Friendship.find(params[:id])
    friendship.destroy
  end

private
  def friendship_params
    params.require(:friendship).permit(:requestee_id, :requester_id, :status)
  end

end
